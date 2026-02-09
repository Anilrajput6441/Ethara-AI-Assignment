# HRMS Lite - Frontend

The frontend of the HRMS Lite application built with React and Vite. This modern, responsive interface provides a comprehensive dashboard for managing employees and tracking attendance.

## 🛠️ Tech Stack

- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client
- **React Router** - Client-side routing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following environment variables:
```env
VITE_API_URL=http://localhost:5000
```

### Running the Development Server

```bash
npm run dev
```

The development server will start and provide a local URL to access the application (typically `http://localhost:5173`).

## 📁 Project Structure

```
client/
├── public/
├── src/
│   ├── api/
│   │   └── api.ts              # API service configuration and endpoints
│   ├── components/
│   │   ├── AttendanceForm.tsx  # Form for marking attendance
│   │   ├── AttendanceList.tsx  # List of attendance records
│   │   ├── EmployeeForm.tsx    # Form for adding employees
│   │   ├── EmployeeList.tsx    # List of employees
│   │   ├── EmptyState.tsx      # Component for empty states
│   │   ├── ErrorState.tsx      # Component for error states
│   │   └── Loader.tsx          # Loading spinner component
│   ├── pages/
│   │   └── Dashboard.tsx       # Main dashboard page
│   ├── types/
│   │   └── index.ts            # Type definitions
│   ├── App.tsx                 # Main application component
│   ├── index.css               # Global styles
│   └── main.tsx                # Application entry point
├── .env                        # Environment variables
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🎨 Features

### Dashboard Overview
- **Summary Cards**: Real-time statistics showing total employees, present today, and absent today
- **Employee List**: Left panel displaying all employees with selection capability
- **Employee Details**: Right panel showing selected employee's information
- **Attendance Section**: Interface for marking attendance and viewing records

### Attendance Tracking
- **Mark Attendance**: Form to record employee attendance with date selection
- **Date Filtering**: Filter attendance records by start and end dates
- **Present Count**: Shows total number of present days per employee

### Responsive Design
- Mobile-friendly interface
- Clean, modern UI with Tailwind CSS
- Intuitive navigation and user experience

## 🔌 API Integration

The frontend communicates with the backend API through the `api.ts` file, which exports service objects for employees and attendance:

- `employeeAPI`: Methods for getting, creating, and deleting employees
- `attendanceAPI`: Methods for marking attendance and retrieving attendance records

## 🧩 Components

### Core Components
- **EmployeeForm**: Handles employee creation with validation
- **EmployeeList**: Displays employees in a table with delete functionality
- **AttendanceForm**: Allows marking attendance for selected employee
- **AttendanceList**: Shows attendance records with optional date filtering

### UI Components
- **EmptyState**: Displays when no data is available
- **ErrorState**: Shows error messages to users
- **Loader**: Provides loading feedback during API calls

## 📋 Type Definitions

TypeScript interfaces are defined in `types/index.ts`:
- `Employee`: Defines the structure for employee data
- `Attendance`: Defines the structure for attendance records

## ⚙️ Environment Variables

- `VITE_API_URL`: Base URL for the backend API (e.g., `http://localhost:5000`)

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready bundle
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## 🧪 Error Handling

The application gracefully handles various error scenarios:
- Network errors during API calls
- Validation errors in forms
- Empty states when no data is available
- Loading states during API requests

## 🚨 Best Practices Implemented

- **Type Safety**: Comprehensive TypeScript typing throughout
- **Component Reusability**: Well-structured, reusable components
- **State Management**: Proper React state management with hooks
- **Error Boundaries**: Handling of runtime errors
- **Accessibility**: Semantic HTML and proper ARIA attributes
- **Performance**: Optimized rendering and API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/frontend-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add frontend feature'`)
6. Push to the branch (`git push origin feature/frontend-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.