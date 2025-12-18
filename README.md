# Stock Management System

A full-stack inventory and order management application built with React, Node.js, Express, and MongoDB. This system provides comprehensive tools for managing products, suppliers, sales, purchases, and real-time stock tracking with analytics.

![Stock Management System](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [User Roles & Permissions](#user-roles--permissions)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality

- **User Authentication & Authorization**

  - JWT and Token-based authentication
  - Role-based access control (Admin, Staff, User)
  - Secure password encryption
  - Session persistence

- **Inventory Management**

  - Product CRUD operations
  - Category and brand management
  - Real-time stock quantity tracking
  - Automatic stock updates on purchases/sales

- **Purchase Management**

  - Record supplier purchases
  - Automatic stock increment
  - Purchase history and analytics
  - Firm (supplier) management

- **Sales Management**

  - Record sales transactions
  - Automatic stock decrement
  - Stock validation (prevent overselling)
  - Sales history and analytics

- **Dashboard & Analytics**

  - KPI cards (Total Sales, Purchases, Profit)
  - Interactive area charts
  - Real-time data visualization
  - Date-based transaction tracking

- **Responsive Design**
  - Mobile-friendly interface
  - Material-UI components
  - Intuitive navigation
  - Toast notifications

## 🛠 Tech Stack

### Frontend

- **React 18** - UI library
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **Material-UI (MUI)** - Component library
- **Tremor React** - Data visualization
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client
- **React Router v6** - Routing
- **React Toastify** - Notifications

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Morgan** - HTTP logging
- **Swagger** - API documentation
- **CORS** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **MongoDB** (v4.4 or higher)
  - Local installation OR
  - MongoDB Atlas account (free tier available)

### Check Your Versions

```bash
node --version
npm --version
mongod --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd stock-app-fs
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# The .env file should already exist with these settings:
# NODE_ENV=development
# HOST=127.0.0.1
# PORT=8000
# MONGODB=mongodb://127.0.0.1:27017/stockManagement
# SECRET_KEY=a7db7ashd7ashd7ahsd7ashd7ashd7hasd7g2367f4e219er
# ACCESS_KEY=asida87shd7ahsdh7as7dhas7dh7sadhas7dha7sdha7sdhas
# REFRESH_KEY=ijasd8ahsd8jhas8dha8sd8asdh8ashd8ashd8ahsd*ds9d9f
# PAGE_SIZE=25
```

### 3. Frontend Setup

```bash
# Open a new terminal
cd client

# Install dependencies
npm install

# The .env file should already exist with:
# REACT_APP_BASE_URL=http://127.0.0.1:8000
```

### 4. Start MongoDB

**Linux/Ubuntu:**

```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

**macOS:**

```bash
brew services start mongodb-community
```

**Windows:**
MongoDB runs as a service automatically after installation.

**Verify Connection:**

```bash
mongosh
# You should see the MongoDB shell
```

### 5. Start the Application

**Terminal 1 - Backend:**

```bash
cd server
npm start
```

Server runs at: `http://127.0.0.1:8000`

**Terminal 2 - Frontend:**

```bash
cd client
npm start
```

App opens at: `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

#### Backend (`server/.env`)

```env
NODE_ENV=development          # Environment mode
HOST=127.0.0.1               # Server host
PORT=8000                    # Server port
MONGODB=mongodb://127.0.0.1:27017/stockManagement  # MongoDB URI
SECRET_KEY=your_secret_key   # Password encryption key
ACCESS_KEY=your_access_key   # JWT access token key
REFRESH_KEY=your_refresh_key # JWT refresh token key
PAGE_SIZE=25                 # Default pagination size
```

#### Frontend (`client/.env`)

```env
REACT_APP_BASE_URL=http://127.0.0.1:8000  # Backend API URL
```

### MongoDB Atlas (Cloud Database)

If using MongoDB Atlas instead of local MongoDB:

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Get connection string
4. Update `server/.env`:

```env
MONGODB=mongodb+srv://username:password@cluster.mongodb.net/stockManagement
```

## 📖 Usage

### First Time Setup

#### 1. Register Your First User

1. Navigate to `http://localhost:3000/register`
2. Fill in the registration form:
   - Username: `admin`
   - Email: `admin@example.com`
   - Password: `Admin@123` (must meet requirements)
   - First Name: `Admin`
   - Last Name: `User`

#### 2. Make User an Admin

```bash
# Open MongoDB shell
mongosh

# Switch to database
use stockManagement

# Update user to admin
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true, isStaff: true } }
)
```

#### 3. Login and Start Using

- Login with your credentials
- You'll see the dashboard with navigation menu
- Start by adding categories, brands, and firms
- Then add products
- Finally, record purchases and sales

### Password Requirements

- Minimum 8 characters
- Maximum 16 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@$!%\*?&)

### Default Categories

The system automatically creates 10 default categories on first run:

- Electronics
- Clothing
- Food & Beverages
- Home & Garden
- Sports & Outdoors
- Books & Media
- Toys & Games
- Health & Beauty
- Automotive
- Office Supplies

### Workflow Example

1. **Add a Category** (e.g., "Electronics")
2. **Add a Brand** (e.g., "Samsung")
3. **Add a Firm/Supplier** (e.g., "Tech Wholesale Inc.")
4. **Add a Product** (e.g., "Samsung Galaxy Phone")
   - Select category: Electronics
   - Select brand: Samsung
   - Initial quantity: 0
5. **Create a Purchase** (buying from supplier)
   - Select firm: Tech Wholesale Inc.
   - Select product: Samsung Galaxy Phone
   - Quantity: 100
   - Price: $500
   - Amount: $50,000 (calculated automatically)
   - Stock increases to 100
6. **Create a Sale** (selling to customer)
   - Select product: Samsung Galaxy Phone
   - Quantity: 10
   - Price: $800
   - Amount: $8,000 (calculated automatically)
   - Stock decreases to 90
7. **View Dashboard**
   - Total Sales: $8,000
   - Total Purchases: $50,000
   - Profit: -$42,000
   - Charts show transaction trends

## 📚 API Documentation

Once the backend is running, access interactive API documentation:

- **Swagger UI**: `http://127.0.0.1:8000/documents/swagger`
- **ReDoc**: `http://127.0.0.1:8000/documents/redoc`
- **JSON**: `http://127.0.0.1:8000/documents/json`

### Main Endpoints

#### Authentication

```
POST   /auth/login      - Login user
POST   /auth/logout     - Logout user
POST   /auth/refresh    - Refresh JWT token
```

#### Users

```
GET    /users           - List users (Admin only)
POST   /users           - Register new user (Public)
GET    /users/:id       - Get user details
PUT    /users/:id       - Update user
DELETE /users/:id       - Delete user (Admin only)
```

#### Categories

```
GET    /categories      - List all categories
POST   /categories      - Create category (Staff+)
GET    /categories/:id  - Get category
PUT    /categories/:id  - Update category (Staff+)
DELETE /categories/:id  - Delete category (Admin only)
```

#### Brands

```
GET    /brands          - List all brands
POST   /brands          - Create brand (Staff+)
GET    /brands/:id      - Get brand
PUT    /brands/:id      - Update brand (Staff+)
DELETE /brands/:id      - Delete brand (Admin only)
```

#### Firms (Suppliers)

```
GET    /firms           - List all firms
POST   /firms           - Create firm (Staff+)
GET    /firms/:id       - Get firm
PUT    /firms/:id       - Update firm (Staff+)
DELETE /firms/:id       - Delete firm (Admin only)
```

#### Products

```
GET    /products        - List all products
POST   /products        - Create product (Staff+)
GET    /products/:id    - Get product
PUT    /products/:id    - Update product (Staff+)
DELETE /products/:id    - Delete product (Admin only)
```

#### Purchases

```
GET    /purchases       - List all purchases
POST   /purchases       - Create purchase (Staff+)
GET    /purchases/:id   - Get purchase
PUT    /purchases/:id   - Update purchase (Staff+)
DELETE /purchases/:id   - Delete purchase (Staff+)
```

#### Sales

```
GET    /sales           - List all sales
POST   /sales           - Create sale (Staff+)
GET    /sales/:id       - Get sale
PUT    /sales/:id       - Update sale (Staff+)
DELETE /sales/:id       - Delete sale (Staff+)
```

### Query Parameters

All list endpoints support:

- **Filtering**: `?filter[field]=value`
- **Searching**: `?search[field]=value`
- **Sorting**: `?sort[field]=asc` or `?sort[field]=desc`
- **Pagination**: `?page=1&limit=25`

Example:

```
GET /products?search[name]=phone&sort[name]=asc&page=1&limit=10
```

## 📁 Project Structure

```
stock-app-fs/
├── client/                    # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── app/              # Redux store configuration
│   │   │   └── store.jsx
│   │   ├── assets/           # Images and static files
│   │   ├── components/       # Reusable UI components
│   │   │   ├── BrandCard.jsx
│   │   │   ├── BrandModule.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── CategoryModal.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── FirmCard.jsx
│   │   │   ├── FirmModal.jsx
│   │   │   ├── KPI.jsx
│   │   │   ├── MenuListItems.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   ├── ProductTable.jsx
│   │   │   ├── PurchaseModal.jsx
│   │   │   ├── PurchaseTable.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── SaleModal.jsx
│   │   │   └── SaleTable.jsx
│   │   ├── features/         # Redux slices
│   │   │   ├── authSlice.jsx
│   │   │   └── stockSlice.jsx
│   │   ├── helper/           # Utility functions
│   │   │   └── ToastNotify.js
│   │   ├── pages/            # Page components
│   │   │   ├── Brands.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Firms.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Purchases.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Sales.jsx
│   │   ├── router/           # Routing configuration
│   │   │   ├── AppRouter.jsx
│   │   │   └── PrivateRouter.jsx
│   │   ├── service/          # API service hooks
│   │   │   ├── useAuthCalls.jsx
│   │   │   ├── useAxios.jsx
│   │   │   └── useStockCalls.jsx
│   │   ├── styles/           # Global styles
│   │   │   └── globalStyles.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env                  # Environment variables
│   ├── .gitignore
│   └── package.json
│
├── server/                    # Backend Node.js application
│   ├── src/
│   │   ├── configs/          # Configuration files
│   │   │   ├── dbConnection.js
│   │   │   └── swagger.json
│   │   ├── controllers/      # Business logic
│   │   │   ├── auth.js
│   │   │   ├── brand.js
│   │   │   ├── category.js
│   │   │   ├── firm.js
│   │   │   ├── product.js
│   │   │   ├── purchase.js
│   │   │   ├── sale.js
│   │   │   ├── token.js
│   │   │   └── user.js
│   │   ├── helpers/          # Helper functions
│   │   │   ├── migrateToAmount.js
│   │   │   ├── passwordEncrypt.js
│   │   │   ├── seedCategories.js
│   │   │   ├── sendMail.js
│   │   │   └── sync.js
│   │   ├── middlewares/      # Express middlewares
│   │   │   ├── authentication.js
│   │   │   ├── errorHandler.js
│   │   │   ├── findSearchSortPage.js
│   │   │   ├── logger.js
│   │   │   ├── permissions.js
│   │   │   └── upload.js
│   │   ├── models/           # Mongoose schemas
│   │   │   ├── brand.js
│   │   │   ├── category.js
│   │   │   ├── firm.js
│   │   │   ├── product.js
│   │   │   ├── purchase.js
│   │   │   ├── sale.js
│   │   │   ├── token.js
│   │   │   └── user.js
│   │   └── routes/           # API routes
│   │       ├── auth.js
│   │       ├── brand.js
│   │       ├── category.js
│   │       ├── document.js
│   │       ├── firm.js
│   │       ├── index.js
│   │       ├── product.js
│   │       ├── purchase.js
│   │       ├── sale.js
│   │       ├── token.js
│   │       └── user.js
│   ├── logs/                 # Application logs
│   ├── upload/               # Uploaded files
│   ├── .env                  # Environment variables
│   ├── .gitignore
│   ├── index.js              # Entry point
│   └── package.json
│
├── README.md                 # This file
├── SETUP.md                  # Detailed setup guide
└── QUICK_START.md           # Quick start guide
```

## 👥 User Roles & Permissions

### Regular User

- View all data (products, sales, purchases, etc.)
- Cannot create, update, or delete

### Staff

- All User permissions
- Create and update: brands, categories, firms, products, purchases, sales
- Cannot delete resources

### Admin

- All Staff permissions
- Delete any resource
- Manage users
- Full system access

### Permission Matrix

| Action           | User | Staff | Admin |
| ---------------- | ---- | ----- | ----- |
| View Data        | ✅   | ✅    | ✅    |
| Create Resources | ❌   | ✅    | ✅    |
| Update Resources | ❌   | ✅    | ✅    |
| Delete Resources | ❌   | ❌    | ✅    |
| Manage Users     | ❌   | ❌    | ✅    |

## 🗄 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  password: String (encrypted, required),
  email: String (unique, required),
  firstName: String (required),
  lastName: String (required),
  isActive: Boolean (default: true),
  isStaff: Boolean (default: false),
  isAdmin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection

```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Brands Collection

```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Firms Collection

```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  phone: String,
  address: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection

```javascript
{
  _id: ObjectId,
  categoryId: ObjectId (ref: Category, required),
  brandId: ObjectId (ref: Brand, required),
  name: String (required),
  quantity: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Purchases Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  firmId: ObjectId (ref: Firm, required),
  brandId: ObjectId (ref: Brand, required),
  productId: ObjectId (ref: Product, required),
  quantity: Number (required),
  price: Number (required),
  amount: Number (required, auto-calculated),
  createdAt: Date,
  updatedAt: Date
}
```

### Sales Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  brandId: ObjectId (ref: Brand, required),
  productId: ObjectId (ref: Product, required),
  quantity: Number (required),
  price: Number (required),
  amount: Number (required, auto-calculated),
  createdAt: Date,
  updatedAt: Date
}
```

### Tokens Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  token: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Problem:** `DB Not Connected`

**Solutions:**

```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list             # macOS

# Start MongoDB
sudo systemctl start mongod    # Linux
brew services start mongodb-community  # macOS

# Check port availability
netstat -an | grep 27017

# Verify connection string in .env
MONGODB=mongodb://127.0.0.1:27017/stockManagement
```

### CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**

- Ensure backend is running on port 8000
- Check `client/.env` has correct `REACT_APP_BASE_URL`
- CORS is already configured in `server/index.js`

### Port Already in Use

**Backend (8000):**

```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
```

**Frontend (3000):**
React will automatically suggest port 3001 if 3000 is busy.

### Authentication Issues

**Problem:** "NoPermission: You must login"

**Solutions:**

- Clear browser cache and cookies
- Check if token is stored (DevTools > Application > Session Storage)
- Re-login to get fresh token
- Verify user `isActive: true` in database

### Dashboard Shows $NaN

**Problem:** KPI cards show NaN values

**Solution:**
This was fixed in the latest version. If you still see it:

```bash
# Restart backend server to run migration
cd server
npm start
```

### Missing Categories in Product Form

**Problem:** Category dropdown is empty

**Solution:**
Categories are auto-seeded on first run. If missing:

```bash
# Restart backend to trigger seed
cd server
npm start
```

### Dependencies Issues

**Problem:** Module not found errors

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ES6+ syntax
- Follow existing code style
- Add comments for complex logic
- Write meaningful commit messages
- Test before submitting PR

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Material-UI for the component library
- Tremor React for data visualization
- MongoDB for the database
- Express.js community
- React community
- Clarusway

## 📞 Support

For issues and questions:

- Check the [Troubleshooting](#troubleshooting) section
- Review API documentation at `/documents/swagger`
- Check existing issues in the repository

## 🔄 Version History

- **1.0.0** (Current)
  - Initial release
  - Full CRUD operations for all resources
  - Dashboard with analytics
  - Role-based access control
  - Automatic stock management
  - Category management
  - Data migration support

## 🚀 Future Enhancements

- [ ] Export data to Excel/PDF
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Multi-currency support
- [ ] Barcode scanning
- [ ] Mobile app
- [ ] Real-time notifications
- [ ] Inventory alerts (low stock)
- [ ] Multi-warehouse support
- [ ] Advanced analytics

---

**Happy Coding! 🎉**
