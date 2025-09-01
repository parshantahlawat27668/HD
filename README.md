# HD Notes App

A fully scalable, secure, and user-friendly notes application built as a part of an assignment. This app allows users to **sign up/login using Gmail OTP**, create, view, and delete notes with a clean and responsive UI. Both frontend and backend are optimized for performance and security.

---

## 🚀 Features

- **OTP-based Email Authentication** (Sign Up & Sign In)
- **JWT-based Authentication** (Access & Refresh Tokens)
- **CORS Enabled** for secure cross-origin requests
- **Password Security** with `bcrypt`
- **Validation** on both Frontend & Backend
- **Secure & Scalable Database** interactions with MongoDB
- **Fast & Lightweight** implementation
- **User-friendly responses** using `react-hot-toast`
- **MVC Folder Structure** for organized code
- **Lite & Optimized** for performance and scalability

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Libraries:** react-hot-toast, bcrypt, JWT, cors
- **Architecture:** MVC pattern, scalable folder structure

---

## 🌐 Live Demo

Check out the live version of the app here: [HD Notes Live Demo](https://hdnotesassignment2.netlify.app)

---

## 📂 Folder Structure

### Backend (/)
```text
backend/
├── src/
│   ├── controllers/     # Route handlers / business logic
│   ├── db/              # Database connection
│   ├── middlewares/     # Custom middlewares (auth, error handling, etc.)
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── utils/           # Helper functions & utilities
│   ├── app.ts           # Express app configuration
│   ├── constants.ts     # Application constants
│   └── server.ts        # Server entry point
├── .env                 # Environment variables
├── package.json         # Backend dependencies & scripts
├── tsconfig.json        # TypeScript configuration
└── README.md

frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, static files
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages
│   ├── routes/          # Frontend routing
│   ├── store/           # Redux store & slices
│   ├── App.tsx          # Root component
│   ├── main.tsx         # React entry point
│   ├── App.css          # Global styles
│   ├── index.css        # Tailwind / base CSS
│   └── vite-env.d.ts    # Vite environment types
├── .env                 # Environment variables
├── index.html           # Main HTML file
├── package.json         # Frontend dependencies & scripts
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite configuration
└── README.md