# MediLink – A Modern Healthcare Management System (MERN Stack)

MediLink is a full-stack healthcare platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project tackles real problems in healthcare like long patient wait times, missing medical history, poor rural access, and untracked medicine stocks.

## Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

## Project Structure

```
Group-33/
├── frontend/          # React + Zustand + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/     # Zustand stores
│   │   └── services/  # API calls
│   └── package.json
├── backend/           # Node.js + Express + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
└── README.md
```

## Tech Stack

### Frontend
- React.js with Vite
- Zustand for state management
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- CORS enabled

## Environment Variables

Create `.env` file in backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medilink
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

## Default Ports
- Frontend: http://localhost:3000
- Backend: http://localhost:5000