/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { attendanceAPI } from "../api/api";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

export default function AttendanceList({ employeeId }: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    attendanceAPI.byEmployee(employeeId).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, [employeeId]);

  if (loading) return <Loader />;
  if (!data.length)
    return <EmptyState text="No records" />;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map(r => (
          <tr key={r._id}>
            <td>{r.date}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
