# E-Commerce Web App

## Project Overview

The **E-Commerce Web App** is a modern shopping platform built with React and TypeScript. It leverages Redux Toolkit for state management and Firebase Firestore for product and order data. Users can browse products, manage their shopping cart, and complete a simulated checkout process. Authentication is handled through Firebase Authentication.

## Project Structure
```
/src
├── api/                  # API utility functions
│   └── api.ts
├── components/           # Reusable UI components
│   ├── NavBar/
│   │   ├── NavBar.tsx
│   │   └── NavBar.css
│   └── ProductCard/
│       ├── ProductCard.tsx
│       └── ProductCard.css
├── context/              # React context for auth
│   └── AuthContext.tsx
├── lib/                  # External libraries / Firebase setup
│   └── firebase/
│       └── firebase.ts
├── pages/                # App pages
│   ├── Cart/
│   │   ├── Cart.tsx
│   │   └── Cart.css
│   ├── Home/
│   │   ├── Home.tsx
│   │   └── Home.css
│   ├── Login/
│   │   ├── Login.tsx
│   │   └── Login.css
│   └── Profile/
│       ├── Profile.tsx
│       └── Profile.css
├── redux/                # Redux for product and cart state management
|   ├── store.ts
|   ├── cartSlice.ts
|   ├── productSlice.ts
|   ├── hooks.ts
├── tests/                # Test folder
|   ├── __mocks__
|   ├── __snapshots__
|   ├── Cart.test.tsx
|   ├── Login.test.tsx
|   └── Profile.test.tsx
├── App.tsx               # Main application component
├── App.css               # Global styles
├── index.css             # Base styles
├── main.tsx              # Application entry point
```

## Features

- **User Authentication:** Secure login and registration via Firebase Authentication.

- **Product Management:** Product data is fetched and rendered from Firebase Firestore.

- **Shopping Cart:** Users can add, update, and remove items with session storage persistence.

- **Order Management:** Orders are saved to Firestore upon checkout.

- **Category Filtering:** Filter products by category.

- **Checkout Simulation:** Simulated checkout clears cart and stores order in Firestore.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)

- **npm** (or yarn)

- **Vite** (optional if using npm create vite@latest)

### 1. Clone the Repository
```sh
git clone <repository-url>
cd e-commerce-app
```

### 2. Install Dependencies
```bash
npm install
npm install react-router-dom
npm install @auth0/auth0-react
```

### 3. Start the Development Server
```
npm run dev
```

Your app will be accessible at http://localhost:5173/.

## Usage

### 1. Register / Login

Create an account or sign in on the login page using Firebase Authentication.

### 2. Browse Products

Explore the homepage to view available products, filter by category, and add items to your cart.

### 3. Manage Cart

Add Items: Click "Add to Cart."

Modify Quantity: Adjust quantity on the cart page.

Remove Items: Click the remove icon to delete items.

### 4. Checkout Simulation

Click "Checkout" to simulate placing an order. This clears your cart and stores the order in Firestore.

### 5. View Order History

Go to your profile page to view past orders saved in Firestore.

## Built With

React + TypeScript – Modern frontend framework

Redux Toolkit – Scalable state management

Firebase Firestore – Real-time database

Firebase Authentication – Secure user login

## Future Improvements

🔹 Expand user profile management and order history
🔹 Add advanced product search and filtering options

## License

This project is licensed under the MIT License.

## Author

Developed by Evan S. Jones
