# Wanderlust
# 🌍 WanderLust – Airbnb-Inspired Vacation Rental Platform

WanderLust is a full-stack vacation rental web application inspired by Airbnb. It enables users to discover unique stays, securely authenticate, create and manage property listings, upload images, leave reviews, and explore property locations through an interactive map.

Designed with a responsive, mobile-first interface and built using the MVC architecture, the application focuses on delivering an intuitive user experience while maintaining a scalable backend.

## 🚀 Live Demo

🌐 **Website:** https://wanderlust-rd1w.onrender.com/

> **Note:** The application is deployed on Render's free tier. The initial request may take 30–60 seconds if the server has been inactive. 

---

# ✨ Features

## 👤 User Authentication

- Secure user registration and login
- Session-based authentication using Passport.js
- Password hashing and secure credential storage
- Login persistence across sessions
- Logout functionality

---

## 🏡 Property Listings

- Browse all available listings
- Create new property listings
- Edit existing listings
- Delete owned listings
- View complete property details
- Responsive property cards

---

## 📸 Image Uploads

- Upload listing images
- Cloudinary integration for cloud image storage
- Automatic image optimization
- Secure image handling

---

## ⭐ Reviews & Ratings

- Leave ratings and reviews
- Delete only your own reviews
- Dynamic review display
- Authentication-protected review system

---

## 🗺️ Interactive Maps

- Mapbox integration
- Automatic location geocoding
- Interactive property markers
- Popup displaying listing location
- Graceful fallback when Mapbox token is unavailable

---

## 🎨 Responsive User Interface

- Mobile-first responsive design
- Bootstrap 5 components
- Responsive navigation bar
- Dynamic property filters
- Flash messages
- Form validation
- Clean and intuitive user experience

---

## 🔒 Authorization

Users can only:

- Edit their own listings
- Delete their own listings
- Delete their own reviews
- Access protected routes after logging in

---

# 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Bootstrap 5
- EJS
- Font Awesome

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- Passport.js
- Passport Local
- Express Session
- Connect-Mongo

### Cloud Services

- Cloudinary
- Mapbox Geocoding API

### Other Libraries

- Joi
- Multer
- Multer Storage Cloudinary
- Connect Flash
- Method Override
- Dotenv

---

# 📁 Project Structure

```
WanderLust/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── public/
│   ├── css/
│   ├── js/
│
├── views/
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   ├── users/
│
├── app.js
├── package.json
└── README.md
```

---

# 📌 Core Functionality

- User Authentication
- CRUD Operations
- Image Uploads
- Property Reviews
- Session Management
- Flash Messages
- Responsive Design
- Interactive Maps
- Authorization Middleware
- Form Validation

---

# 🧩 Architecture

The project follows the **MVC (Model–View–Controller)** architecture.

- **Models** handle MongoDB schemas and database interactions.
- **Views** are rendered using EJS templates.
- **Controllers** manage application logic.
- **Routes** define endpoints and middleware.
- **Middleware** handles authentication, authorization, validation, and error handling.

---

# 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
ATLASDB_URL=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token

SECRET=your_session_secret
```

---

# 💻 Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd WanderLust
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add the required environment variables.

Run the application

```bash
npm start
```

or

```bash
nodemon app.js
```

Visit

```
http://localhost:8080
```

---

# 📷 Screenshots

> Add screenshots here for:

- Home Page
- Property Details
- Login
- Signup
- Create Listing
- Edit Listing
- Reviews
- Mobile View

---

# 🌟 Highlights

- Airbnb-inspired responsive UI
- Authentication & authorization
- Cloudinary image uploads
- MongoDB Atlas integration
- Interactive Mapbox maps
- Secure session management
- Responsive design across desktop and mobile
- MVC architecture
- RESTful routing
- Flash notifications
- Client-side and server-side validation

---

# 🚀 Future Enhancements

- Search functionality
- Property categories
- Wishlist / Favorites
- Booking system
- Payment integration
- User profiles
- Dark mode
- Advanced filtering
- Pagination
- Email verification

---

# 👩‍💻 Developed By

**Shambhavi Singh**

If you found this project interesting, feel free to ⭐ the repository.

---

## 📄 License

This project is developed for educational and portfolio purposes.
