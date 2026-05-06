# Passwordless Login Demo

A simple learning project demonstrating passwordless authentication using:

- React frontend
- FastAPI backend
- WebAuthn browser APIs
- YubiKey / Passkeys
- python fido2

This project demonstrates:
- WebAuthn registration
- WebAuthn authentication
- Challenge generation
- Credential storage

---


# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Sunilsai1066/passwordless-login-demo.git
```

---

# Frontend Setup

## Go To Frontend Directory

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Backend Setup

## Go To Backend Directory

```bash
cd backend
```

## Create Virtual Environment

### Linux/macOS

```bash
python3 -m venv .venv
```

---

## Activate Virtual Environment

### Linux/macOS

```bash
source .venv/bin/activate
```

---

## Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## Start Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

# FastAPI Swagger Docs

Open:

```text
http://127.0.0.1:8000/docs
```

---

# Run Application

Start both:

- frontend
- backend

Then open:

```text
http://localhost:5173
```

---

# Registration Flow

1. Enter username
2. Click `Register`
3. Insert Yubikey
4. Touch YubiKey
5. Registration completes

---

# Authentication Flow

1. Enter same username
2. Click `Authenticate`
3. Touch YubiKey
4. Authentication completes


# Vercel Setup

## Backend Environment Variables

Add the following variables in the backend Vercel project.

### `RP_ID`

```text
your-frontend.vercel.app
```

Example:

```text
passwordless-demo-frontend.vercel.app
```

IMPORTANT:
- Do NOT add `https://`
- Do NOT add trailing slash

---

### `FRONTEND_ORIGIN`

```text
https://your-frontend.vercel.app
```

Example:

```text
https://passwordless-demo-frontend.vercel.app
```

---

# Frontend Environment Variables

Add the following variable in the frontend Vercel project.

### `VITE_API_BASE_URL`

```text
https://your-backend.vercel.app
```

Example:

```text
https://passwordless-api.vercel.app
```