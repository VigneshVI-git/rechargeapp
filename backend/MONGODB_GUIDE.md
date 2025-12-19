# MongoDB Setup and Data Viewing Guide

## 🔗 MongoDB Connection Details

- **Database URI**: `mongodb://localhost:27017/mra_database`
- **Database Name**: `mra_database`
- **Collections**: `admins`, `users`, `plans`, `recharges`

## 📱 Viewing Data in MongoDB Compass

### 1. Install MongoDB Compass
- Download from: https://www.mongodb.com/products/compass
- Install and open MongoDB Compass

### 2. Connect to Database
- Open MongoDB Compass
- Enter connection string: `mongodb://localhost:27017/mra_database`
- Click "Connect"

### 3. View Collections
Once connected, you'll see 4 collections:

#### 👨💼 Admins Collection
- Contains admin user details
- Fields: name, email, role, status, permissions, lastLogin
- Sample data includes Super Admin and Manager roles

#### 👥 Users Collection  
- Contains registered user details
- Fields: name, email, mobileNumber, status
- Shows all users who have registered

#### 📋 Plans Collection
- Contains recharge plans
- Fields: planName, amount, validity, benefits, status
- Shows all available recharge plans

#### 💳 Recharges Collection
- Contains all recharge transactions
- Fields: userId, mobileNumber, planId, paymentMode, status, rechargeDate
- Shows complete recharge history with user and plan references

## 🚀 API Endpoints for Data Access

### Admin Endpoints
- `GET /api/admin/system/data` - Get all system data
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/admins` - Get all admins

### User Endpoints
- `GET /api/user/sample` - Get sample user data
- `GET /api/user/plans` - Get available plans

### Recharge Endpoints
- `GET /api/recharges` - Get all recharges
- `GET /api/recharges/stats` - Get recharge statistics

## 🧪 Testing Scripts

### Run Sample Data Seeder
```bash
cd backend
node seed-data.js
```

### Test MongoDB Connection
```bash
cd backend  
node test-mongodb.js
```

## 📊 Data Flow

1. **User Registration** → Stored in `users` collection
2. **Admin Registration** → Stored in `admins` collection  
3. **Plan Creation** → Stored in `plans` collection
4. **Recharge Transaction** → Stored in `recharges` collection with references to user and plan

## 🔍 Sample Queries in MongoDB Compass

### Find all successful recharges
```javascript
{ "status": "Success" }
```

### Find active users
```javascript
{ "status": "Active" }
```

### Find plans by amount range
```javascript
{ "amount": { "$gte": 200, "$lte": 500 } }
```

### Find recent recharges (last 7 days)
```javascript
{ "rechargeDate": { "$gte": new Date(Date.now() - 7*24*60*60*1000) } }
```

## ✅ Verification Checklist

- [ ] MongoDB is running on localhost:27017
- [ ] Database `mra_database` exists
- [ ] All 4 collections are created
- [ ] Sample data is populated
- [ ] API endpoints are working
- [ ] Data is visible in MongoDB Compass

Your Mobile Recharge Application is now fully integrated with MongoDB! 🎉