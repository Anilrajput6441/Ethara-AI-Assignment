# HRMS Lite - Backend

The backend of the HRMS Lite application built with Node.js and Express. This API server manages employee data and attendance records, providing RESTful endpoints for the frontend application.

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Cors** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or cloud instance like MongoDB Atlas)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hrms_lite
```

### Running the Server

- **Development**: `npm run dev` (uses nodemon for auto-restart)
- **Production**: `npm start` (runs with node)

The server will start on `http://localhost:5000`.

## 📁 Project Structure

```
backend/
├── src/
│   ├── configs/
│   │   └── db.js              # Database connection configuration
│   ├── controllers/
│   │   ├── attendance.controller.js  # Attendance-related business logic
│   │   └── employee.controller.js    # Employee-related business logic
│   ├── middleware/
│   │   └── error.middleware.js       # Global error handling middleware
│   ├── models/
│   │   ├── attendance.model.js       # Attendance schema definition
│   │   └── employee.model.js         # Employee schema definition
│   ├── routes/
│   │   ├── attendance.routes.js      # Attendance API routes
│   │   └── employee.routes.js        # Employee API routes
│   └── app.js               # Main application entry point
├── .env                     # Environment variables
├── .gitignore
└── package.json
```

## 🛣️ API Routes

### Employee Routes (`/employees`)

- `GET /` - Retrieve all employees
  - Response: Array of employee objects
  - Status: 200 OK

- `POST /` - Create a new employee
  - Body: `{ employeeId, fullName, email, department }`
  - Response: Created employee object
  - Status: 201 Created

- `DELETE /:id` - Delete an employee by ID
  - Params: `id` - Employee ID
  - Status: 200 OK / 404 Not Found

### Attendance Routes (`/attendance`)

- `POST /` - Mark attendance for an employee
  - Body: `{ employeeId, date, status }`
  - Response: Created attendance record
  - Status: 201 Created

- `GET /:employeeId` - Get attendance records for an employee
  - Params: `employeeId` - Employee ID
  - Response: Array of attendance records
  - Status: 200 OK

## 📋 Data Models

### Employee Model
```javascript
{
  employeeId: String,    // Unique employee identifier
  fullName: String,      // Employee's full name
  email: String,         // Employee's email address
  department: String     // Department where employee works
}
```

### Attendance Model
```javascript
{
  employeeId: String,    // Reference to employee
  date: String,          // Date of attendance (YYYY-MM-DD format)
  status: String         // Attendance status ("Present" | "Absent")
}
```

## 🔐 Environment Variables

- `PORT` - Port number for the server (default: 5000)
- `MONGODB_URI` - Connection string for MongoDB database

## 🧪 Error Handling

The application uses a centralized error handling middleware that catches errors and returns appropriate HTTP status codes and error messages.

## 🚨 Error Responses

Common error responses:
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Server-side error

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/backend-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add backend feature'`)
6. Push to the branch (`git push origin feature/backend-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.