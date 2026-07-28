
<p align="center">
  <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=60" alt="CarePlus Logo" width="60" height="60" style="border-radius:12px">
</p>

<h1 align="center">CarePlus — Clinic Management Platform</h1>

<p align="center">
  <strong>Appointments · Medicines · Prescriptions · Medicare Billing</strong>
  <br>
  A full-stack clinic management system for patients, doctors, and clinic staff.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/Node.js-Express-000000?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens" alt="JWT Auth">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
</p>

---

## Overview

CarePlus is a modern, role-based clinic management platform that digitizes the full patient-doctor workflow. It enables patients to book and manage appointments online, doctors to control their schedules, and clinics to track medicine inventory, prescriptions, and medicare billing — all from a single dashboard.

**Live Demo:** _Coming soon_

---

## Features

### For Patients

| Feature | Description |
|---|---|
| **Online Booking** | View real-time doctor availability and book appointments in seconds |
| **Appointment Management** | View upcoming and past appointments; cancel or reschedule online |
| **Medicine History** | Access prescribed medicines and past prescriptions |
| **Reminders** | Get notified before scheduled visits |

### For Doctors & Staff

| Feature | Description |
|---|---|
| **Schedule Control** | Confirm or decline appointment requests; block unavailable time slots |
| **Patient History** | Review past visits, prescribed medicines, and medicare details before consultation |
| **Digital Prescriptions** | Write and issue prescriptions; pharmacy and patient receive copies automatically |
| **Appointment Queue** | See all appointments grouped by status (pending, confirmed, completed, cancelled) |

### Medicine Inventory Management

| Module | Capabilities |
|---|---|
| **Inventory & Stock** | Live stock tracking, low-stock alerts, batch & expiry tracking, supplier management |
| **Medicine Types** | Tablets, capsules, syrups, liquids, injections, IVs, topicals — all with strength, dosage, and packaging tracking |
| **Prescriptions & Safety** | Digital prescriptions with dosage/duration, medicine search, interaction & allergy warnings, price & margin calculation |
| **Medicare & Billing** | Coverage types (cash, insurance, Ayushman Bharat, CGHS), visit-linked billing, claim tracking, audit reports |

---

## Tech Stack

**Frontend**

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Tailwind CSS 4 + tw-animate-css | Utility-first styling + animations |
| shadcn/ui + Radix UI | Accessible, composable component library |
| Framer Motion | Scroll-triggered animations & page transitions |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| React Toastify | In-app notifications |
| Lucide React | Icon system |
| Geist (Vercel) Font | Typography |

**Backend**

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js 5 | HTTP server & routing |
| MongoDB + Mongoose 9 | Database & ODM |
| JSON Web Tokens (JWT) | Stateless authentication |
| bcryptjs | Password hashing |
| cookie-parser | Cookie management |

---

## Project Structure

```
careplus/
├── client/                          # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn/ui primitives
│   │   │   │   ├── badge.jsx
│   │   │   │   ├── button.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   └── separator.jsx
│   │   │   ├── Header.jsx           # Navigation header
│   │   │   ├── Footer.jsx           # Clinic contact footer
│   │   │   └── HomePage.jsx         # Marketing landing page
│   │   ├── Pages/
│   │   │   ├── login.jsx
│   │   │   ├── signup.jsx
│   │   │   └── Dashboard.jsx        # Main appointment dashboard
│   │   ├── lib/
│   │   │   └── utils.js             # cn() utility
│   │   ├── App.jsx                  # Root router
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Tailwind + shadcn theme
│   ├── vite.config.js               # Vite + proxy config
│   ├── components.json              # shadcn/ui config
│   └── package.json
│
└── server/                          # Express backend
    ├── src/
    │   ├── db/
    │   │   └── connectDb.js         # MongoDB connection
    │   ├── Models/
    │   │   ├── user.Model.js        # User (patient/doctor)
    │   │   ├── doctorProfile.Model.js
    │   │   ├── patientProfile.Model.js
    │   │   └── appointment.Model.js
    │   ├── Controllers/
    │   │   ├── user.Controller.js
    │   │   ├── doctorProfile.Controller.js
    │   │   ├── patientProfile.Controller.js
    │   │   └── appointment.Controller.js
    │   ├── Routes/
    │   │   ├── user.Route.js
    │   │   ├── doctorProfile.Route.js
    │   │   ├── patientProfile.Route.js
    │   │   └── appointment.Route.js
    │   ├── Middlewares/
    │   │   └── authMiddleware.js     # JWT protect + role authorize
    │   ├── Utils/
    │   │   └── jwtToken.js          # Token generation
    │   └── app.js                   # Express app setup
    ├── server.js                    # Entry point
    └── package.json
```

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/users/signup` | — | Register as patient or doctor |
| `POST` | `/api/v1/users/login` | — | Login, returns JWT |
| `POST` | `/api/v1/users/logout` | — | Clear auth cookie |

### Appointments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/appointment` | Required | Get user's appointments (role-based) |
| `POST` | `/api/v1/appointment/book` | Patient | Book a new appointment |
| `PATCH` | `/api/v1/appointment/:id/confirm` | Doctor | Confirm a pending appointment |
| `PATCH` | `/api/v1/appointment/:id/cancel` | Patient/Doctor | Cancel an appointment |

### Doctors

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/doctor` | — | List all doctors |
| `PUT` | `/api/v1/doctor/profile` | Doctor | Update doctor profile |

### Patients

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/patient/profile` | Patient | Get patient profile |
| `PUT` | `/api/v1/patient/profile` | Patient | Update patient profile |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **MongoDB** (local or Atlas)
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/mabdullah356/careplus.git
cd careplus

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Configuration

Create a `.env` file in the `server/` root:

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/careplus
JWT_SECRET=your-super-secret-key-change-in-production
```

### Run Development

```bash
# Terminal 1 — Start the backend
cd server
npm start

# Terminal 2 — Start the frontend (Vite dev server)
cd client
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:3000` automatically.

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
cd client
npm run build
```

Serve the `client/dist/` directory from your production server or CDN.

---

## Authentication Flow

1. **Signup** — User registers with name, email, password, and selects a role (patient/doctor). A corresponding `PatientProfile` or `DoctorProfile` is auto-created.
2. **Login** — Valid credentials return a JWT (7-day expiry) stored in `localStorage` and an `httpOnly` cookie.
3. **Authorization** — The `authMiddleware` verifies the JWT on every protected route and attaches `req.user = { id, role }`.
4. **Role Guard** — Routes use `authorize('doctor')` or `authorize('patient')` to restrict access by role.

---

## UI Highlights

- **Animated landing page** — Scroll-triggered word reveals, parallax hero, letter-by-letter entrance animations via Framer Motion
- **Role-based dashboard** — Unified appointment table that adapts its columns and actions based on user role
- **Responsive shadcn/ui** — Consistent design system with accessible primitives (button, badge, card)
- **Real-time feedback** — Toast notifications for booking, confirmation, cancellation, and errors
- **Dark mode ready** — CSS variables for `:root` and `.dark` are fully configured (toggle not yet wired)

---

## Roadmap

- [ ] Doctor availability calendar (block dates/times)
- [ ] Medicine inventory CRUD module
- [ ] Digital prescription creation & PDF export
- [ ] Medicare billing and claim tracking
- [ ] Email/SMS appointment reminders
- [ ] Admin panel (clinic-wide analytics)
- [ ] Dark mode toggle
- [ ] Unit & integration tests

---

---

<p align="center">
  Built with ❤️ for clinics that put patients first.
</p>
