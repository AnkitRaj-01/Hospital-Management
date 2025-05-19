# Healthcare Appointment Booking System

## Overview
This repository contains:

- **backend/**: FastAPI server exposing:
  - `GET /doctors`
  - `POST /doctors`
  - `GET /doctors/{doctor_id}`
  - `POST /appointments/add/{doctor_id}`
  - `DELETE /appointments/{appointment_id}`

- **frontend/**: React + Vite + TailwindCSS client
- **sdk/**: Python SDK auto-generated from OpenAPI spec


## Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn


## Setup

### Backend
```bash
cd backend
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Running the Services

### Backend
```bash
cd backend
.venv/Scripts/activate
python main.py
```

### Frontend
```bash
cd frontend
npm start
```
