from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from app import app
from models import db, AdminUser, Doctor, Appointment, AppointmentHistory

def seed_database():
    with app.app_context():
        print("Recreating database tables...")
        db.drop_all()
        db.create_all()

        print("Seeding Admin user...")
        admin = AdminUser(
            username='admin',
            password_hash=generate_password_hash('reh12345'),
            role='admin'
        )
        db.session.add(admin)

        print("Seeding Doctors with High-Res Indian Doctor Portraits...")
        doctors = [
            Doctor(
                name="Dr. Rekha Sisodiya",
                specialty="Founder, Medical Director & Chief LASIK Specialist",
                qualification="MBBS, MS (Ophthalmology) AIIMS, Fellowship in Refractive Surgery (London)",
                photo_url="/dr-rekha-sisodiya.jpg",
                available_days="Mon,Tue,Wed,Thu,Fri,Sat",
                start_time="09:00",
                end_time="17:00",
                slot_duration_mins=30,
                is_active=True
            ),
            Doctor(
                name="Dr. Sachin Kumar Sisodiya",
                specialty="Senior Cataract, Phaco & Glaucoma Specialist",
                qualification="MBBS, MS (Ophthalmology), FICO (UK), Fellowship in Micro-Incision Cataract",
                photo_url="/dr-sachin-sisodiya.jpg",
                available_days="Mon,Tue,Wed,Thu,Fri,Sat",
                start_time="09:30",
                end_time="17:30",
                slot_duration_mins=30,
                is_active=True
            ),
            Doctor(
                name="Dr. Kush",
                specialty="Vitreo-Retina & Diabetic Eye Care Specialist",
                qualification="MBBS, MD (Ophthalmology), DNB, Senior Vitreo-Retina Fellow",
                photo_url="/dr-kush.jpg",
                available_days="Mon,Tue,Wed,Thu,Fri,Sat",
                start_time="10:00",
                end_time="18:00",
                slot_duration_mins=30,
                is_active=True
            ),
            Doctor(
                name="Dr. Bhavana",
                specialty="Pediatric Ophthalmology, Squint & Cornea Specialist",
                qualification="MBBS, MS (Ophthalmology), Fellowship in Pediatric Eye Care & Strabismus",
                photo_url="/dr-bhavana.jpg",
                available_days="Mon,Tue,Wed,Thu,Fri,Sat",
                start_time="09:00",
                end_time="16:30",
                slot_duration_mins=30,
                is_active=True
            )
        ]
        db.session.add_all(doctors)
        db.session.commit()

        print("Seeding Sample Appointments...")
        now = datetime.now()
        today_str = now.strftime("%Y-%m-%d")
        tomorrow_str = (now + timedelta(days=1)).strftime("%Y-%m-%d")
        in_2days_str = (now + timedelta(days=2)).strftime("%Y-%m-%d")

        appointments = [
            Appointment(
                patient_name="Sachin Sisodiya",
                patient_phone="7733866682",
                patient_email="sachin@gmail.com",
                doctor_id=doctors[0].id,
                appointment_date=today_str,
                appointment_time="10:00",
                reason_for_visit="Femto Contoura LASIK Pre-Op Assessment",
                status="approved"
            ),
            Appointment(
                patient_name="Pooja Sharma",
                patient_phone="9876543210",
                patient_email="pooja.sharma@example.com",
                doctor_id=doctors[1].id,
                appointment_date=today_str,
                appointment_time="11:30",
                reason_for_visit="Advanced Micro-Incision Phaco Cataract Consultation",
                status="pending"
            ),
            Appointment(
                patient_name="Amitabh Saxena",
                patient_phone="9823456781",
                patient_email="amitabh.s@example.com",
                doctor_id=doctors[2].id,
                appointment_date=tomorrow_str,
                appointment_time="14:00",
                reason_for_visit="Diabetic Retinopathy Screening & OCT Scan",
                status="pending"
            ),
            Appointment(
                patient_name="Meera Kapoor",
                patient_phone="9811223344",
                patient_email="meera.k@example.com",
                doctor_id=doctors[3].id,
                appointment_date=in_2days_str,
                appointment_time="10:30",
                reason_for_visit="Pediatric Squint & Vision Checkup for Child",
                status="approved"
            )
        ]
        db.session.add_all(appointments)
        db.session.commit()

        print("Database re-seeded successfully with 4 Specialists (Dr. Rekha, Dr. Sachin, Dr. Kush, Dr. Bhavana)!")

if __name__ == '__main__':
    seed_database()
