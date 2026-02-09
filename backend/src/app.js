import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./configs/db.js";
import employeeRoutes from "./routes/employee.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/health", (req, res) => res.send("OK"));

app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);
