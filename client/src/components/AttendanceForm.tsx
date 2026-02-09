/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { attendanceAPI } from "../api/api";
import type { Attendance } from "../types";

interface AttendanceFormProps {
  onSelect: (employeeId: string) => void;
  defaultData?: Partial<Attendance>;
}

export default function AttendanceForm({ onSelect, defaultData }: AttendanceFormProps) {
  const [data, setData] = useState<Attendance>({
    employeeId: defaultData?.employeeId || "",
    date: defaultData?.date || new Date().toISOString().split('T')[0],
    status: defaultData?.status || "Present",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await attendanceAPI.mark(data);
    onSelect(data.employeeId);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
    

      <input
        type="date"
        className="input"
        value={data.date}
        onChange={e =>
          setData({ ...data, date: e.target.value })
        }
      />

      <select
        className="input"
        value={data.status}
        onChange={e =>
          setData({ ...data, status: e.target.value as "Present" | "Absent" })
        }
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button className="btn">Submit</button>
    </form>
  );
}
