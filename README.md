# ![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&duration=3000&pause=1000&color=00F7FF&center=true&vCenter=true&width=900&lines=Resume+Pro+%F0%9F%9A%80+%7C+Build+Your+Resume+in+Seconds!)

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

# 💡 About

**Resume Pro** is a **MERN Stack** powered backend that lets you **build, manage, and store professional resumes** in seconds. Fast, secure, and designed for scalability!

Built using modern Node.js libraries and clean, scalable code architecture.

---

# 👨‍💻 Built With

- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
- MongoDB + Mongoose
- JWT Authentication + bcrypt
- Multer for File Uploads
- dotenv for Environment Management
- cors for Secure API Communication
- nodemon for Development

---

# 📊 Features

- 🔐 Secure Authentication (Register/Login/Get User)
- 🔍 Create, Read, Update, Delete Resumes
- 📸 Upload Profile Images and Thumbnails
- 🔍 Get Resume by ID or all resumes for a user
- 🌟 Fully protected routes with JWT
- 🚀 Scalable API design

---

# 🌐 API Endpoints

### 🔒 Auth Routes

| Method | Route                    | Description        |
|:------:|:-------------------------|:-------------------|
| POST   | `/api/auth/register`     | Register new user  |
| POST   | `/api/auth/login`        | Login user         |
| GET    | `/api/auth/user/profile` | Get current user   |

### 📄 Resume Routes

| Method | Route                       | Description             |
|:------:|:----------------------------|:------------------------|
| POST   | `/api/resume`               | Create a new resume     |
| GET    | `/api/resume/get`           | Get all user resumes    |
| GET    | `/api/resume/get/:id`       | Get a resume by ID      |
| PUT    | `/api/resume/update/:id`    | Update resume           |
| DELETE | `/api/resume/delete/:id`    | Delete resume           |
| POST   | `/api/resume/upload/images` | Upload profile image    |
| POST   | `/api/resume/upload/images` | Upload resume thumbnail |

---

# 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/itz-Hiru/Resume-Pro-Backend.git

# Navigate to project directory
cd Resume-Pro-Backend

# Install dependencies
npm install

# Create a .env file and add necessary variables

# Run server
npm run dev
```

---

# 📁 Environment Variables

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

# 📦 Project Structure

```bash
resume-pro-backend/
├── config/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── uploads/
├── .env
├── server.js
├── package.json
└── README.md
```

---

# 📷 Uploads

- **Profile Images**: `/uploads/`
- **Resume Thumbnails**: `/uploads/`

---

# 🔍 License

This project is licensed under the [MIT License](LICENSE).

---

# 💬 Let's Connect

<p align="center">
  <a href="https://hirumitha-portfolio.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-Visit-007ACC?style=for-the-badge&logo=vercel&logoColor=white"/>
  </a>
  <a href="https://github.com/itz-Hiru" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://linkedin.com/in/Hirumitha" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
</p>

---

> "Crafted with ❤️ and Node.js magic!"

![Thanks](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&pause=1000&color=36BCF7&center=true&vCenter=true&lines=Thank+you+for+using+Resume+Pro!;Happy+Coding!)

