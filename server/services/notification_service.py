import os
import json
import http.client
from urllib.parse import quote, urlparse

# WhatsApp microservice endpoint URL (from environment or default localhost:3001)
WA_SERVICE_URL = os.getenv('WHATSAPP_SERVICE_URL', 'http://localhost:3001')


def _call_whatsapp_service(phone: str, message: str) -> dict:
    """
    Internal helper — Dispatches an HTTP POST request to the Node.js
    whatsapp-web.js microservice running on port 3001.
    """
    try:
        parsed = urlparse(WA_SERVICE_URL)
        host = parsed.hostname
        port = parsed.port or 3001

        payload = json.dumps({'phone': phone, 'message': message})
        headers = {'Content-Type': 'application/json'}

        conn = http.client.HTTPConnection(host, port, timeout=8)
        conn.request('POST', '/send-message', body=payload, headers=headers)
        resp = conn.getresponse()
        data = json.loads(resp.read().decode())
        conn.close()
        return data

    except ConnectionRefusedError:
        return {
            'success': False,
            'error': 'WhatsApp microservice unavailable (port 3001). Please ensure Node.js service is running.'
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}


def send_whatsapp_auto(phone: str, message: str) -> dict:
    """
    Dispatches automated WhatsApp notification in the background
    via the Node.js whatsapp-web.js microservice (port 3001).
    """
    result = _call_whatsapp_service(phone, message)

    clean_phone = ''.join(filter(str.isdigit, phone))
    if len(clean_phone) == 10:
        clean_phone = '91' + clean_phone
    fallback = f"https://wa.me/{clean_phone}?text={quote(message)}"

    if result.get('success'):
        print(f"[WHATSAPP AUTO] SENT to +{clean_phone}: {message[:60]}...")
    else:
        print(f"[WHATSAPP AUTO] Service unavailable: {result.get('error')}")

    result['fallback_link'] = fallback
    return result


def sanitize_sms_text(text: str) -> str:
    """
    Sanitizes SMS message to GSM-7 / ASCII plain text.
    Replaces Unicode bullet points, dashes, emojis, and symbols so Fast2SMS route 'q' succeeds.
    """
    replacements = {
        '•': '-',
        '–': '-',
        '—': '-',
        '“': '"',
        '”': '"',
        '’': "'",
        '‘': "'",
        '…': '...',
        '⚡': '',
        '📌': '',
        '🔄': '',
        '✅': '',
        '❌': '',
        '📅': '',
        '⏰': '',
        '⭐': '',
        '&bull;': '-'
    }
    for k, v in replacements.items():
        text = text.replace(k, v)

    # Filter out any non-ASCII characters to prevent Fast2SMS route 'q' 411 error
    cleaned = ''.join(c for c in text if ord(c) < 128)
    # Remove multiple spaces
    lines = [line.strip() for line in cleaned.splitlines()]
    return '\n'.join(lines).strip()


def send_sms_notification(phone_number: str, message_text: str) -> bool:
    """
    Dispatches transactional SMS via Fast2SMS gateway.
    Fast2SMS expects a 10-digit Indian mobile number and ASCII formatted text.
    """
    # Extract only digits and ensure 10-digit Indian mobile number
    digits = ''.join(filter(str.isdigit, str(phone_number or '')))
    if len(digits) >= 10:
        clean_phone = digits[-10:]
    else:
        clean_phone = digits

    if len(clean_phone) != 10:
        print(f"[SMS WARNING] Invalid mobile number for SMS dispatch: {phone_number} -> {clean_phone}")
        return False

    clean_message = sanitize_sms_text(message_text)

    fast2sms_key = os.getenv('FAST2SMS_API_KEY', '').strip()
    if fast2sms_key:
        try:
            import requests
            url = "https://www.fast2sms.com/dev/bulkV2"
            headers = {
                'authorization': fast2sms_key,
                'Content-Type': 'application/json'
            }
            payload = {
                'route': 'q',
                'message': clean_message,
                'language': 'english',
                'flash': 0,
                'numbers': clean_phone
            }
            res = requests.post(url, headers=headers, json=payload, timeout=10)
            
            try:
                resp_data = res.json()
            except Exception:
                resp_data = {'status_code': res.status_code, 'text': res.text}

            print(f"[SMS] Fast2SMS dispatch to {clean_phone} -> HTTP {res.status_code}: {resp_data}")

            # Fast2SMS returns {"return": true, "request_id": "...", "message": [...]}
            if isinstance(resp_data, dict) and resp_data.get('return') is True:
                print(f"[SMS SUCCESS] SMS delivered to {clean_phone}")
                return True
            else:
                # If JSON payload failed, try form-encoded fallback
                form_payload = {
                    'authorization': fast2sms_key,
                    'route': 'q',
                    'message': clean_message,
                    'language': 'english',
                    'flash': 0,
                    'numbers': clean_phone
                }
                fb_res = requests.post(url, data=form_payload, timeout=10)
                fb_data = fb_res.json() if fb_res.ok else {}
                print(f"[SMS FALLBACK] Form-data Fast2SMS response: {fb_data}")
                return fb_data.get('return', False)

        except Exception as e:
            print(f"[SMS ERROR] Fast2SMS request exception: {e}")

    # Dev / Local console fallback
    print(f"[SMS DEV LOG] To: +91-{clean_phone}")
    print(f"[SMS DEV LOG] Message:\n{clean_message}")
    return True


def send_whatsapp_notification(phone_number: str, message_text: str) -> str:
    """
    Fallback helper — returns a direct wa.me WhatsApp URL.
    """
    clean_phone = ''.join(filter(str.isdigit, phone_number))
    if len(clean_phone) == 10:
        clean_phone = '91' + clean_phone
    return f"https://wa.me/{clean_phone}?text={quote(message_text)}"
