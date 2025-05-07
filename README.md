# Task Tracker - MERN Stack Application  

A full-stack Task Tracker application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can create accounts, log in, and manage their tasks with CRUD operations. Features JWT authentication, protected routes, and user-specific task management.  

## ✨ Features  

✅ User Authentication – Signup, Login, Logout using JWT & cookies  
✅ Task Management – Create, Read, Update, Delete tasks  
✅ User-Specific Tasks – Each user sees only their tasks  
✅ Protected Routes – Only logged-in users can access the dashboard  
✅ Responsive UI – Works on desktop & mobile devices  

## 🛠️ Technologies Used  

### Backend (Node.js + Express)  
- bcrypt – Password hashing  
- jsonwebtoken (JWT) – Secure authentication  
- cookie-parser – Manage HTTP cookies for JWT storage  
- mongoose – MongoDB ODM    
- cors – Cross-Origin Resource Sharing  

### Frontend (React)  
- react-router-dom – Client-side routing  
- axios – HTTP requests to backend  
- context API / useState – State management  
- React hooks – Functional components    

### Database  
- MongoDB Atlas – Cloud database  

## 🚀 Installation & Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/BhumaSai/taskmangement.git
cd GIGDE_ASSIGNMENT
```

### 2. Set up the Backend  
```bash
cd backend
npm install
```  
Create a `.env` file in the backend folder:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```  
Start the backend server:  
```bash
npm run server
```  

### 3. Set up the Frontend  
```bash
cd ../frontend
npm install
```  
Start the React app:  
```bash
npm start
```  

## 📂 Project Structure  

```
task-tracker-mern/  
├── backend/  
│   ├── models/           # MongoDB models (User, Task, Project)    
│   ├── routes/           # API routes  
│   ├── middleware/       # Auth middleware  
│   └── index.js         # Express server  
└── frontend/  
    ├── src/  
    │   ├── components/   # React components  
    │   ├── Auth/         # user Authentication   
    │   ├── Dashboard/    # authorized users can accesd 
    │   └── App.js        # Main React app  
    └── public/           # Static files  
```  

## 🔒 Authentication Flow  

1. Signup → User registers, password is hashed with `bcrypt`  
2. Login → Server validates credentials & issues a JWT stored in HTTP-only cookies  
3. Protected Routes → Middleware verifies JWT before granting access  
4. Logout → Clears JWT cookie  
