import { useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

export default function Attendance() {
  const [empId, setEmpId] = useState("");

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold">
          Mark Attendance
        </h2>

        <AttendanceForm onSelect={setEmpId} />
      </div>

      {empId && (
        <div className="card">
          <h2 className="text-lg font-semibold">
            Records
          </h2>

          <AttendanceList employeeId={empId} />
        </div>
      )}
    </div>
  );
}
