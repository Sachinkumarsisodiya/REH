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


def send_sms_notification(phone_number: str, message_text: str) -> bool:
    """
    Dispatches transactional SMS via Fast2SMS gateway.
    Falls back to development console logging if API key is not configured.
    """
    clean_phone = ''.join(filter(str.isdigit, phone_number))
    if len(clean_phone) == 10:
        clean_phone = '91' + clean_phone

    fast2sms_key = os.getenv('FAST2SMS_API_KEY')
    if fast2sms_key:
        try:
            import requests
            url = "https://www.fast2sms.com/dev/bulkV2"
            headers = {'authorization': fast2sms_key}
            payload = {
                'message': message_text,
                'language': 'english',
                'route': 'q',
                'numbers': clean_phone
            }
            res = requests.post(url, headers=headers, data=payload, timeout=8)
            resp_data = res.json()
            print(f"[SMS] Fast2SMS to +{clean_phone}: {resp_data}")
            return resp_data.get('return', False)
        except Exception as e:
            print(f"[SMS ERROR] Fast2SMS failed: {e}")

    # Dev fallback
    print(f"[SMS DEV] To: +{clean_phone}")
    print(f"[SMS DEV] Message: {message_text}")
    return True


def send_whatsapp_notification(phone_number: str, message_text: str) -> str:
    """
    Fallback helper — returns a direct wa.me WhatsApp URL.
    """
    clean_phone = ''.join(filter(str.isdigit, phone_number))
    if len(clean_phone) == 10:
        clean_phone = '91' + clean_phone
    return f"https://wa.me/{clean_phone}?text={quote(message_text)}"
