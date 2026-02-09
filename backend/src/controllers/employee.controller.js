import Employee from "../models/employee.model.js";
import { validateEmployee } from "../validations/employee.validation.js";

export const addEmployee = async (req, res, next) => {
  try {
    const error = validateEmployee(req.body);
    if (error) return res.status(400).json({ message: error });

    const exists = await Employee.findOne({
      $or: [
        { employeeId: req.body.employeeId },
        { email: req.body.email }
      ],
    });

    if (exists) {
      return res.status(400).json({
        message: "Employee with same ID or Email exists",
      });
    }

    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
