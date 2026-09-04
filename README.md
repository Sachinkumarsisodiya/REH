# 🏥 Rekha Eye Hospital & Lasik Center (REH)

A full-stack modern Healthcare Management, Doctor Consultation, and Smart Appointment Booking System with Automated WhatsApp & SMS Notification Engine.

---

## 🌟 Key Features

### 🌐 Patient Portal
- **Interactive Multi-Step Booking Wizard**: Doctor selection by specialty, dynamic date availability, live 30-minute time slots (prevents clash/double booking), and instant Token ID (`#REH-XXXX`) generation.
- **Doctors Directory**: Specialities, OPD schedules, qualifications, and profiles.
- **Treatments & Technology**: In-depth medical guides on Cataract, Lasik, Retina, Glaucoma, Cornea, etc.
- **Patient Resources**: Pre/Post-surgery advice and health blogs.
- **Emergency & WhatsApp Floating Support**: Instant contact with hospital desk.

### 🛡️ Admin Management Panel (`/admin`)
- **Secure JWT Authentication**: Role-based access control.
- **Real-Time Analytics & Dashboard**: Total appointments, pending/approved/rejected counts, and 7-day trend graph.
- **Appointment Lifecycle**: One-click Approve, Cancel with custom reasons, and Reschedule with slot conflict validation.
- **Audit Trail & History**: Complete tracking of every status/schedule modification.
- **Doctor Management**: Add, update, and activate/deactivate doctor profiles and OPD hours.

### ⚡ Background WhatsApp & SMS Automation
- **Real-Time WhatsApp Dispatch**: Powered by `whatsapp-web.js` + Puppeteer microservice on port 3001.
- **QR Web Interface**: Easy QR authentication at `http://localhost:3001/qr`.
- **Triggered Healthcare Alerts**:
  - Registered request notification with Token ID.
  - Confirmation alert upon Admin approval with 15-minute arrival advisory.
  - Reschedule notifications and cancellation reason advisories.
- **Fast2SMS & Direct WhatsApp Fallback Integration**.

---

## 🏗️ Architecture & Tech Stack

- **Frontend**: React 18, Vite, React Router, Lucide Icons, Custom CSS Design System
- **Backend**: Python Flask, Flask Blueprints, Flask-JWT-Extended, SQLAlchemy
- **Database**: SQLite (`reh_hospital.db`)
- **Automation Microservice**: Node.js, Express, `whatsapp-web.js`, Puppeteer

---

## 🚀 Getting Started

### 1. WhatsApp Automation Service
```bash
cd server/whatsapp-service
npm install
node index.js
```
> Open `http://localhost:3001/qr` in your browser to scan the WhatsApp QR code (one-time setup).

### 2. Flask Backend API
```bash
cd server
pip install -r requirements.txt
python seed.py   # Run once to initialize sample doctors and admin user
python app.py
```
> Server runs on `http://localhost:5000`

### 3. React Frontend
```bash
cd client
npm install
npm run dev
```
> Client runs on `http://localhost:5173` or `http://localhost:3000`

---

## 🔐 Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`
