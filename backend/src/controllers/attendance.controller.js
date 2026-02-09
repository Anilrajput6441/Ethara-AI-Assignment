import Attendance from "../models/attendance.model.js";

export const markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const record = await Attendance.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

export const getAttendanceByEmployee = async (req, res, next) => {
  try {
    const records = await Attendance.find({
      employeeId: req.params.employeeId,
    });

    res.json(records);
  } catch (err) {
    next(err);
  }
};
