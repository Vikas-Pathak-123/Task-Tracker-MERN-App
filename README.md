# Task Tracker Application

A full-stack task management application with React frontend and Node.js backend.

---

## ✨ Features

- User authentication (login/registration)
- Create, read, update, and delete tasks
- Task filtering (all/completed/uncompleted)
- Responsive Material-UI design

---

## ⚙️ Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (local or cloud, e.g., MongoDB Atlas)

---

## 🚀 Installation

### 🔧 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/tasktracker
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

---

### 🎨 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend root:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🧩 Running the Application

Start both **backend** and **frontend** servers in separate terminals:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

Then open your browser at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

### ✅ Backend Tests

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run tests:
   ```bash
   npm test
   ```

---

### ✅ Frontend Tests

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Run tests:
   ```bash
   npm test
   ```

#### Additional Commands:
```bash
# Run in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🗂️ Project Structure

```
task-tracker/
├── backend/              # Node.js API server
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── tests/            # API unit/integration tests
├── frontend/             # React application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service modules
│   │   └── tests/        # Component tests
│   └── vite.config.js    # Vite config
```

---

## 🌍 Environment Variables

### 🔒 Backend
| Key         | Description                        |
|-------------|------------------------------------|
| `PORT`      | Port number for the backend server |
| `MONGO_URI` | MongoDB connection string          |
| `JWT_SECRET`| Secret key for JWT auth            |

### 🌐 Frontend
| Key            | Description                         |
|----------------|-------------------------------------|
| `VITE_API_URL` | Base URL of your backend API server |

---

## 📜 Available Scripts

### 🔧 Backend

| Script             | Description                          |
|--------------------|--------------------------------------|
| `npm start`        | Start the backend server             |
| `npm run dev`      | Start with nodemon for dev mode      |
| `npm test`         | Run backend tests                    |

### 🎨 Frontend

| Script               | Description                             |
|----------------------|-----------------------------------------|
| `npm run dev`        | Start Vite dev server                   |
| `npm run build`      | Build for production                    |
| `npm test`           | Run tests                               |
| `npm run test:watch` | Run tests in watch mode                 |
| `npm run test:coverage` | Generate test coverage report       |


---
---

## 🚀 Deployed Application

### 🔗 Frontend
**Live Demo:** [Task Tracker on Vercel](https://task-tracker-mern-app.vercel.app/)  

### 🔗 Backend
**API Base URL:** [Render API Endpoint](https://task-tracker-mern-app.onrender.com/)  

---

## 🔐 Test Admin Login

Use the following credentials to log in as a test admin user:

```text
Email:    admin@gmail.com  
Password: 123@Admin
```

> ⚠️ **Note:** Make sure the user exists in your MongoDB database. You may need to manually seed it or register it via the app.
---

## 🛠️ Troubleshooting

- **Command not found?**  
  Ensure you're in the correct directory and have run `npm install`.

- **Test failures?**  
  Make sure:
  - MongoDB is running
  - Backend server is up
  - API URLs are correctly set

- **Environment mismatch?**  
  Verify your `.env` values and `node -v`, `npm -v` versions.

---

Happy coding! 💻✨
