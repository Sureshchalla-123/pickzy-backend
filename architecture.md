# MERN E-Commerce App: Models & APIs

## 1. Models

### 1.1 User Model

```javascript
// /models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // admin/user
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
```

### 1.2 Product Model

```javascript
// /models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
```

### 1.3 Order Model

```javascript
// /models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
```

### 1.4 Cart Model (optional)

```javascript
// /models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", cartSchema);
```

## 2. APIs

### 2.1 User APIs

- `POST /api/users/register` → Register new user
- `POST /api/users/login` → Login user & get JWT
- `GET /api/users/me` → Get logged-in user info
- `PUT /api/users/me` → Update user profile
- `GET /api/users` → (Admin) Get all users

### 2.2 Product APIs

- `GET /api/products` → List all products (with search, filter, pagination)
- `GET /api/products/:id` → Get single product details
- `POST /api/products` → (Admin) Create a product
- `PUT /api/products/:id` → (Admin) Update product
- `DELETE /api/products/:id` → (Admin) Delete product

### 2.3 Order APIs

- `POST /api/orders` → Place new order
- `GET /api/orders` → (Admin) Get all orders
- `GET /api/orders/me` → Get logged-in user’s orders
- `PUT /api/orders/:id` → (Admin) Update order status

### 2.4 Cart APIs (optional)

- `GET /api/cart` → Get user’s cart
- `POST /api/cart` → Add product to cart
- `PUT /api/cart` → Update product quantity in cart
- `DELETE /api/cart/:productId` → Remove product from cart

## 💡 Tips

- Use JWT authentication for user-specific APIs.
- Use middleware for role-based access (admin vs user).
- Use query params for filtering, sorting, pagination (especially for products).
