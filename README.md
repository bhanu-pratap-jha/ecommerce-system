Here's a comprehensive documentation for your project based on the provided code and context:

---

# E-commerce Cart and Orders Management System

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Setup Instructions](#setup-instructions)
4. [API Documentation](#api-documentation)
5. [How It Works](#how-it-works)

---

## Overview

This system consists of two main functionalities:
- **Cart Management**: Users can view their cart, modify the quantity of items, remove items, and purchase items.
- **Order Management**: Users can view a list of their past orders.

The system uses a **ReactJS** frontend with **NextJS** pages for cart and order management. The backend is designed to handle requests via RESTful APIs to manage cart operations, such as adding, removing, or modifying cart items. Orders are added when the user clicks on the 'Buy' button in the cart.

---

## System Architecture

This system follows a **microservice architecture** where different services handle cart and order-related operations. The frontend is built using **ReactJS** and **NextJS**, while the backend is assumed to be a **NodeJS** (Express-based) service that handles API requests.

1. **Frontend**: 
   - Built using **ReactJS** with NextJS to enable server-side rendering.
   - Handles user interactions and displays cart and order data.

2. **Backend**:
   - **API endpoints**: Manages cart operations, such as adding/removing items, updating quantities, and creating orders.
   - **Database**: Although the current implementation doesn't specify a database, it would typically use a **PostgreSQL** or **MongoDB** database to store cart and order data.

3. **Communication**: The system communicates between the cart and order pages via API calls. Whenever a user buys an item, the order details are added to the orders list.

---

## Setup Instructions

To set up and run this system locally, follow these steps:

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **ReactJS** and **NextJS**

### Steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies**:
   Install all required npm packages using the following command:
   ```bash
   npm install
   ```

3. **Running the Development Server**:
   Start the NextJS development server:
   ```bash
   npm run dev
   ```

4. **Accessing the Application**:
   Once the server is running, you can open the app in your browser:
   - **Cart Page**: [http://localhost:3000/cart](http://localhost:3000/cart)
   - **Orders Page**: [http://localhost:3000/orders](http://localhost:3000/orders)

### Running in Production Mode:
For production, use the following:
```bash
npm run build
npm start
```

---

## API Documentation

The backend exposes RESTful APIs to handle cart and order operations. Below is the documentation for each endpoint:

### 1. Cart Endpoints

#### **GET** `/api/cart`
- **Description**: Fetches the list of items in the cart.
- **Response**: Returns a JSON array of cart items.
  ```json
  [
    {
      "id": "1",
      "name": "Wireless Earbuds",
      "price": 1999,
      "quantity": 1
    },
    {
      "id": "2",
      "name": "Smartphone Screen Protector",
      "price": 500,
      "quantity": 1
    }
  ]
  ```

#### **DELETE** `/api/cart/:id`
- **Description**: Removes an item from the cart by ID.
- **Parameters**: 
  - `id`: The ID of the item to be removed.
- **Response**: 
  - `200 OK`: Item removed successfully.
  - `400 Bad Request`: Error in removing the item.

#### **PATCH** `/api/cart/:id`
- **Description**: Updates the quantity of a cart item.
- **Parameters**:
  - `id`: The ID of the cart item.
- **Request Body**: 
  ```json
  {
    "quantity": 1
  }
  ```
- **Response**: 
  - `200 OK`: Quantity updated successfully.
  - `400 Bad Request`: Error in updating quantity.

### 2. Orders Endpoints

#### **GET** `/api/orders`
- **Description**: Fetches a list of all orders.
- **Response**: 
  ```json
  [
    {
      "orderId": "ORD12345",
      "date": "January 15, 2025",
      "total": "₹2,499",
      "status": "Shipped",
      "items": [
        {
          "name": "Wireless Earbuds",
          "quantity": 1,
          "price": "₹1,999"
        },
        {
          "name": "Smartphone Screen Protector",
          "quantity": 1,
          "price": "₹500"
        }
      ]
    }
  ]
  ```

---

## How It Works

1. **Cart Management**:
   - The user can view, add, or remove items in their cart.
   - Quantity can be increased or decreased via the cart page.
   - On clicking the 'Buy' button, the item is moved to the **Orders Page**.

2. **Order Creation**:
   - The item that is clicked on the 'Buy' button gets added to the `orders` state in the **Orders page**.
   - Orders are shown in a list with details like order ID, date, total amount, and status.
   - The order data format is predefined, and when an item is bought, the data is appended to this list.

---

## Notes

- Ensure that your backend supports the necessary endpoints for cart and order management.
- You can extend the `cart.js` API to persist data in a database (e.g., MongoDB, PostgreSQL).
- **Styling**: All styles are imported from respective CSS modules (`cart.module.css`, `orders.module.css`).

---

Feel free to make any customizations based on your backend setup, as this documentation assumes the use of basic API endpoints.