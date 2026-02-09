import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function Employees() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">
          Add Employee
        </h2>

        <EmployeeForm onAdded={() => setRefresh(r => r + 1)} />
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-2">
          Employee List
        </h2>

        <EmployeeList key={refresh} />
      </div>
    </div>
  );
}
