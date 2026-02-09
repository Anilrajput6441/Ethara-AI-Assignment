import axios from "axios";
import type { Employee, Attendance } from "../types";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const employeeAPI = {
  getAll: () => API.get<Employee[]>("/employees"),

  create: (data: Employee) =>
    API.post("/employees", data),

  delete: (id: string) =>
    API.delete(`/employees/${id}`),
};

export const attendanceAPI = {
  mark: (data: Attendance) =>
    API.post("/attendance", data),

  byEmployee: (employeeId: string) =>
    API.get(`/attendance/${employeeId}`),
};
