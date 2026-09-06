from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint

db = SQLAlchemy()

class Doctor(db.Model):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    specialty = db.Column(db.String(120), nullable=False)
    qualification = db.Column(db.String(120), nullable=False)
    photo_url = db.Column(db.Text, nullable=False)
    available_days = db.Column(db.String(100), nullable=False, default="Mon,Tue,Wed,Thu,Fri,Sat")
    start_time = db.Column(db.String(10), nullable=False, default="09:00")
    end_time = db.Column(db.String(10), nullable=False, default="17:00")
    slot_duration_mins = db.Column(db.Integer, nullable=False, default=30)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    appointments = db.relationship('Appointment', backref='doctor', lazy=True, cascade="all, delete-orphan")

    def __init__(self, **kwargs):
        super(Doctor, self).__init__(**kwargs)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialty': self.specialty,
            'qualification': self.qualification,
            'photo_url': self.photo_url,
            'available_days': self.available_days.split(',') if self.available_days else [],
            'start_time': self.start_time,
            'end_time': self.end_time,
            'slot_duration_mins': self.slot_duration_mins,
            'is_active': self.is_active
        }


class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(120), nullable=False)
    patient_phone = db.Column(db.String(20), nullable=False)
    patient_email = db.Column(db.String(120), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)
    appointment_date = db.Column(db.String(10), nullable=False) # YYYY-MM-DD
    appointment_time = db.Column(db.String(10), nullable=False) # HH:MM
    reason_for_visit = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='pending') # pending, approved, rejected, rescheduled, completed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    history = db.relationship('AppointmentHistory', backref='appointment', lazy=True, cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint('doctor_id', 'appointment_date', 'appointment_time', name='uix_doctor_date_time'),
    )

    def __init__(self, **kwargs):
        super(Appointment, self).__init__(**kwargs)

    def to_dict(self):
        return {
            'id': self.id,
            'patient_name': self.patient_name,
            'patient_phone': self.patient_phone,
            'patient_email': self.patient_email,
            'doctor_id': self.doctor_id,
            'doctor_name': self.doctor.name if self.doctor else 'N/A',
            'doctor_specialty': self.doctor.specialty if self.doctor else 'N/A',
            'appointment_date': self.appointment_date,
            'appointment_time': self.appointment_time,
            'reason_for_visit': self.reason_for_visit or '',
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'history_count': len(self.history) if self.history else 0
        }


class AdminUser(db.Model):
    __tablename__ = 'admin_users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='admin')

    def __init__(self, **kwargs):
        super(AdminUser, self).__init__(**kwargs)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role
        }


class AppointmentHistory(db.Model):
    __tablename__ = 'appointment_histories'

    id = db.Column(db.Integer, primary_key=True)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'), nullable=False)
    old_date = db.Column(db.String(10), nullable=False)
    old_time = db.Column(db.String(10), nullable=False)
    new_date = db.Column(db.String(10), nullable=False)
    new_time = db.Column(db.String(10), nullable=False)
    changed_at = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text, nullable=True)

    def __init__(self, **kwargs):
        super(AppointmentHistory, self).__init__(**kwargs)

    def to_dict(self):
        return {
            'id': self.id,
            'appointment_id': self.appointment_id,
            'old_date': self.old_date,
            'old_time': self.old_time,
            'new_date': self.new_date,
            'new_time': self.new_time,
            'changed_at': self.changed_at.isoformat() if self.changed_at else None,
            'notes': self.notes or ''
        }


class Inquiry(db.Model):
    __tablename__ = 'inquiries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    message = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='new') # new, contacted, resolved
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, **kwargs):
        super(Inquiry, self).__init__(**kwargs)

    def to_dict(self):
        return {
            'id': self.id,
            'inquiry_id': f"REH-INQ-{self.id:04d}",
            'name': self.name,
            'phone': self.phone,
            'email': self.email or '',
            'message': self.message or '',
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

