/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";
import type { Employee } from "../types";

export default function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [refreshEmployees, setRefreshEmployees] = useState(0);
  const [refreshAttendance, setRefreshAttendance] = useState(0);

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowAttendanceForm(false);
  };

  const handleAddEmployee = () => {
    setRefreshEmployees(prev => prev + 1);
    setShowAddForm(false);
    setSelectedEmployee(null);
  };

  const handleMarkAttendance = () => {
    setShowAttendanceForm(!showAttendanceForm);
    setRefreshAttendance(prev => prev + 1);
  };

  const handleAttendanceSubmit = () => {
    setShowAttendanceForm(false);
    setRefreshAttendance(prev => prev + 1);
  };

  return (
    <div className="flex gap-6">
      {/* Left Panel - Employee List */}
      <div className="w-1/2">
        <div className="card mb-6">
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

              <h3 className="font-medium mb-2">Attendance Records</h3>
              <AttendanceList 
                key={refreshAttendance}
                employeeId={selectedEmployee.employeeId} 
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
  );
}