# Attendance Tracker

A full-stack application to manage and track attendance using **Node.js**, **Express**, **MongoDB**, and **React**. This application allows users to mark their attendance and view attendance records, with JWT-based authentication.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This project is a college-based **Attendance Tracker** application where students and teachers can log in, mark attendance, and view attendance reports.

## Features
- **User Authentication**: JWT-based login and registration.
- **Attendance Marking**: Users can mark their attendance for the day.
- **View Attendance**: Users can view their attendance records.
- **Responsive UI**: Built with React.js for a smooth, interactive experience.

## Tech Stack

### Backend:
- **Node.js**: JavaScript runtime environment to run server-side code.
- **Express**: A fast, minimalist web framework for Node.js to handle routes, requests, and middleware.
- **MongoDB**: A NoSQL database (hosted on MongoDB Atlas) used for storing users and attendance records.
- **JWT (JSON Web Tokens)**: For user authentication and securing API routes.

### Frontend:
- **React.js**: A popular JavaScript library for building interactive user interfaces.
- **Axios**: A promise-based HTTP client used for making API requests from the frontend.
- **React Router**: A library used to manage client-side routing in React applications.

## Backend Setup

### Prerequisites:
- **Node.js** installed (v14+)
- **MongoDB Atlas** account or local MongoDB setup

### Steps:
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/attendance-tracker.git
    cd attendance-tracker/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend/` directory with the following content:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the server:
    ```bash
    npm run start
    ```

5. The backend server should now be running on `http://localhost:5000`.

## Frontend Setup

### Prerequisites:
- **Node.js** installed (v14+)

### Steps:
1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend/` directory with the following content:
    ```bash
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. Start the React app:
    ```bash
    npm start
    ```

5. The frontend app should now be running on `http://localhost:3000`.

## API Endpoints

### Auth Routes:
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login and JWT token generation

### Attendance Routes:
- `POST /api/attendance/mark`: Mark attendance (requires JWT)
- `GET /api/attendance/view`: View attendance records (requires JWT)

## Database Schema

### User Schema:
```json
{
  "name": "String",
  "email": "String",
  "password": "String",
  "role": "String"
}
```
