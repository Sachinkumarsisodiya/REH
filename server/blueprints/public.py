from datetime import datetime, timedelta, timezone
from flask import Blueprint, request, jsonify
from models import db, Doctor, Appointment
from services.notification_service import send_sms_notification, send_whatsapp_auto, send_whatsapp_notification

public_bp = Blueprint('public', __name__)

# Indian Standard Time (UTC+5:30) helper
IST_OFFSET = timezone(timedelta(hours=5, minutes=30))

def get_current_ist_time():
    return datetime.now(IST_OFFSET)

def generate_time_slots(start_str, end_str, duration_mins=30):
    slots = []
    try:
        fmt = "%H:%M"
        start_dt = datetime.strptime(start_str, fmt)
        end_dt = datetime.strptime(end_str, fmt)
        
        curr = start_dt
        while curr + timedelta(minutes=duration_mins) <= end_dt:
            slots.append(curr.strftime(fmt))
            curr += timedelta(minutes=duration_mins)
    except Exception as e:
        slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"]
    return slots

@public_bp.route('/doctors', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.filter_by(is_active=True).all()
    return jsonify({
        'success': True,
        'doctors': [d.to_dict() for d in doctors]
    }), 200

@public_bp.route('/appointments/available-slots', methods=['GET'])
def get_available_slots():
    doctor_id = request.args.get('doctor_id', type=int)
    date_str = request.args.get('date', type=str)

    if not doctor_id or not date_str:
        return jsonify({'success': False, 'error': 'doctor_id and date query parameters are required.'}), 400

    doctor = Doctor.query.get(doctor_id)
    if not doctor or not doctor.is_active:
        return jsonify({'success': False, 'error': 'Doctor not found or inactive.'}), 404

    try:
        req_date = datetime.strptime(date_str, "%Y-%m-%d")
        day_name = req_date.strftime("%a")
        avail_days = [d.strip() for d in doctor.available_days.split(',')]
        if day_name not in avail_days and avail_days != ['All']:
            return jsonify({
                'success': True,
                'doctor_id': doctor_id,
                'date': date_str,
                'is_working_day': False,
                'available_slots': [],
                'all_slots': []
            }), 200
    except ValueError:
        return jsonify({'success': False, 'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    all_slots = generate_time_slots(doctor.start_time, doctor.end_time, doctor.slot_duration_mins)

    booked_appointments = Appointment.query.filter(
        Appointment.doctor_id == doctor_id,
        Appointment.appointment_date == date_str,
        Appointment.status != 'rejected'
    ).all()

    booked_times = set(app.appointment_time for app in booked_appointments)

    # Current IST datetime for real-time live booking cutoff calculation
    now_ist = get_current_ist_time()
    today_str = now_ist.strftime("%Y-%m-%d")

    slot_objects = []
    for slot in all_slots:
        is_booked = (slot in booked_times)
        is_expired = False

        if date_str < today_str:
            is_expired = True
        elif date_str == today_str:
            try:
                slot_h, slot_m = map(int, slot.split(':'))
                slot_dt = now_ist.replace(hour=slot_h, minute=slot_m, second=0, microsecond=0)
                cutoff_dt = slot_dt - timedelta(minutes=15)
                if now_ist >= cutoff_dt:
                    is_expired = True
            except Exception:
                pass

        is_available = (not is_booked) and (not is_expired)
        slot_objects.append({
            'time': slot,
            'is_available': is_available,
            'is_booked': is_booked,
            'is_expired': is_expired
        })

    return jsonify({
        'success': True,
        'doctor_id': doctor_id,
        'date': date_str,
        'is_working_day': True,
        'available_slots': [s['time'] for s in slot_objects if s['is_available']],
        'all_slots': slot_objects
    }), 200

@public_bp.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json() or {}

    patient_name = data.get('patient_name', '').strip()
    patient_phone = data.get('patient_phone', '').strip()
    patient_email = data.get('patient_email', '').strip()
    doctor_id = data.get('doctor_id')
    appointment_date = data.get('appointment_date', '').strip()
    appointment_time = data.get('appointment_time', '').strip()
    reason_for_visit = data.get('reason_for_visit', '').strip()

    if not patient_name or not patient_phone or not patient_email or not doctor_id or not appointment_date or not appointment_time:
        return jsonify({'success': False, 'error': 'All required fields must be provided.'}), 400

    doctor = Doctor.query.get(doctor_id)
    if not doctor or not doctor.is_active:
        return jsonify({'success': False, 'error': 'Selected doctor is not available.'}), 400

    # Live Cutoff Validation: 15 minutes prior to slot time
    now_ist = get_current_ist_time()
    today_str = now_ist.strftime("%Y-%m-%d")

    if appointment_date < today_str:
        return jsonify({'success': False, 'error': 'Cannot book an appointment for a past date.'}), 400

    if appointment_date == today_str:
        try:
            slot_h, slot_m = map(int, appointment_time.split(':'))
            slot_dt = now_ist.replace(hour=slot_h, minute=slot_m, second=0, microsecond=0)
            cutoff_dt = slot_dt - timedelta(minutes=15)
            if now_ist >= cutoff_dt:
                return jsonify({
                    'success': False,
                    'error': f'The {appointment_time} slot is closed. Appointments must be booked at least 15 minutes in advance.'
                }), 400
        except Exception:
            pass

    existing = Appointment.query.filter(
        Appointment.doctor_id == doctor_id,
        Appointment.appointment_date == appointment_date,
        Appointment.appointment_time == appointment_time,
        Appointment.status != 'rejected'
    ).first()

    if existing:
        return jsonify({'success': False, 'error': 'Selected time slot is already booked. Please choose another slot.'}), 409

    try:
        new_appointment = Appointment(
            patient_name=patient_name,
            patient_phone=patient_phone,
            patient_email=patient_email,
            doctor_id=doctor_id,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            reason_for_visit=reason_for_visit,
            status='pending'
        )
        db.session.add(new_appointment)
        db.session.commit()

        # Professional English Notification Message (Standard Healthcare Format)
        sms_msg = (
            f"REKHA EYE HOSPITAL (REH)\n"
            f"Dear {patient_name},\n\n"
            f"Thank you for choosing Rekha Eye Hospital. Your consultation appointment request has been registered successfully.\n\n"
            f"Appointment Details:\n"
            f"• Token ID: #REH-{new_appointment.id}\n"
            f"• Specialist: {doctor.name} ({doctor.specialty})\n"
            f"• Date: {appointment_date}\n"
            f"• Time: {appointment_time}\n"
            f"• Status: Registered / Verification In Progress\n\n"
            f"Our clinical front desk is reviewing your schedule and will confirm shortly. For urgent inquiries, please call +91 7733866682.\n\n"
            f"Rekha Eye Hospital & Lasik Center"
        )

        # Auto SMS
        send_sms_notification(patient_phone, sms_msg)

        # Auto WhatsApp — dispatched in background to patient
        wa_result = send_whatsapp_auto(patient_phone, sms_msg)

        return jsonify({
            'success': True,
            'message': 'Appointment registered successfully! Confirmation dispatched to patient.',
            'appointment': new_appointment.to_dict(),
            'doctor_name': doctor.name,
            'whatsapp_auto_sent': wa_result.get('success', False),
            'whatsapp_link': wa_result.get('fallback_link', ''),
            'sms_text': sms_msg
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': f'Failed to create appointment: {str(e)}'}), 500
