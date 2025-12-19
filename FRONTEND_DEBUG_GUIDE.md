# 🐛 Frontend Debug Guide

## ✅ Backend Status: WORKING
- Admin registration: ✅ Working
- User registration: ✅ Working  
- Plan management: ✅ Working
- Database storage: ✅ Working

## 🔍 Current Database Status:
- **Admins**: 1 (Test Admin)
- **Users**: 2 (including Vishal)
- **Plans**: 1 (Test Plan API)
- **Recharges**: 0

## 🚨 Frontend Issues to Check:

### 1. **Check Browser Console**
Open browser dev tools (F12) and check for:
- Network errors (failed API calls)
- CORS errors
- JavaScript errors
- Failed fetch requests

### 2. **Verify Server is Running**
Make sure backend is running on port 5000:
```bash
cd "e:\MRA MAIN\backend"
npm start
```
Should show: "Server running on port 5000"

### 3. **Test Admin Registration in Frontend**
1. Go to: http://localhost:5173/admin/login
2. Click "Register here"
3. Enter: admin2@test.com / admin123
4. Check browser console for errors
5. Check if API call is made to: `POST http://localhost:5000/api/admin/register`

### 4. **Test Plan Addition in Frontend**
1. Login to admin dashboard
2. Go to Plans tab
3. Add a new plan
4. Check browser console for API call to: `POST http://localhost:5000/api/admin/plans`

### 5. **Test User Registration in Frontend**
1. Go to: http://localhost:5173/login
2. Click "Register here"  
3. Enter user details
4. Check browser console for API call to: `POST http://localhost:5000/api/user/register`

### 6. **Test Recharge in Frontend**
1. Login as user
2. Go to recharge page
3. Select plan and complete payment
4. Check browser console for API call to: `POST http://localhost:5000/api/user/recharge`

## 🔧 Common Issues & Fixes:

### **Issue 1: CORS Error**
If you see CORS errors in console:
- Backend has CORS enabled, should work
- Try restarting backend server

### **Issue 2: Network Error**
If API calls fail:
- Check backend is running on port 5000
- Check frontend is making calls to correct URL
- Verify no firewall blocking

### **Issue 3: 404 Errors**
If getting 404 on API calls:
- Check API endpoints match backend routes
- Verify request URLs are correct

### **Issue 4: Data Not Saving**
If frontend seems to work but data not in DB:
- Check browser console for API response
- Verify API calls are actually being made
- Check backend console for request logs

## 🧪 Manual Testing Steps:

### **Test 1: Admin Flow**
```bash
# 1. Open browser to admin login
http://localhost:5173/admin/login

# 2. Register new admin
Email: newadmin@test.com
Password: admin123

# 3. Check browser console - should see:
POST http://localhost:5000/api/admin/register

# 4. Login with same credentials
# 5. Go to Plans tab and add plan
# 6. Check console for:
POST http://localhost:5000/api/admin/plans
```

### **Test 2: User Flow**
```bash
# 1. Open browser to user login
http://localhost:5173/login

# 2. Register new user
Name: Test User 2
Mobile: 8888888888
Email: user2@test.com
Password: user123

# 3. Check console for:
POST http://localhost:5000/api/user/register
```

### **Test 3: Recharge Flow**
```bash
# 1. Login as user
# 2. Go to recharge page
# 3. Select operator and plan
# 4. Complete payment
# 5. Check console for:
POST http://localhost:5000/api/user/recharge
```

## 📊 Expected API Calls:

### **Admin Registration:**
```
POST http://localhost:5000/api/admin/register
Body: { name, email, password }
Response: { message, adminId, admin }
```

### **Plan Addition:**
```
POST http://localhost:5000/api/admin/plans  
Body: { planName, amount, validity, benefits }
Response: { message, plan }
```

### **User Registration:**
```
POST http://localhost:5000/api/user/register
Body: { name, mobileNumber, email, password }
Response: { message, userId }
```

### **Recharge:**
```
POST http://localhost:5000/api/user/recharge
Body: { userId, mobileNumber, planId, paymentMode }
Response: { message, recharge }
```

## 🎯 Next Steps:

1. **Start both servers**:
   - Backend: `cd backend && npm start`
   - Frontend: `cd "MRA Frontend" && npm run dev`

2. **Open browser dev tools** (F12)

3. **Test each flow** and watch console for:
   - API calls being made
   - Successful responses
   - Any errors

4. **If API calls are not being made**:
   - Check frontend code for fetch/axios calls
   - Verify button click handlers are working

5. **If API calls fail**:
   - Check backend server is running
   - Verify correct URLs and ports

The backend is working perfectly - the issue is likely in the frontend not making the API calls or handling responses correctly. Check the browser console for clues! 🕵️‍♂️