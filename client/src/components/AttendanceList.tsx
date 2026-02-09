import { useEffect, useState } from "react";
import { attendanceAPI } from "../api/api";
import type { Attendance } from "../types";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

interface AttendanceListProps {
  employeeId: string;
  startDate?: string;
  endDate?: string;
}

// Component to display attendance records for an employee with date filtering
export default function AttendanceList({ employeeId, startDate, endDate }: AttendanceListProps) {
  const [data, setData] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await attendanceAPI.byEmployee(employeeId);
        let filteredData = res.data;
        
        // Filter by date range if provided
        if (startDate || endDate) {
          filteredData = filteredData.filter((record: Attendance) => {
            const recordDate = new Date(record.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            
            if (start && recordDate < start) return false;
            if (end && recordDate > end) return false;
            return true;
          });
        }
        
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setData([]);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [employeeId, startDate, endDate]); // Fetch attendance data when employeeId or date range changes

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
