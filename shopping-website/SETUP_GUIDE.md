Setup and Testing Guide

Quick Start Instructions

1. Database Seeding (IMPORTANT - DO THIS FIRST!)

Run this command to populate the database with example products and create admin/user accounts:

```bash
npm run seed
```

This will create:
- Admin Account: admin@shop.com / admin123
- Test User Account: user@shop.com / user123
- 12 Sample Products across different categories

2. Start the Application

Option A: Run Both Frontend and Backend Together
```bash
npm run dev
```

Option B: Run Separately
Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run client
```

3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

Testing the Features

A. Admin Login and Dashboard

1. Go to http://localhost:3000/login
2. Login with:
   - Email: admin@shop.com
   - Password: admin123
3. You should be redirected to the homepage
4. Navigate to /admin to access the admin dashboard
5. Test admin features:
   - View analytics
   - Manage products (Add, Edit, Delete)
   - View all orders
   - Manage users

B. User Shopping Flow

1. Browse Products
   - Go to homepage
   - View the 12 sample products
   - Click on any product for details

2. Add to Cart
   - Click "Add to Cart" on product pages
   - Cart icon in navbar should update
   - Go to cart page to view items

3. Cart Management
   - View cart at /cart
   - Increase/decrease quantity using +/- buttons
   - Remove items using "Remove" button
   - See real-time total updates
   - Click "Proceed to Checkout"

4. Checkout Process
   - Fill in shipping address:
     - Street Address
     - City
     - Postal Code
     - Country
   
   - Choose Payment Method:
     - Option 1: PayPal (requires PayPal sandbox account)
     - Option 2: Credit/Debit Card (test mode)
   
5. Credit Card Payment
   - Select "Credit/Debit Card" option
   - Fill in card details:
     - Card Number: Enter 16 digits (e.g., 4532 1234 5678 9010)
     - Cardholder Name: Your name
     - Expiry Date: Future date (MM/YY)
     - CVV: 3-4 digits (e.g., 123)
   - Click "Pay $XX.XX" button
   - Order will be created and marked as paid

6. PayPal Payment
   - Select "PayPal" option
   - Click the PayPal button
   - Login with PayPal sandbox credentials
   - Approve the payment
   - Order will be created and marked as paid

7. View Orders
   - After payment, you'll be redirected to order details
   - Go to /orders to view all your orders
   - Click on any order to see details

C. User Registration

1. Go to /register
2. Create a new account:
   - Name
   - Email
   - Password (min 6 characters)
3. Login with new credentials
4. Test shopping flow

Sample Products Categories

The seed data includes products from:
- Electronics (Headphones, Smart Watch, Gaming Mouse, Power Bank)
- Clothing (Organic Cotton T-Shirt, Running Shoes)
- Books (JavaScript Guide)
- Sports (Yoga Mat, Water Bottle, Running Shoes)
- Home and Garden (Succulent Plants, Coffee Mug Set)
- Other (Leather Laptop Bag)

Cart Management Features

- Add products to cart
- Update quantity (increase/decrease)
- Remove items from cart
- View cart total
- Cart persists in localStorage
- Empty cart notification
- Proceed to checkout

Payment Confirmation Features

- Two payment methods: PayPal and Credit Card
- Form validation for all fields
- Card number formatting (automatic spaces)
- Expiry date validation
- CVV validation
- Card expiration check
- Shipping address validation
- Order creation with payment details
- Redirect to order confirmation

Admin Features

- Admin dashboard with analytics
- Product management (CRUD operations)
- Order management
- User management
- Protected admin routes

Troubleshooting

Admin Can't Login?
- Make sure you ran npm run seed first
- Check MongoDB is running
- Verify .env file has correct MONGODB_URI
- Try credentials: admin@shop.com / admin123

Products Not Showing?
- Run npm run seed to populate database
- Check MongoDB connection
- Check browser console for errors

Payment Not Working?
- For PayPal: Ensure PAYPAL_CLIENT_ID is set in .env
- For Credit Card: It's in test mode, no real payment processed
- Check shipping address is filled
- Check browser console for errors

Cart Not Working?
- Clear browser localStorage
- Check browser console for errors
- Refresh the page

Environment Variables Checklist

Make sure your .env file has:
- MONGODB_URI (e.g., mongodb://localhost:27017/shopping-website)
- JWT_SECRET (any random string)
- PAYPAL_CLIENT_ID (optional, for PayPal payments)
- CLIENT_URL (http://localhost:3000)

API Endpoints

Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- PUT /api/auth/profile

Products
- GET /api/products
- GET /api/products/:id
- POST /api/products (Admin)
- PUT /api/products/:id (Admin)
- DELETE /api/products/:id (Admin)

Orders
- POST /api/orders
- GET /api/orders/myorders
- GET /api/orders/:id
- PUT /api/orders/:id/pay
- GET /api/orders (Admin)

Admin
- GET /api/admin/analytics
- GET /api/admin/users

Notes

- All passwords are hashed using bcryptjs
- JWT tokens expire after 30 days
- Cart data is stored in browser localStorage
- Orders are saved in MongoDB
- Credit card payment is in test mode (no real processing)
- PayPal requires sandbox account for testing
