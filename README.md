### Live-Link : https://ethara-ai-assignment.vercel.app/

## Features

- **Employee Management**: Add, view, and delete employee records with details like ID, name, email, and department
- **Attendance Tracking**: Mark and track employee attendance with date and status (Present/Absent)
- **Dashboard Overview**: Real-time statistics showing total employees, present count, and absent count
- **Date Filtering**: Filter attendance records by date range
- **Responsive UI**: Clean, responsive interface built with Tailwind CSS
- **Real-time Updates**: Automatic updates when new records are added

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Cors** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client

## Prerequisites

- Node.js 
- MongoDB 
- npm 

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory and add the following:
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/hrms_lite
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will start on `http://localhost:8080`.

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client root directory and add the following:
```env
VITE_API_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or similar port).

## Project Structure

```
Ethara-AI-Assignment/
├── backend/
│   ├── src/
│   │   ├── configs/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── attendance.controller.js
│   │   │   └── employee.controller.js
│   │   ├── middleware/
│   │   │   └── error.middleware.js
│   │   ├── models/
│   │   │   ├── attendance.model.js
│   │   │   └── employee.model.js
│   │   ├── routes/
│   │   │   ├── attendance.routes.js
│   │   │   └── employee.routes.js
│   │   └── app.js
│   └── .env
└── client/
    ├── src/
    │   ├── api/
    │   │   └── api.ts
    │   ├── components/
    │   │   ├── AttendanceForm.tsx
    │   │   ├── AttendanceList.tsx
    │   │   ├── EmployeeForm.tsx
    │   │   ├── EmployeeList.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── ErrorState.tsx
    │   │   └── Loader.tsx
    │   ├── pages/
    │   │   └── Dashboard.tsx
    │   ├── types/
    │   │   └── index.ts
    │   └── App.tsx
    └── .env
```

## API Endpoints

### Employee Routes
- `GET /employees` - Get all employees
- `POST /employees` - Create a new employee
- `DELETE /employees/:id` - Delete an employee

### Attendance Routes
- `POST /attendance` - Mark attendance for an employee
- `GET /attendance/:employeeId` - Get attendance records for an employee

## Usage

1. Launch the backend server first
2. Launch the frontend development server
3. Open the frontend URL in your browser
4. Use the application to:
   - Add new employees using the "Add Employee" button
   - View the list of employees
   - Select an employee to view details and mark attendance
   - Filter attendance records by date range
   - See real-time dashboard statistics

## Dashboard Features

The main dashboard provides:
- **Summary Cards**: Total employees, present today, absent today
- **Employee List**: Left panel with clickable employee list
- **Employee Details**: Right panel showing selected employee's information
- **Attendance Section**: Mark attendance with date selection and view records
- **Date Filters**: Filter attendance records by start/end dates



