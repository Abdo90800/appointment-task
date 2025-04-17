# 🩺 Doctor Booking UI

A responsive and accessible front-end module for booking doctor appointments. Built as part of a technical task for InVitro Capital.

## 🚀 Features

- 📋 Doctor Directory with filters (by specialty)
- 📅 Appointment Booking Modal with selectable time slots
- ✅ My Appointments summary view
- 📱 Fully responsive for mobile, tablet, and desktop
- ♿ Accessible (keyboard navigation + ARIA support)
- ⚡ Built using React + TailwindCSS + Zustand

---

## 🧱 Tech Stack

- **React**
- **TailwindCSS**
- **Zustand** (for global state management)
- **TypeScript** (optional but used)
- **Mock Data** (no backend needed)

---

## 📦 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/YOUR_USERNAME/doctor-booking-ui.git
cd doctor-booking-ui
Install dependencies

bash
Copy
Edit
npm install
Run the app

bash
Copy
Edit
npm run dev
App will run locally on: http://localhost:5173

🧠 How I Used AI Tools
I used Cursor to:

Scaffold components (DoctorCard, Modal, AppointmentList)

Generate mock doctor data

Review accessibility and suggest ARIA improvements

Generate test cases and improve code quality

📌 Accessibility Features
All elements accessible via keyboard (Tab, Enter, Esc)

Proper use of aria-label, role, aria-describedby

Dialogs use role="dialog" and trap focus

Passed checks using Lighthouse & axe DevTools

📎 Known Limitations / Next Steps
Data is fully mocked (no backend integration)

No form validation for appointment selection (basic flow only)

Can be extended with:

Calendar picker

Notification system (toast on success)

Backend integration via API

🌐 Live Demo
🔗 Check the live version here

👤 Author
Abdelaziz Mostafa Abdelaziz