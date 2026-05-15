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


Setup Instructions
Backend Setup
1. Navigate to backend
cd backend
2. Install dependencies
npm install
3. Create environment file

Create a .env file inside backend folder:

DATABASE_URL="file:./dev.db"
4. Run Prisma migration
npx prisma migrate dev --name init
5. Start backend server
npm run dev

Backend will run on:

http://localhost:5000

Frontend Setup

1. Navigate to frontend
cd frontend
2. Install dependencies
npm install
3. Start frontend server
npm run dev

Frontend will run on:

http://localhost:5173

API Endpoints

Create Signal
POST /api/signals
Request Body
{
  "symbol": "BTCUSDT",
  "direction": "BUY",
  "entryPrice": 80000,
  "stopLoss": 79000,
  "targetPrice": 82000,
  "entryTime": "2026-05-15T10:00:00",
  "expiryTime": "2026-05-16T10:00:00"
}

Get All Signals
GET /api/signals

Get Signal By ID
GET /api/signals/:id

Delete Signal
DELETE /api/signals/:id

Auto Refresh:-
The frontend automatically refreshes signal data every 15 seconds to fetch updated prices and statuses.

Future Improvements

Authentication
WebSocket-based live updates
Advanced charts
Pagination and filtering
Better UI/UX styling
Deployment support

Author

Mansi Jaiswal