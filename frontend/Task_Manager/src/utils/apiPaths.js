export const BASE_URL = "https://task-manager-website-backend.onrender.com"; // Base URL for the API

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/auth/login`, // Login endpoint
    REGISTER: `/api/auth/register`, // Signup endpoint
    GET_PROFILE: `/api/auth/profile`, // Get user profile endpoint
    UPDATE_PROFILE: `/api/auth/profile`, // Update user profile endpoint
  },
  USERS: {
    GET_ALL_USERS: `/api/users`, // Get all users endpoint
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by ID endpoint
    CREATE_USER: `/api/users`, // Create new user endpoint
    UPDATE_USER: (userId) => `/api/users/${userId}`, // Update user by ID endpoint
    DELETE_USER: (userId) => `/api/users/${userId}`, // Delete user by ID endpoint
  },
  TASKS: {
    GET_DASHBOARD_DATA: `/api/tasks/dashboard-data`, // Get dashboard data endpoint
    GET_USER_DASHBOARD_DATA: `/api/tasks/user-dashboard-data`, // Get user-specific dashboard data endpoint
    GET_ALL_TASKS: `/api/tasks`, // Get all tasks endpoint
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, // Get task by ID endpoint
    CREATE_TASK: `/api/tasks`, // Create new task endpoint
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, // Update task by ID endpoint
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, // Delete task by ID endpoint
    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, // Update task status endpoint
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, // Update todo checklist endpoint
  },
  REPORTS: {
    EXPORT_TASKS: `/api/reports/export/tasks`, // Get task report endpoint
    EXPORT_USERS: `/api/reports/export/users`, // Get user report endpoint
  },
  IMAGE: {
    UPLOAD_IMAGE: `/api/auth/upload-image`, // Upload profile picture endpoint
    DELETE_IMAGE: (publicId) => `/api/auth/delete-image/${publicId}`, // Delete profile picture endpoint
  },
};
