Shopping Website - E-Commerce Platform

A full-stack e-commerce web application with user authentication, admin panel, PayPal payment integration, and Google Maps store locator.

Features

User Features
- User registration and authentication with JWT
- Browse products with search and filter functionality
- Shopping cart management
- Secure checkout with PayPal integration
- User dashboard to view orders and manage profile
- Store locator with Google Maps integration
- Responsive design for all devices

Admin Features
- Admin dashboard with analytics
- Product management (Add, Edit, Delete)
- Order management and tracking
- User management
- Sales reports and statistics

Security Features
- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure API endpoints
- Environment variable management

Technology Stack

Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing

Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- CSS3 for styling

External APIs
- PayPal API for payment processing
- Google Maps API for store locator
- SendGrid for email notifications (optional)

Prerequisites

Before running this application, make sure you have:
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- PayPal Developer Account
- Google Maps API Key

Installation Steps

2. Install Dependencies

Install backend dependencies:
```bash
npm install
```

Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

Or install all at once:
```bash
npm run install-all
```

3. Environment Configuration

Create a .env file in the root directory and add:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shopping-website
JWT_SECRET=your_jwt_secret_key_here
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
CLIENT_URL=http://localhost:3000
SENDGRID_API_KEY=your_sendgrid_api_key (optional)
SENDGRID_FROM_EMAIL=your_email@example.com (optional)
```

4. Set Up MongoDB

Option A: Local MongoDB
- Install MongoDB on your system
- Start MongoDB service:
  ```bash
  mongod
  ```

Option B: MongoDB Atlas (Cloud)
- Create a free account at MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string
- Update MONGODB_URI in .env file

5. Get API Keys

PayPal:
1. Go to PayPal Developer (https://developer.paypal.com/)
2. Create a sandbox account
3. Get Client ID and Secret from the app settings
4. Add to .env file

Google Maps:
1. Go to Google Cloud Console (https://console.cloud.google.com/)
2. Create a project and enable Maps JavaScript API
3. Generate API key
4. Add to .env file

6. Create Admin User

Run the application once to create the database, then manually create an admin user in MongoDB:

```javascript
{
  "name": "Admin",
  "email": "admin@shop.com",
  "password": "$2a$10$...", // Use bcrypt to hash "admin123"
  "role": "admin",
  "createdAt": new Date()
}
```

Or use the provided seed script (if implemented).

Running the Application

Development Mode

Run both backend and frontend concurrently:
```bash
npm run dev
```

Or run separately:

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

Production Mode

1. Build the frontend:
```bash
cd client
npm run build
cd ..
```

2. Start the server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

Database Schema

User Schema
- name: String (required)
- email: String (unique, required)
- password: String (hashed, required)
- role: String (enum: ['user', 'admin'], default: 'user')
- address: Object (street, city, postalCode, country)
- createdAt: Date

Product Schema
- name: String (required)
- description: String (required)
- price: Number (required)
- category: String (required)
- image: String (URL)
- stock: Number (default: 0)
- rating: Number (default: 0)
- numReviews: Number (default: 0)
- createdAt: Date

Order Schema
- user: ObjectId (ref: 'User')
- orderItems: Array of Objects (product, quantity, price)
- shippingAddress: Object
- paymentMethod: String
- paymentResult: Object (PayPal transaction details)
- totalPrice: Number
- isPaid: Boolean (default: false)
- paidAt: Date
- isDelivered: Boolean (default: false)
- deliveredAt: Date
- createdAt: Date

API Endpoints

Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (Protected)
- PUT /api/auth/profile - Update user profile (Protected)

Products
- GET /api/products - Get all products (with search and filter)
- GET /api/products/:id - Get single product
- POST /api/products - Create product (Admin only)
- PUT /api/products/:id - Update product (Admin only)
- DELETE /api/products/:id - Delete product (Admin only)

Orders
- POST /api/orders - Create new order (Protected)
- GET /api/orders/myorders - Get user orders (Protected)
- GET /api/orders/:id - Get order by ID (Protected)
- PUT /api/orders/:id/pay - Update order to paid (Protected)
- GET /api/orders - Get all orders (Admin only)

Admin
- GET /api/admin/analytics - Get sales analytics (Admin only)
- GET /api/admin/users - Get all users (Admin only)

Deployment

Heroku Deployment

1. Create Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
```

3. Deploy:
```bash
git push heroku main
```

Vercel/Netlify (Frontend)

1. Build the client:
```bash
cd client
npm run build
```

2. Deploy the client/build directory to Vercel or Netlify

Testing

Default Admin Credentials (for testing)
- Email: admin@shop.com
- Password: admin123

Test PayPal Credentials (Sandbox)
- Email: Use PayPal sandbox test account
- Password: PayPal test account password

Project Structure

```
shopping-website/
├── client/                 (React frontend)
│   ├── public/
│   ├── src/
│   │   ├── components/    (React components)
│   │   ├── context/       (Context API)
│   │   ├── pages/         (Page components)
│   │   ├── utils/         (Utility functions)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                (Express backend)
│   ├── config/           (Configuration files)
│   ├── controllers/      (Route controllers)
│   ├── middleware/       (Custom middleware)
│   ├── models/          (Mongoose models)
│   ├── routes/          (API routes)
│   └── server.js        (Entry point)
├── .env.example         (Environment variables template)
├── .gitignore
├── package.json
└── README.md
```

Troubleshooting

MongoDB Connection Issues
- Ensure MongoDB is running
- Check MongoDB URI in .env
- For Atlas, whitelist your IP address

PayPal Integration Issues
- Verify Client ID and Secret
- Ensure PayPal mode is set to 'sandbox' for testing
- Check PayPal dashboard for transaction logs

CORS Issues
- Verify CLIENT_URL in .env matches frontend URL
- Check CORS configuration in server.js

Contributing

This is an academic project. Please do not make any updates to the repository after the submission deadline.

License

This project is created for educational purposes as part of M607 Computer Science Application Lab course.

Contact

For any questions or issues, please contact through the course platform.

Note: This application is designed for educational purposes and demonstrates full-stack development capabilities including authentication, database management, API integration, and responsive design.
