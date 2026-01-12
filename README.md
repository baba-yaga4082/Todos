# 📝 Todo Application

A full-stack Todo application built with React and Node.js, featuring user authentication and CRUD operations for managing tasks.

## ✨ Features

- 🔐 **User Authentication**: Sign up and sign in with JWT-based authentication
- ✅ **Task Management**: Create, read, update, and delete todos
- 👤 **User-specific Tasks**: Each user can only see and manage their own tasks
- 🎨 **Modern UI**: Beautiful and responsive user interface built with React
- 🔄 **Real-time Updates**: Instant feedback with toast notifications
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (running locally on port 27017)
- **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/baba-yaga4082/Todos.git
   cd Todos
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Configuration

### Backend Configuration

1. **MongoDB Connection**
   - Ensure MongoDB is running on `localhost:27017`
   - The database name is `user` (can be changed in `backend/connection/connection.js`)

2. **Environment Variables** (Optional)
   - Create a `.env` file in the `backend` directory
   - Add your JWT secret:
     ```
     JWT_SECRET=your_secret_key_here
     ```
   - If not provided, a default secret will be used (not recommended for production)

### Frontend Configuration

- The frontend is configured to connect to `http://localhost:3000` for API calls
- Update the API URL in the frontend components if your backend runs on a different port

## 🏃 Running the Application

### Start MongoDB
Make sure MongoDB is running:
```bash
# On Windows (if installed as service, it should start automatically)
# Or start manually:
mongod
```

### Start Backend Server
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```
The backend server will run on `http://localhost:3000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## 📡 API Endpoints

### Authentication
- `POST /api/register` - Register a new user
  - Body: `{ email, username, password }`
  
- `POST /api/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user, token }`

### Tasks (Protected Routes - Requires JWT Token)
- `GET /api/gettasks` - Get all tasks for the authenticated user
  - Headers: `Authorization: Bearer <token>`
  
- `POST /api/addtask` - Create a new task
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, body }`
  
- `PUT /api/updatetask/:id` - Update a task
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, body }`
  
- `DELETE /api/deletetask/:id` - Delete a task
  - Headers: `Authorization: Bearer <token>`

## 📁 Project Structure

```
Todos/
├── backend/
│   ├── app.js                 # Express server entry point
│   ├── connection/
│   │   └── connection.js      # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── user.js            # User model
│   │   └── list.js            # Todo/List model
│   ├── routes/
│   │   ├── route.js           # Authentication routes
│   │   └── list.js            # Todo CRUD routes
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Home.jsx       # Home page component
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── Signin.jsx     # Sign in component
│   │   │   ├── Signup.jsx     # Sign up component
│   │   │   ├── Store/
│   │   │   │   ├── store.js   # Redux store
│   │   │   │   └── counterSlice.js  # Auth state slice
│   │   │   └── todo/
│   │   │       ├── TodoInput.jsx  # Main todo component
│   │   │       ├── update.jsx     # Update todo modal
│   │   │       └── view.jsx       # View todo modal
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 Key Features Explained

### Authentication Flow
1. User registers with email, username, and password
2. Password is hashed using bcryptjs
3. On login, JWT token is generated and stored in sessionStorage
4. Token is sent with each API request in the Authorization header

### Task Management
- Tasks are associated with users via MongoDB ObjectId references
- Users can only access their own tasks
- Tasks include title and body fields
- Timestamps are automatically added (createdAt, updatedAt)

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- CORS enabled for cross-origin requests
- Input validation on backend

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `backend/connection/connection.js`
- Check if port 27017 is available

### Port Already in Use
- Backend: Change port in `backend/app.js` (default: 3000)
- Frontend: Vite will automatically use the next available port

### CORS Errors
- Ensure backend CORS is enabled (already configured)
- Check if frontend URL matches the allowed origins

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**baba-yaga4082**
- GitHub: [@baba-yaga4082](https://github.com/baba-yaga4082)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/baba-yaga4082/Todos/issues).

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution

---

⭐ If you find this project helpful, please give it a star!
