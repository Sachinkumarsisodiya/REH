from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash
from models import db, AdminUser, Appointment, AppointmentHistory, Doctor
from services.notification_service import send_sms_notification, send_whatsapp_auto, send_whatsapp_notification

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not username or not password:
        return jsonify({'success': False, 'error': 'Username and password are required.'}), 400

    user = AdminUser.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'success': False, 'error': 'Invalid admin credentials.'}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({
        'success': True,
        'token': token,
        'user': user.to_dict()
    }), 200

@admin_bp.route('/admin/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = AdminUser.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'error': 'User not found'}), 404
    return jsonify({'success': True, 'user': user.to_dict()}), 200

@admin_bp.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    status = request.args.get('status')
    doctor_id = request.args.get('doctor_id', type=int)
    date = request.args.get('date')
    search = request.args.get('search')

    query = Appointment.query

    if status and status != 'all':
        query = query.filter(Appointment.status == status)
    if doctor_id:
        query = query.filter(Appointment.doctor_id == doctor_id)
    if date:
        query = query.filter(Appointment.appointment_date == date)
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (Appointment.patient_name.ilike(search_pattern)) |
            (Appointment.patient_phone.ilike(search_pattern)) |
            (Appointment.patient_email.ilike(search_pattern))
        )

    appointments = query.order_by(Appointment.created_at.desc()).all()
    
    today_str = datetime.now().strftime("%Y-%m-%d")
    tomorrow_str = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
    
    result = []
    for app in appointments:
        app_data = app.to_dict()
        is_upcoming_24h = (app.appointment_date in [today_str, tomorrow_str]) and (app.status == 'approved')
        app_data['is_upcoming_24h'] = is_upcoming_24h
        result.append(app_data)

    return jsonify({
        'success': True,
        'count': len(result),
        'appointments': result
    }), 200

@admin_bp.route('/appointments/<int:app_id>/approve', methods=['PATCH'])
@jwt_required()
def approve_appointment(app_id):
    app = Appointment.query.get(app_id)
    if not app:
        return jsonify({'success': False, 'error': 'Appointment not found.'}), 404

    app.status = 'approved'
    db.session.commit()

    doctor_name = app.doctor.name if app.doctor else 'Specialist Ophthalmologist'
    doctor_specialty = app.doctor.specialty if app.doctor else 'Eye Care'

    # Professional English Appointment Confirmation
    sms_msg = (
        f"REKHA EYE HOSPITAL (REH)\n"
        f"Dear {app.patient_name},\n\n"
        f"Your consultation appointment has been CONFIRMED.\n\n"
        f"Appointment Summary:\n"
        f"• Token ID: #REH-{app.id}\n"
        f"• Specialist: {doctor_name} ({doctor_specialty})\n"
        f"• Date: {app.appointment_date}\n"
        f"• Time: {app.appointment_time}\n"
        f"• Status: CONFIRMED\n\n"
        f"Please arrive 15 minutes prior to your scheduled time. Kindly bring any previous ophthalmic reports or prescription glasses.\n\n"
        f"Hospital Helpline: +91 7733866682\n"
        f"Rekha Eye Hospital & Lasik Center"
    )

    # Auto SMS (Fast2SMS)
    send_sms_notification(app.patient_phone, sms_msg)

    # Auto WhatsApp
    wa_result = send_whatsapp_auto(app.patient_phone, sms_msg)

    return jsonify({
        'success': True,
        'message': f'Appointment confirmed! Official confirmation dispatched to {app.patient_phone}.',
        'appointment': app.to_dict(),
        'whatsapp_auto_sent': wa_result.get('success', False),
        'whatsapp_link': wa_result.get('fallback_link', ''),
        'sms_text': sms_msg
    }), 200

@admin_bp.route('/appointments/<int:app_id>/reject', methods=['PATCH'])
@jwt_required()
def reject_appointment(app_id):
    app = Appointment.query.get(app_id)
    if not app:
        return jsonify({'success': False, 'error': 'Appointment not found.'}), 404

    data = request.get_json() or {}
    reason = data.get('reason', 'Doctor schedule adjustment / Unavailable slot').strip()

    doctor_name = app.doctor.name if app.doctor else 'Specialist Ophthalmologist'

    app.status = 'rejected'
    db.session.commit()

    # Professional Cancellation Advisory Message with Specific Reason
    sms_msg = (
        f"REKHA EYE HOSPITAL (REH)\n"
        f"Dear {app.patient_name},\n\n"
        f"Your consultation appointment (#REH-{app.id}) with {doctor_name} scheduled for {app.appointment_date} at {app.appointment_time} has been CANCELLED.\n\n"
        f"📌 Cancellation Reason:\n"
        f"{reason}\n\n"
        f"🔄 What to do next:\n"
        f"• Please choose an alternate date/slot online at our booking portal\n"
        f"• Or call our 24x7 clinical desk helpline: +91 7733866682 for priority rescheduling\n\n"
        f"Rekha Eye Hospital & Lasik Center"
    )

    send_sms_notification(app.patient_phone, sms_msg)
    wa_result = send_whatsapp_auto(app.patient_phone, sms_msg)

    return jsonify({
        'success': True,
        'message': f'Appointment status updated. Advisory dispatched to {app.patient_phone}.',
        'appointment': app.to_dict(),
        'whatsapp_auto_sent': wa_result.get('success', False),
        'whatsapp_link': wa_result.get('fallback_link', ''),
        'sms_text': sms_msg
    }), 200

@admin_bp.route('/appointments/<int:app_id>/reschedule', methods=['PATCH'])
@jwt_required()
def reschedule_appointment(app_id):
    app = Appointment.query.get(app_id)
    if not app:
        return jsonify({'success': False, 'error': 'Appointment not found.'}), 404

    data = request.get_json() or {}
    new_date = data.get('new_date', '').strip()
    new_time = data.get('new_time', '').strip()
    notes = data.get('notes', 'Rescheduled by hospital desk').strip()

    if not new_date or not new_time:
        return jsonify({'success': False, 'error': 'new_date and new_time are required.'}), 400

    existing = Appointment.query.filter(
        Appointment.doctor_id == app.doctor_id,
        Appointment.appointment_date == new_date,
        Appointment.appointment_time == new_time,
        Appointment.id != app_id,
        Appointment.status != 'rejected'
    ).first()

    if existing:
        return jsonify({'success': False, 'error': 'Target time slot is already booked. Please choose another slot.'}), 409

    history_entry = AppointmentHistory(
        appointment_id=app.id,
        old_date=app.appointment_date,
        old_time=app.appointment_time,
        new_date=new_date,
        new_time=new_time,
        notes=notes
    )
    db.session.add(history_entry)

    app.appointment_date = new_date
    app.appointment_time = new_time
    app.status = 'rescheduled'

    db.session.commit()

    doctor_name = app.doctor.name if app.doctor else 'Specialist Ophthalmologist'

    # Professional English Rescheduling Message
    sms_msg = (
        f"REKHA EYE HOSPITAL (REH)\n"
        f"Dear {app.patient_name},\n\n"
        f"Your consultation appointment (#REH-{app.id}) with {doctor_name} has been RESCHEDULED.\n\n"
        f"Updated Schedule:\n"
        f"• New Date: {new_date}\n"
        f"• New Time: {new_time}\n"
        f"• Location: Rekha Eye Hospital & Lasik Center\n\n"
        f"If this time does not suit you, please contact our help desk at +91 7733866682.\n\n"
        f"Rekha Eye Hospital & Lasik Center"
    )

    send_sms_notification(app.patient_phone, sms_msg)
    wa_result = send_whatsapp_auto(app.patient_phone, sms_msg)

    return jsonify({
        'success': True,
        'message': f'Appointment rescheduled! Update dispatched to {app.patient_phone}.',
        'appointment': app.to_dict(),
        'whatsapp_auto_sent': wa_result.get('success', False),
        'whatsapp_link': wa_result.get('fallback_link', ''),
        'sms_text': sms_msg
    }), 200

@admin_bp.route('/appointments/<int:app_id>/history', methods=['GET'])
@jwt_required()
def get_appointment_history(app_id):
    app = Appointment.query.get(app_id)
    if not app:
        return jsonify({'success': False, 'error': 'Appointment not found.'}), 404

    history = AppointmentHistory.query.filter_by(appointment_id=app_id).order_by(AppointmentHistory.changed_at.desc()).all()
    return jsonify({
        'success': True,
        'appointment_id': app_id,
        'patient_name': app.patient_name,
        'history': [h.to_dict() for h in history]
    }), 200

@admin_bp.route('/admin/dashboard-stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    total_appointments = Appointment.query.count()
    pending_count = Appointment.query.filter_by(status='pending').count()
    approved_count = Appointment.query.filter_by(status='approved').count()
    rejected_count = Appointment.query.filter_by(status='rejected').count()
    today_count = Appointment.query.filter_by(appointment_date=today_str).count()
    total_doctors = Doctor.query.filter_by(is_active=True).count()

    trend = []
    for i in range(6, -1, -1):
        day_date = datetime.now() - timedelta(days=i)
        day_str = day_date.strftime("%Y-%m-%d")
        day_label = day_date.strftime("%b %d")
        count = Appointment.query.filter_by(appointment_date=day_str).count()
        trend.append({
            'date': day_str,
            'label': day_label,
            'count': count
        })

    return jsonify({
        'success': True,
        'stats': {
            'total_appointments': total_appointments,
            'pending_count': pending_count,
            'approved_count': approved_count,
            'rejected_count': rejected_count,
            'today_count': today_count,
            'total_doctors': total_doctors,
            'trend_7_days': trend
        }
    }), 200

@admin_bp.route('/admin/doctors', methods=['POST'])
@jwt_required()
def add_doctor():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    specialty = data.get('specialty', '').strip()
    qualification = data.get('qualification', '').strip()
    photo_url = data.get('photo_url', '').strip()
    available_days = data.get('available_days', 'Mon,Tue,Wed,Thu,Fri,Sat')
    start_time = data.get('start_time', '09:00')
    end_time = data.get('end_time', '17:00')

    if not name or not specialty or not qualification or not photo_url:
        return jsonify({'success': False, 'error': 'Name, specialty, qualification, and photo URL are required.'}), 400

    doctor = Doctor(
        name=name,
        specialty=specialty,
        qualification=qualification,
        photo_url=photo_url,
        available_days=available_days,
        start_time=start_time,
        end_time=end_time
    )
    db.session.add(doctor)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Doctor added successfully.',
        'doctor': doctor.to_dict()
    }), 201

@admin_bp.route('/admin/doctors/<int:doc_id>', methods=['PUT'])
@jwt_required()
def update_doctor(doc_id):
    doctor = Doctor.query.get(doc_id)
    if not doctor:
        return jsonify({'success': False, 'error': 'Doctor not found.'}), 404

    data = request.get_json() or {}
    doctor.name = data.get('name', doctor.name)
    doctor.specialty = data.get('specialty', doctor.specialty)
    doctor.qualification = data.get('qualification', doctor.qualification)
    doctor.photo_url = data.get('photo_url', doctor.photo_url)
    doctor.available_days = data.get('available_days', doctor.available_days)
    doctor.start_time = data.get('start_time', doctor.start_time)
    doctor.end_time = data.get('end_time', doctor.end_time)
    doctor.is_active = data.get('is_active', doctor.is_active)

    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Doctor profile updated.',
        'doctor': doctor.to_dict()
    }), 200

@admin_bp.route('/admin/doctors/<int:doc_id>', methods=['DELETE'])
@jwt_required()
def toggle_doctor_status(doc_id):
    doctor = Doctor.query.get(doc_id)
    if not doctor:
        return jsonify({'success': False, 'error': 'Doctor not found.'}), 404

    doctor.is_active = not doctor.is_active
    db.session.commit()

    status_str = "activated" if doctor.is_active else "deactivated"
    return jsonify({
        'success': True,
        'message': f'Doctor {status_str} successfully.',
        'doctor': doctor.to_dict()
    }), 200
