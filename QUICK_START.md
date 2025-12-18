# Quick Start Guide

## TL;DR - Get Running in 5 Minutes

### 1. Start MongoDB

```bash
# Linux/Mac
sudo systemctl start mongod

# Or check if it's already running
mongosh
```

### 2. Start Backend

```bash
cd server
npm install
npm start
```

Backend runs at: http://127.0.0.1:8000

### 3. Start Frontend

```bash
# In a new terminal
cd client
npm install
npm start
```

Frontend opens at: http://localhost:3000

### 4. Create Your First User

1. Go to http://localhost:3000/register
2. Fill the form with:

   - Username: admin
   - Email: admin@example.com
   - Password: Admin@123
   - First Name: Admin
   - Last Name: User

3. Make yourself admin (in MongoDB shell):

```javascript
mongosh
use stockManagement
db.users.updateOne(
  { email: "niluse02@gmail.com" },
  { $set: { isAdmin: true, isStaff: true } }
)
```

### 5. Login and Start Using

- Login with your credentials
- You'll see the dashboard
- Start adding firms, brands, products, etc.

## That's It! 🎉

For detailed setup and troubleshooting, see SETUP.md
