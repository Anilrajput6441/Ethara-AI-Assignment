import { useEffect, useState } from "react";
import { employeeAPI } from "../api/api";
import type { Employee } from "../types";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

interface EmployeeListProps {
  onEmployeeSelect?: (employee: Employee) => void;
  selectedEmployeeId?: string;
}

export default function EmployeeList({ onEmployeeSelect, selectedEmployeeId }: EmployeeListProps) {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await employeeAPI.getAll();
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error loading employees:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await load();
    };
    
    loadData();
  }, []);

  const remove = async (id: string) => {
    await employeeAPI.delete(id);
    load();
  };

  if (loading) return <Loader />;
  
  const employees = Array.isArray(data) ? data : [];
  
  if (!employees.length)
    return <EmptyState text="No employees" />;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Dept</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {employees.map(e => (
          <tr 
            key={e._id} 
            className={`cursor-pointer hover:bg-gray-50 ${selectedEmployeeId === e._id ? "bg-blue-50" : ""}`}
            onClick={() => onEmployeeSelect?.(e)}
          >
            <td>{e.employeeId}</td>
            <td>{e.fullName}</td>
            <td>{e.email}</td>
            <td>{e.department}</td>

            <td>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  remove(e._id!);
                }}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
