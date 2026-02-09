import { useState } from "react";
import { employeeAPI } from "../api/api";
import type { Employee } from "../types";
import ErrorState from "./ErrorState";

interface EmployeeFormProps {
  onAdded: () => void;
}

export default function EmployeeForm({ onAdded }: EmployeeFormProps) {
  const [form, setForm] = useState<Employee>({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await employeeAPI.create(form);
      onAdded();
      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });
    } catch (err) {
      const error = err as {response?: {data?: {message?: string}}} ;
      setError(error.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {error && <ErrorState text={error} />}

      <input
        className="input"
        placeholder="Employee ID"
        value={form.employeeId}
        onChange={e =>
          setForm({ ...form, employeeId: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="Full Name"
        value={form.fullName}
        onChange={e =>
          setForm({ ...form, fullName: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="Email"
        value={form.email}
        onChange={e =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="Department"
        value={form.department}
        onChange={e =>
          setForm({ ...form, department: e.target.value })
        }
      />

      <button className="btn">Add Employee</button>
    </form>
  );
}
