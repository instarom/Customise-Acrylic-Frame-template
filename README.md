# 🎨 TuragStudio - Custom Photo Frames & Home Decor Platform

A complete full-stack e-commerce platform for custom photo frames, acrylic frames, gift showpieces, and home decor products with digital and physical product support.

## 🚀 Features

### User Features
- **Authentication**: Sign up, Login, Password recovery
- **Product Catalog**: Browse digital and physical products
- **Image Customization**: Upload images, real-time preview
- **Shopping Cart**: Add/remove items, manage cart
- **Checkout**: Secure payment with Razorpay
- **Order Tracking**: Real-time order status updates
- **User Dashboard**: Profile management, order history
- **Search & Filter**: Find products by category, price, material
- **Reviews & Ratings**: Leave product reviews

### Admin Features
- **Product Management**: Add, edit, delete products
- **Order Management**: Manage orders, update status, tracking
- **Inventory**: Stock management
- **Analytics**: Sales reports and statistics

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Redux for state management
- Axios for API calls
- Tailwind CSS for styling
- Canvas API for image preview

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Multer for file uploads
- Razorpay for payments

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay account
- Hostinger shared hosting (with Node.js support)

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/instarom/Customise-Acrylic-Frame-template.git
cd Customise-Acrylic-Frame-template
```

### 2. Install dependencies
```bash
npm run install-all
```

### 3. Setup environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4. Run the application

**Development mode:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── server/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
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
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Security

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Environment variables for sensitive data
- ✅ CORS protection
- ✅ Input validation with express-validator
- ✅ Razorpay signature verification

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with search/filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/review` - Add review

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order (Admin)
- `GET /api/orders/admin/all` - Get all orders (Admin)

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/order/:orderId` - Get payment details

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password

### Uploads
- `POST /api/uploads/image` - Upload image
- `GET /api/uploads/:filename` - Get image

## 🚀 Deployment on Hostinger

1. Push code to GitHub
2. Connect Hostinger with GitHub
3. Set environment variables in Hostinger panel
4. Deploy with Node.js support

## 📝 License

ISC License - TuragStudio

## 🤝 Support

For issues and questions, please create an issue on GitHub.

---

**Made with ❤️ by TuragStudio**
