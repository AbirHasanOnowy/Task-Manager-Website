# Task Manager

A full-stack web application for managing tasks and teams, featuring user authentication, role-based access (admin/member), task assignment, progress tracking, and reporting. Built with React (Vite) for the frontend and Node.js/Express/MongoDB for the backend.

## Features

- User registration & login (with profile picture upload)
- Admin & member roles (admin invitation token support)
- Dashboard with task statistics
- Create, update, delete, and assign tasks
- Task checklist, attachments, and priorities
- Team management (admin can view all users)
- Downloadable Excel reports for tasks and users
- Responsive UI with modern design

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT
- **File Uploads:** Cloudinary
- **Excel Export:** exceljs

## Project Structure

```
backend/
  controllers/
  middlewares/
  models/
  routes/
  config/
  uploads/
  server.js
  package.json
frontend/
  Task_Manager/
    src/
    public/
    index.html
    package.json
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ADMIN_INVITE_TOKEN=your_admin_invite_token
   CLIENT_URL=http://localhost:5173
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The server runs on `http://localhost:8000` by default.

### Frontend Setup

1. Navigate to the frontend app:
   ```sh
   cd frontend/Task_Manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend dev server:
   ```sh
   npm run dev
   ```
   The app runs on `http://localhost:5173`.

## Usage

- Register as a new user (admin registration requires the invitation token).
- Admins can manage users and tasks, and download reports.
- Members can view and update their assigned tasks.

## API Endpoints

See [backend/routes](backend/routes/) for available API endpoints.

## License

This project is for educational/demo purposes.

```

```
