# Trading Signal Tracker

A full-stack trading signal tracking application built using React, Express.js, Prisma, and SQLite. The application allows users to create and monitor crypto trading signals with live market price updates from the Binance API.

---

## Tech Stack

### Frontend
- React
- Vite
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM
- SQLite

### External API
- Binance Public API

---

## Features

- Create BUY/SELL trading signals
- Live crypto price tracking using Binance API
- Automatic signal status updates
- ROI calculation
- Signal expiry tracking
- Auto-refresh every 15 seconds
- Delete signals
- Input validation for trading rules

---

## Signal Status Logic

### BUY Signal
- Target hit → current price >= target price
- Stop loss hit → current price <= stop loss

### SELL Signal
- Target hit → current price <= target price
- Stop loss hit → current price >= stop loss

### Expiry
- Signals automatically expire after expiry time

---

## Project Structure

```bash
root/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── prisma/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│
└── README.md
```

---

# Setup Instructions

## Backend Setup

### 1. Navigate to backend

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file inside backend folder:

```env
DATABASE_URL="file:./dev.db"
PORT=5001
```

### 4. Run Prisma migration

```bash
npx prisma migrate dev --name init
```

### 5. Start backend server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5001
```

---

# Frontend Setup

## 1. Navigate to frontend

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file inside frontend folder:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

## 4. Start frontend server

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Create Signal

```http
POST /api/signals
```

### Request Body

```json
{
  "symbol": "BTCUSDT",
  "direction": "BUY",
  "entryPrice": 80000,
  "stopLoss": 79000,
  "targetPrice": 82000,
  "entryTime": "2026-05-15T10:00:00",
  "expiryTime": "2026-05-16T10:00:00"
}
```

---

## Get All Signals

```http
GET /api/signals
```

---

## Get Signal By ID

```http
GET /api/signals/:id
```

---

## Delete Signal

```http
DELETE /api/signals/:id
```

---

# Auto Refresh

The frontend automatically refreshes signal data every 15 seconds to fetch updated prices and statuses.

---

# Future Improvements

- Authentication
- WebSocket-based live updates
- Advanced charts
- Pagination and filtering
- Better UI/UX styling
- Deployment support

---

# Author

Mansi Jaiswal