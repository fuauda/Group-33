# CommunityConnect – A Civic Engagement and Social Impact Platform

## 🚀 Project Overview

CommunityConnect is a full-stack platform built to bridge the gap between citizens, NGOs, and donors. It empowers communities by simplifying volunteer coordination, promoting donation transparency, and enabling citizens to raise and track local civic issues. This platform directly addresses real-world challenges such as lack of volunteer-matching systems, inaccessible NGOs, opaque donation usage, exclusion of marginalized groups, and the absence of civic reporting tools.

## Key Features

### 🧑 Volunteers
- Discover NGOs based on skills and location
- Apply for matching opportunities
- View contribution history and badges

### 🏢 NGOs
- Post volunteer needs and project details
- Receive and manage volunteer applications
- Maintain a public profile with mission and impact

### 💰 Donors
- Donate with transparency and accountability
- Track how donations are used
- Support verified campaigns and NGOs

### 🏙 Citizens
- Report civic issues with geolocation and photos
- Track issue status and public responses
- Upvote community problems for visibility

### 🧑‍💼 Admins
- Approve NGOs and campaigns
- Oversee reports and issue status
- Manage users, access control, and content

---

## ⚙️ Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev

cd backend
npm install
npm run dev


community-connect/
├── frontend/           # React + Zustand + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/       # Zustand state stores
│   │   └── services/    # Axios API calls
│   └── package.json
├── backend/            # Node.js + Express + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
└── README.md
