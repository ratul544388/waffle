# 🧇 Waffle & Muscle Juice Bar – Local Food Ordering Web App

**Waffle & Muscle Juice Bar** is a real-time local food ordering web application built for a client to showcase and sell a variety of delicious waffle dishes and muscle-friendly juice items. Customers can easily browse categorized menus and place orders, which are instantly received by the food cart owner for efficient preparation.

🔗 [Live Website](https://waffle-two.vercel.app)  
📁 [GitHub Repository](https://github.com/ratul544388/waffle)

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: App Router
- **Animation**: Framer Motion
- **Components**: ShadCN UI
- **Authentication**: Clerk
- **Form Handling**: React Hook Form + Zod

### 🔹 Backend
- **Database**: MongoDB
- **ORM**: Prisma
- **API Routes**: RESTful API with Next.js App Router
- **Image Upload**: Cloudinary

---

## ✨ Features

- 🍽️ Dynamic menu with category-based filtering
- 🛒 Smooth ordering experience with cart functionality
- ✅ Authentication with Clerk (Sign in/Sign up)
- 📦 Real-time order management for vendors
- 🌐 Responsive and mobile-friendly UI
- 🧾 Admin order tracking interface
- 🔒 Secure checkout flow with validation

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ratul544388/waffle
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the necessary environment variables:

```
DATABASE_URL=mongodb_database_url
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### 4. Push Prisma schema & start the app

```bash
npx prisma db push
npm run dev
```

---

## 📌 License

This project is for a local client and not licensed for redistribution.

```
```
