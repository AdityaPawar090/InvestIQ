<div align="center">

# 📈 InvestIQ

### Smart Investment & Portfolio Management Platform

<p align="center">
A modern <b>MERN Stack</b> web application that enables users to securely manage investments, monitor portfolios, and explore a seamless trading experience through an intuitive and responsive dashboard.
</p>

<p align="center">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>

<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express"/>

<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb"/>

<img src="https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens"/>

<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap"/>

<img src="https://img.shields.io/badge/REST%20API-00599C?style=for-the-badge"/>

</p>

</div>

---

# 📑 Table of Contents

- About
- Features
- Tech Stack
- Architecture
- Folder Structure
- Getting Started
- Installation
- Environment Variables
- API Overview
- Security
- Future Enhancements
- Contributing
- License
- Author

---

# 📖 About

**InvestIQ** is a full-stack investment and portfolio management platform built using the **MERN Stack**.

The application demonstrates modern web development concepts including authentication, RESTful API development, MongoDB integration, responsive UI design, and secure client-server communication.

The project focuses on delivering a clean, scalable, and user-friendly investment dashboard inspired by modern trading platforms.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Session Management

---

## 📊 Dashboard

- Portfolio Dashboard
- Holdings Overview
- Positions Overview
- Order Management
- Investment Summary

---

## 💹 Portfolio

- View Holdings
- View Positions
- Portfolio Tracking
- Investment Monitoring

---

## 🎨 Frontend

- Responsive Layout
- Bootstrap Components
- Modern UI
- Mobile Friendly
- Component-Based Architecture

---

## ⚙ Backend

- REST APIs
- Express.js Server
- MongoDB Database
- Mongoose ODM
- Middleware
- Error Handling

---

# 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React.js |
| Styling | HTML5, CSS3, Bootstrap |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| Version Control | Git, GitHub |
| API Testing | Postman |
| IDE | Visual Studio Code |

---

# 🏗 System Architecture

```text
                        Client

                          │

                          ▼

                 React Frontend

                          │

                    REST API Calls

                          │

                          ▼

              Express.js + Node.js

                          │

            JWT Authentication Layer

                          │

                          ▼

                 MongoDB Database
```

---

# 📂 Folder Structure

```text
InvestIQ

├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   └── package.json
│
├── dashboard
│   ├── public
│   ├── src
│   └── package.json
│
├── .gitignore
├── LICENSE
├── README.md
└── package-lock.json
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/AdityaPawar090/InvestIQ.git
```

Move into the project directory

```bash
cd InvestIQ
```

---

# 📦 Installation

## Backend

```bash
cd backend
npm install
```

Start backend

```bash
npm run dev
```

---

## Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## Dashboard

```bash
cd ../dashboard
npm install
npm start
```

---

# ⚙ Environment Variables

Create a **.env** file inside the backend folder.

```env
PORT=3002

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📡 API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/holdings | Get Holdings |
| GET | /api/positions | Get Positions |
| POST | /api/orders | Place Order |

---

# 🔒 Security

- JWT Authentication
- Password Encryption
- Protected API Routes
- Environment Variables
- Secure Database Connection

---

# 🎯 Learning Outcomes

This project demonstrates practical implementation of:

- Full Stack MERN Development
- Authentication & Authorization
- RESTful APIs
- CRUD Operations
- MongoDB Integration
- MVC Architecture
- Responsive UI Design
- Git & GitHub Workflow

---

# 📈 Future Enhancements

- AI-Based Investment Suggestions
- Real-Time Stock Prices
- Interactive Portfolio Charts
- Watchlist
- Dark Mode
- Email Verification
- Password Reset
- News Integration
- Price Alerts
- Admin Dashboard
- Notifications

---

# 🤝 Contributing

Contributions are welcome!

```bash
# Fork Repository

# Create Branch
git checkout -b feature-name

# Commit Changes
git commit -m "Add new feature"

# Push Changes
git push origin feature-name

# Create Pull Request
```

---

# 📜 License

Distributed under the **MIT License**.

---

# 👨‍💻 Author

## Aditya Pawar

**Electronics & Telecommunication Engineering Student**

Passionate about

- Full Stack Development
- MERN Stack
- Java
- Data Structures & Algorithms
- Artificial Intelligence

### Connect

GitHub

https://github.com/AdityaPawar090

LinkedIn

https://linkedin.com/in/your-linkedin-profile

---

<div align="center">

## ⭐ Star this repository if you found it useful!

**Built with ❤️ using React, Node.js, Express & MongoDB**

</div>
