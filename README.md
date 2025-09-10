
# 🏋️ Workout Tracker (MERN)

A full-stack **Workout Tracker** application built with the powerful **MERN stack**:

* **Frontend**: The user interface is developed with **React**, using **Vite** for fast startup and styled with **TailwindCSS**.
* **Backend**: The API server is built with **Node.js** and the **Express** framework.
* **Database**: Data is stored in **MongoDB** and managed using the **Mongoose** library.

---

## ✨ Key Features

The application provides core functionalities for users to easily manage their workouts:

* ➕ **Create, Edit, Delete** workouts: Full CRUD (Create, Read, Update, Delete) operations.
* 📋 **Detailed listing**: View a list of all workouts with details like name, reps, and load.
* 🌐 **RESTful API**: A robust API built with **Express**.
* 🎨 **Responsive UI**: The user interface is optimized for both desktop and mobile devices.

---

## 🗂 Project Structure

The project is organized into two main directories for a clean separation of concerns:

workout-tracker/
├── frontend/ # React + Vite + TailwindCSS source code
└── backend/  # Node.js + Express + MongoDB source code
---

## 🚀 Getting Started

Follow these steps to get the application up and running on your local machine.

### 1. Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install the necessary dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the backend's root directory and add the following environment variables:
    ```env
    PORT=4000
    MONGO_URI=your_mongodb_connection_string
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend

1.  Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install the necessary dependencies:
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    npm run dev
    ```

The application will automatically open in your browser and will be ready to use!
