export const validateEmployee = (data) => {
  const { employeeId, fullName, email, department } = data;

  if (!employeeId || !fullName || !email || !department) {
    return "All fields are required";
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return null;
};
