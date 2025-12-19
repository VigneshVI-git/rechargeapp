# 🗄️ Database Integration Test Guide

## ✅ What's Now Connected to MongoDB

### **1. Admin Registration & Login** → `admins` collection
- **Registration**: `POST /api/admin/register` stores admin details
- **Login**: `POST /api/admin/login` authenticates against database
- **Data Stored**: name, email, password, role, permissions, timestamps

### **2. User Registration & Login** → `users` collection  
- **Registration**: `POST /api/user/register` stores user details
- **Login**: `POST /api/user/login` authenticates against database
- **Data Stored**: name, email, mobileNumber, password, status, timestamps

### **3. Plan Management** → `plans` collection
- **Add Plan**: `POST /api/admin/plans` stores new plans
- **View Plans**: `GET /api/plans` fetches all plans
- **Delete Plan**: `DELETE /api/admin/plans/:id` removes plans
- **Data Stored**: planName, amount, validity, benefits, status, timestamps

### **4. Recharge Transactions** → `recharges` collection
- **Process Recharge**: `POST /api/user/recharge` stores transaction
- **Data Stored**: userId, mobileNumber, planId, paymentMode, status, rechargeDate

## 🧪 Testing Steps

### **Test 1: Admin Flow**
```bash
# 1. Start backend server
cd "e:\MRA MAIN\backend"
npm start

# 2. Start frontend
cd "e:\MRA MAIN\MRA Frontend" 
npm run dev

# 3. Test admin registration
- Go to http://localhost:5173/admin/login
- Click "Register here"
- Enter: admin@test.com / admin123
- Check MongoDB Compass → admins collection

# 4. Test admin login
- Login with same credentials
- Should redirect to dashboard

# 5. Test plan management
- Go to Plans tab in admin dashboard
- Add a new plan: "Test Plan", ₹299, "30 days", "2GB/day"
- Check MongoDB Compass → plans collection
```

### **Test 2: User Flow**
```bash
# 1. Test user registration
- Go to http://localhost:5173/login
- Click "Register here"
- Enter: Test User, 9999999999, user@test.com, user123
- Check MongoDB Compass → users collection

# 2. Test user login
- Login with same credentials
- Should redirect to home page
```

### **Test 3: Recharge Flow**
```bash
# 1. Go to recharge page
- Select operator and enter phone number
- Choose a plan (should show admin-added plans)
- Proceed to payment
- Complete payment
- Check MongoDB Compass → recharges collection
```

## 🔍 MongoDB Compass Verification

### **Connection Details:**
- **URI**: `mongodb://localhost:27017/mra_database`
- **Database**: `mra_database`

### **Expected Collections:**
1. **admins** - Admin registration/login data
2. **users** - User registration/login data  
3. **plans** - Plans added by admin
4. **recharges** - Recharge transactions by users

### **Sample Data Structure:**

#### **admins collection:**
```json
{
  "_id": "ObjectId",
  "name": "admin",
  "email": "admin@test.com", 
  "password": "admin123",
  "role": "Admin",
  "status": "Active",
  "permissions": {
    "canManageUsers": true,
    "canManagePlans": true,
    "canViewReports": true,
    "canManageAdmins": false
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### **users collection:**
```json
{
  "_id": "ObjectId",
  "name": "Test User",
  "mobileNumber": "9999999999",
  "email": "user@test.com",
  "password": "user123", 
  "status": "Active",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### **plans collection:**
```json
{
  "_id": "ObjectId",
  "planName": "Test Plan",
  "amount": 299,
  "validity": "30 days",
  "benefits": "2GB/day",
  "status": "Active",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### **recharges collection:**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref to users)",
  "mobileNumber": "9999999999",
  "planId": "ObjectId (ref to plans)",
  "paymentMode": "UPI",
  "status": "Success",
  "rechargeDate": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## ✅ Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173  
- [ ] MongoDB running locally
- [ ] Admin can register → Data in `admins` collection
- [ ] Admin can login → Authentication works
- [ ] Admin can add plans → Data in `plans` collection
- [ ] User can register → Data in `users` collection
- [ ] User can login → Authentication works
- [ ] User can recharge → Data in `recharges` collection
- [ ] All data visible in MongoDB Compass

## 🚨 Troubleshooting

### **If admin registration fails:**
- Check backend console for errors
- Verify MongoDB is running
- Check network requests in browser dev tools

### **If plans don't appear:**
- Verify admin added plans successfully
- Check API endpoint: `GET http://localhost:5000/api/plans`
- Refresh frontend page

### **If recharge fails:**
- Check user is logged in
- Verify plan ID is valid
- Check backend logs for errors

## 🎯 Success Indicators

✅ **Admin Flow**: Registration → Login → Add Plans → Plans visible in database  
✅ **User Flow**: Registration → Login → View Plans → Complete Recharge  
✅ **Database**: All 4 collections populated with real app data  
✅ **Integration**: Frontend ↔ Backend ↔ MongoDB working seamlessly  

Your app is now fully integrated with MongoDB database! 🎉