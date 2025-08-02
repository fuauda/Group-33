# Requirement Specification Document (RSD)

## 📘 Project Name
**MediLink – A Modern Healthcare Management System**

---

## 🧠 Project Description

MediLink is a full-stack healthcare platform designed to simplify and digitize healthcare processes. The system connects patients, doctors, and administrators, enabling efficient appointment management, patient record handling, and communication in a secure and user-friendly environment.

---

## 🎯 Objectives

- To provide a secure and modern platform for healthcare delivery
- To digitize appointment booking and medical records
- To enable communication between doctors and patients
- To allow administrators to manage the system effectively

---

## 👥 Target Users

- **Patients**: Individuals seeking medical consultation
- **Doctors**: Registered medical practitioners
- **Admins**: Healthcare facility staff managing the system

---

## 🧩 Functional Requirements

### 1. User Authentication & Authorization
- Users can register and log in securely
- Role-based access: patient, doctor, admin
- JWT-based token authentication

### 2. Patient Features
- Register and manage profile
- Book, reschedule, or cancel appointments
- View appointment history and medical records
- Receive prescription details and test results

### 3. Doctor Features
- View schedule and manage appointments
- View and update patient medical records
- Write and send prescriptions
- Upload test/lab results


### 4. Admin Features
- Add, edit, or delete doctors and patients
- Monitor system activity and logs
- Assign or revoke user roles
- Access usage analytics and reports

### 5. Medical Records
- Store and retrieve patient medical history
- Allow doctors to update or add new records
- Patients can view but not modify records

## 📱 Non-Functional Requirements

### 1. Usability
- Clean, responsive UI with accessibility support
- Easy-to-navigate interface for all user types

### 2. Performance
- Fast load times for key actions

### 3. Scalability
- Support for scaling up with more users and data
- Cloud-friendly deployment

### 4. Security
- Encrypted user data and passwords
- Role-based access control (RBAC)
- HTTPS support and secure API endpoints

### 5. Availability
- Minimum 99.9% uptime (future deployment goal)
- System should fail gracefully with user-friendly error messages

---

## 💻 System Requirements

### Client (Frontend)
- React.js
- Tailwind CSS
- Axios
- React Router

### Server (Backend)
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

---

## 🔄 External Interfaces

| Interface | Description |
|----------|-------------|
| File Storage |Firebase for uploading prescriptions/lab results |
| Database | MongoDB for managing all user and medical data |
| Hosting |  |
| API Testing | Postman for verifying endpoints |

---

## 🧪 Acceptance Criteria

- All users can log in based on role and access only their permitted data
- Patients can book appointments and view their records
- Doctors can update patient records and manage schedules
- Admin can manage all users and see system stats
- System passes all functional and security tests

---

## 📝 Future Enhancements 

- AI-powered symptom checker
- Multi-language support
- Video consultation
- Offline support
- Integration with external hospital databases

---

## 📅 Timeline

| Task                         | Deadline          |
|------------------------------|------------------ |
| Requirement Gathering        | week-1            |
| Frontend Development         |                   |
| Backend API & DB Integration |                   |
| Testing & Bug Fixing         |                   |
| Final Deployment & Demo      |                   |

---

## 👨‍💻 Team Roles

| Name             | Role                       |
|------------------|----------------------------|
| Ashenafi Bancha  |                            |
| Fuad Tesfaye     |                            |
| Muluken Seifu    |                            |
|Shegitu Shukuri   |                            |


                             
---

## 📍 Conclusion

MediLink is designed to transform how healthcare facilities manage patient-doctor interactions. 

