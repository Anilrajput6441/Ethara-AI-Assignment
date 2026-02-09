import express from "express";
import {
  addEmployee,
  getEmployees,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", addEmployee);
router.get("/", getEmployees);
router.delete("/:id", deleteEmployee);

export default router;
