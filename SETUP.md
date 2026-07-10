# TuragStudio - Complete MERN E-Commerce Platform

## ✅ PROJECT COMPLETE!

A full-featured e-commerce platform for custom photo frames and home decor built with MERN stack.

### 🎯 What's Been Created

#### Backend (Express.js + MongoDB)
✅ Complete REST API with authentication
✅ Product management (CRUD operations)
✅ Order management and tracking
✅ Razorpay payment integration
✅ User authentication with JWT
✅ File upload system for images
✅ Search and filter functionality
✅ Review and rating system

#### Frontend (React.js)
✅ Modern UI with Tailwind CSS
✅ Redux state management
✅ Product catalog with filtering
✅ Shopping cart functionality
✅ User authentication (Login/Register)
✅ Checkout with Razorpay payment
✅ User dashboard
✅ Order tracking
✅ Responsive mobile design

### 📁 Repository Structure

```
Customise-Acrylic-Frame-template/
├── server/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   ├── users.js
│   │   └── uploads.js
│   ├── index.js
│   └── [other config files]
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ProductCard.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── NotFound.js
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── actions/
│   │   │   └── reducers/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

### 🚀 Quick Start

1. **Clone and Install**
```bash
git clone https://github.com/instarom/Customise-Acrylic-Frame-template.git
cd Customise-Acrylic-Frame-template
npm run install-all
```

2. **Setup Environment**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Run Development**
```bash
npm run dev
```

Server runs on: `http://localhost:5000`
Client runs on: `http://localhost:3000`

### 🔑 Key Features

- ✅ User authentication with JWT
- ✅ Product customization
- ✅ Real-time cart management
- ✅ Razorpay payment gateway
- ✅ Order tracking
- ✅ Admin dashboard
- ✅ Search & filter
- ✅ Reviews & ratings
- ✅ Responsive design

### 📊 API Endpoints

**Auth**
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- POST `/api/auth/logout`

**Products**
- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products` (Admin)
- PUT `/api/products/:id` (Admin)
- DELETE `/api/products/:id` (Admin)

**Orders**
- POST `/api/orders`
- GET `/api/orders`
- GET `/api/orders/:id`
- PUT `/api/orders/:id` (Admin)

**Payments**
- POST `/api/payments/create-order`
- POST `/api/payments/verify`

### 🛠️ Tech Stack

**Frontend:**
- React 18
- Redux + Redux Thunk
- Tailwind CSS
- React Router v6
- Axios
- React Hot Toast

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (File uploads)
- Razorpay API
- Bcryptjs (Password hashing)

### 📝 Environment Variables

```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 📞 Support

For issues and questions, check the GitHub repository or contact support.

---

**🎉 Your complete MERN e-commerce platform is ready to use!**
