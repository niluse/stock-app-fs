# Stock Management System - Setup Guide

## Overview

This is a full-stack Stock Management System with a React frontend and Node.js/Express backend using MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation Steps

### 1. MongoDB Setup

#### Option A: Local MongoDB Installation

1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:

   - **Linux**: `sudo systemctl start mongod`
   - **macOS**: `brew services start mongodb-community`
   - **Windows**: MongoDB runs as a service automatically after installation

3. Verify MongoDB is running:
   ```bash
   mongosh
   ```
   You should see the MongoDB shell prompt.

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `server/.env` file with your Atlas connection string:
   ```
   MONGODB=mongodb+srv://username:password@cluster.mongodb.net/stockManagement
   ```

### 2. Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Verify the `.env` file exists with correct settings:

   ```
   NODE_ENV=development
   HOST=127.0.0.1
   PORT=8000
   MONGODB=mongodb://127.0.0.1:27017/stockManagement
   SECRET_KEY=a7db7ashd7ashd7ahsd7ashd7ashd7hasd7g2367f4e219er
   ACCESS_KEY=asida87shd7ahsdh7as7dhas7dh7sadhas7dha7sdha7sdhas
   REFRESH_KEY=ijasd8ahsd8jhas8dha8sd8asdh8ashd8ashd8ahsd*ds9d9f
   PAGE_SIZE=25
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The server should start at http://127.0.0.1:8000

### 3. Frontend Setup

1. Open a new terminal and navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Verify the `.env` file exists:

   ```
   REACT_APP_BASE_URL=http://127.0.0.1:8000
   ```

4. Start the frontend development server:

   ```bash
   npm start
   ```

   The app should open automatically at http://localhost:3000

## Creating Initial Users

### Method 1: Using the Register Page

1. Open http://localhost:3000/register
2. Fill in the registration form
3. This creates a regular user (not admin/staff)

### Method 2: Using MongoDB Shell (For Admin User)

1. Open MongoDB shell:

   ```bash
   mongosh
   ```

2. Switch to the database:

   ```javascript
   use stockManagement
   ```

3. Create an admin user:
   ```javascript
   db.users.insertOne({
     username: "admin",
     password: "$2a$10$encrypted_password_here",
     email: "admin@site.com",
     firstName: "Admin",
     lastName: "User",
     isActive: true,
     isStaff: true,
     isAdmin: true,
     createdAt: new Date(),
     updatedAt: new Date(),
   });
   ```

### Method 3: Using API (Recommended for First User)

1. Register through the app at http://localhost:3000/register
2. Then manually update the user in MongoDB to make them admin:
   ```javascript
   use stockManagement
   db.users.updateOne(
     { email: "your@email.com" },
     { $set: { isAdmin: true, isStaff: true } }
   )
   ```

## Default Test Users

You can create these users for testing:

**Admin User:**

- Username: admin
- Email: admin@site.com
- Password: aA?123456
- Role: Admin (isAdmin: true, isStaff: true)

**Staff User:**

- Username: staff
- Email: staff@site.com
- Password: aA?123456
- Role: Staff (isStaff: true)

**Regular User:**

- Username: test
- Email: test@site.com
- Password: aA?123456
- Role: User (regular permissions)

## Password Requirements

- Minimum 8 characters
- Maximum 16 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%\*?&)

## API Documentation

Once the backend is running, you can access:

- Swagger UI: http://127.0.0.1:8000/documents/swagger
- ReDoc: http://127.0.0.1:8000/documents/redoc
- JSON: http://127.0.0.1:8000/documents/json

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `sudo systemctl status mongod` (Linux)
- Check if port 27017 is available: `netstat -an | grep 27017`
- Verify connection string in `server/.env`

### CORS Issues

- The backend is configured to accept requests from any origin
- If you change the frontend port, no changes needed

### Port Already in Use

- Backend (8000): Change PORT in `server/.env`
- Frontend (3000): React will automatically suggest port 3001

### Dependencies Issues

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Project Structure

### Backend (server/)

- `index.js` - Entry point
- `src/models/` - MongoDB schemas
- `src/controllers/` - Business logic
- `src/routes/` - API endpoints
- `src/middlewares/` - Authentication, permissions, error handling
- `src/configs/` - Database connection
- `src/helpers/` - Utility functions

### Frontend (client/)

- `src/pages/` - Page components
- `src/components/` - Reusable UI components
- `src/features/` - Redux slices
- `src/service/` - API calls and custom hooks
- `src/router/` - Routing configuration

## Features

- User authentication (JWT + Token-based)
- Role-based access control (Admin, Staff, User)
- CRUD operations for:
  - Products
  - Brands
  - Categories
  - Firms
  - Purchases
  - Sales
- Dashboard with analytics
- Automatic stock quantity management
- Responsive design

## Development Notes

- Backend uses nodemon for auto-restart
- Frontend uses React hot reload
- Redux Persist stores auth state in session storage
- All API endpoints require authentication except register and login

## Production Deployment

1. Build the frontend:

   ```bash
   cd client
   npm run build
   ```

2. Set environment variables for production
3. Use a process manager like PM2 for the backend
4. Use a reverse proxy like Nginx
5. Enable HTTPS
6. Use MongoDB Atlas or a managed MongoDB service

## Support

For issues or questions, check the API documentation or review the code comments.
