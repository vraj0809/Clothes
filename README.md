<h1 align="center">🛍️ Clothes - Full Stack E-Commerce Platform</h1>

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=react" alt="MERN Stack">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
</p>

## 📖 Overview

**Clothes** is a comprehensive, production-ready E-commerce web application built using the modern **MERN stack** (MongoDB, Express, React, Node.js) combined with **Vite** for blazing fast frontend tooling. It provides a complete end-to-end shopping experience featuring secure authentication, product browsing, a seamless shopping cart, and an integrated payment gateway. 

This project aims to showcase robust full-stack architecture, making it an excellent resource for MERN stack learners and a demonstration of practical, scalable coding practices for tech recruiters.

---

## ✨ Features

### 🛒 Client (Shopper Facing)
- **User Authentication:** Secure email/password login and Google OAuth integration using Firebase.
- **Product Catalog:** Browse products with categories, rich descriptions, and related items.
- **Shopping Cart & Checkout:** A smooth cart experience that persists data securely.
- **Payment Gateway Integration:** Integrated **Razorpay** for seamless online transactions.
- **Responsive Design:** A mobile-first, highly responsive UI, styled beautifully for all devices.
- **Toast Notifications:** Real-time feedback for user actions via `react-toastify`.

### 🛡️ Admin Dashboard (Management)
- **Protected Routes:** Secure access for administrative tasks only.
- **Product Management:** Full CRUD operations (Add, View, Update, Delete) for products.
- **Media Handling:** Direct image uploads to **Cloudinary** ensuring fast and scalable image delivery.
- **Modern UI:** Built with **Tailwind CSS** for a clean, intuitive, and professional administrative interface.

### ⚙️ Backend (Server API)
- **RESTful API Architecture:** Clean, modularized Express.js server routes.
- **Database Schema:** Mongoose models with robust validation.
- **Security:** Password hashing with `bcrypt` and route protection using `jsonwebtoken` (JWT).
- **Email Services:** Automated transactional emails configured via `nodemailer`.
- **File Uploads:** Handled efficiently with `multer` middleware before dispatching to Cloudinary.

---

## 🏗️ Architecture & Folder Structure

The project follows a monorepo-style structure, separating concerns cleanly:

```text
clothes/
├── client/           # Frontend React App (Vite)
├── admin/            # Admin Dashboard React App (Vite + Tailwind)
└── server/           # Backend API (Node.js + Express)
```

---

## 🛠️ Tech Stack & Dependencies

### Frontend (`/client` & `/admin`)
- **Core:** React 19, React Router DOM, Vite
- **Styling:** Tailwind CSS (Admin), Custom CSS (Client)
- **State/Requests:** Axios
- **Third-Party:** Firebase (Auth), React Icons, React Toastify

### Backend (`/server`)
- **Core:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security & Auth:** bcrypt, jsonwebtoken, CORS
- **Third-Party Integrations:** Cloudinary, Razorpay, Nodemailer
- **Utilities:** Multer, Dotenv, Validator

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB account (or local instance)
- Cloudinary account (for image uploads)
- Razorpay account (for payment testing)

### Installation

**1. Clone the repository:**
```bash
git clone <your-repo-url>
cd Clothes
```

**2. Setup the Server (Backend):**
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASS=your_admin_password
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
```
Run the server:
```bash
npm run dev
```

**3. Setup the Client (Frontend):**
Open a new terminal tab.
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_GOOGLE_LOGIN_API_KEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```
Run the client:
```bash
npm run dev
```

**4. Setup the Admin Dashboard:**
Open a new terminal tab.
```bash
cd admin
npm install
```
Run the admin app:
```bash
npm run dev
```

---

## 📸 Screenshots
*(HR and Learners: You can add screenshots of your application here. Good screenshots significantly increase repository engagement!)*

- **Home Page**
  - `![Home Page Screenshot](./assets/home.png)`
- **Product Details**
  - `![Product Details Screenshot](./assets/product.png)`
- **Admin Dashboard**
  - `![Admin Dashboard Screenshot](./assets/admin.png)`

---

## 🧠 What I Learned (For Learners & HR)
Building this project allowed me to deeply understand and implement:
1. **State Management & Routing:** Managing complex application states across different user journeys utilizing React Hooks and React Router.
2. **Third-Party API Integration:** Effectively working with external services like Razorpay for payments and Cloudinary for media storage.
3. **Security Best Practices:** Implementing secure authentication flows using JWT, bcrypt for password hashing, and protecting backend routes.
4. **Full-Stack Deployment:** Preparing and optimizing separate React applications alongside a Node backend for production.
5. **Modern Build Tools:** Leveraging Vite for rapid frontend development and tailored bundling.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and available under the **ISC License**.
