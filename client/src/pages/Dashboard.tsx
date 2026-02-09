import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";
import type { Employee, Attendance } from "../types";
import { employeeAPI, attendanceAPI } from "../api/api";

export default function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false); // Toggle add employee form
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // Selected employee
  const [showAttendanceForm, setShowAttendanceForm] = useState(false); // Toggle attendance form
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]); // Date for attendance
  const [refreshEmployees, setRefreshEmployees] = useState(0); // Trigger employee refresh
  const [refreshAttendance, setRefreshAttendance] = useState(0); // Trigger attendance refresh
  const [startDate, setStartDate] = useState<string>(''); // Start date filter
  const [endDate, setEndDate] = useState<string>(''); // End date filter
  const [employeeStats, setEmployeeStats] = useState<{[key: string]: number}>({}); // Stats per employee
  const [dashboardSummary, setDashboardSummary] = useState({
    totalEmployees: 0,
    totalPresentToday: 0,
    totalAbsentToday: 0,
  }); // Summary counts

  // Handle employee selection
  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowAttendanceForm(false);
  };

  // Handle employee addition
  const handleAddEmployee = () => {
    setRefreshEmployees(prev => prev + 1);
    setShowAddForm(false);
    setSelectedEmployee(null);
  };

  // Toggle attendance form
  const handleMarkAttendance = () => {
    setShowAttendanceForm(!showAttendanceForm);
    setRefreshAttendance(prev => prev + 1);
  };

  // Handle attendance submission
  const handleAttendanceSubmit = () => {
    setShowAttendanceForm(false);
    setRefreshAttendance(prev => prev + 1);
  };

  const calculateEmployeeStats = async () => {
    try {
      const employeesRes = await employeeAPI.getAll();
      const employees = Array.isArray(employeesRes.data) ? employeesRes.data : [];
      
      const stats: {[key: string]: number} = {};
      
      for (const emp of employees) {
        const attendanceRes = await attendanceAPI.byEmployee(emp.employeeId);
        const attendanceRecords: Attendance[] = Array.isArray(attendanceRes.data) ? attendanceRes.data : [];
        
        const presentCount = attendanceRecords.filter((rec) => rec.status === 'Present').length;
        stats[emp.employeeId] = presentCount;
      }
      
      setEmployeeStats(stats);
    } catch (error) {
      console.error('Error calculating employee stats:', error);
    }
  };

  const calculateDashboardSummary = async () => {
    try {
      const employeesRes = await employeeAPI.getAll();
      const employees = Array.isArray(employeesRes.data) ? employeesRes.data : [];
      
      const today = new Date().toISOString().split('T')[0];
      let totalPresentToday = 0;
      let totalAbsentToday = 0;
      
      for (const emp of employees) {
        const attendanceRes = await attendanceAPI.byEmployee(emp.employeeId);
        const attendanceRecords: Attendance[] = Array.isArray(attendanceRes.data) ? attendanceRes.data : [];
        
        const todayRecord = attendanceRecords.find((rec) => rec.date === today);
        if (todayRecord) {
          if (todayRecord.status === 'Present') totalPresentToday++;
          else totalAbsentToday++;
        }
      }
      
      setDashboardSummary({
        totalEmployees: employees.length,
        totalPresentToday,
        totalAbsentToday,
      });
    } catch (error) {
      console.error('Error calculating dashboard summary:', error);
    }
  };

  // Recalculate stats when data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateEmployeeStats();
      calculateDashboardSummary();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [refreshEmployees, refreshAttendance]);

  return (
    <div className="space-y-6">
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-600">{dashboardSummary.totalEmployees}</h3>
          <p className="text-gray-600">Total Employees</p>
        </div>
        <div className="card p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">{dashboardSummary.totalPresentToday}</h3>
          <p className="text-gray-600">Present Today</p>
        </div>
        <div className="card p-4 text-center">
          <h3 className="text-2xl font-bold text-red-600">{dashboardSummary.totalAbsentToday}</h3>
          <p className="text-gray-600">Absent Today</p>
        </div>
      </div>
      
      <div className="flex gap-6">
        {/* Left Panel - Employee List */}
        <div className="w-1/2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Employees</h2>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn"
              >
                {showAddForm ? "Cancel" : "Add Employee"}
              </button>
            </div>
          
            {showAddForm && (
              <div className="mb-6 p-4 border rounded">
                <EmployeeForm onAdded={handleAddEmployee} />
              </div>
            )}
            
            <EmployeeList 
              key={refreshEmployees}
              onEmployeeSelect={handleEmployeeSelect}
              selectedEmployeeId={selectedEmployee?._id}
            />
          </div>
        </div>

        {/* Right Panel - Employee Details & Attendance */}
        <div className="w-1/2">
          {selectedEmployee ? (
            <div className="space-y-6">
              {/* Employee Details */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Employee Details</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">ID:</span> {selectedEmployee.employeeId}</p>
                  <p><span className="font-medium">Name:</span> {selectedEmployee.fullName}</p>
                  <p><span className="font-medium">Email:</span> {selectedEmployee.email}</p>
                  <p><span className="font-medium">Department:</span> {selectedEmployee.department}</p>
                </div>
              </div>

              {/* Attendance Section */}
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Attendance</h2>
                  <button 
                    onClick={handleMarkAttendance}
                    className="btn"
                  >
                    {showAttendanceForm ? "Close Form" : "Mark Attendance"} 
                  </button>
                </div>

                {showAttendanceForm && (
                  <div className="mb-6 p-4 border rounded">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="input"
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                      />
                    </div>
                    
                    <AttendanceForm 
                      onSelect={handleAttendanceSubmit}
                      defaultData={{
                        employeeId: selectedEmployee.employeeId,
                        date: attendanceDate,
                        status: "Present"
                      }}
                    />
                  </div>
                )}

                <div className="mb-4 flex gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      className="input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      className="input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={() => { setStartDate(''); setEndDate(''); }}
                      className="btn-secondary"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <h3 className="font-medium mb-2">
                  Attendance Records 
                  ({employeeStats[selectedEmployee.employeeId] || 0} Present)
                </h3>
                <AttendanceList 
                  key={refreshAttendance}
                  employeeId={selectedEmployee.employeeId} 
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <p className="text-gray-500">Select an employee to view details and mark attendance</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
