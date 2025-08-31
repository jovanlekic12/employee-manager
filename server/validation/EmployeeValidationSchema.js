export const employeeValidationSchema = {
  id: {
    in: ["body"],
    isUUID: {
      errorMessage: "ID must be a valid UUID",
    },
  },
  full_name: {
    in: ["body"],
    isString: { errorMessage: "Full name must be a string" },
    notEmpty: { errorMessage: "Full name is required" },
    trim: true,
  },
  adress: {
    in: ["body"],
    isString: { errorMessage: "Address must be a string" },
    notEmpty: { errorMessage: "Address is required" },
    trim: true,
  },
  start_date: {
    in: ["body"],
    isISO8601: { errorMessage: "Start date must be a valid date (YYYY-MM-DD)" },
    toDate: true,
  },
  employment: {
    in: ["body"],
    isString: { errorMessage: "Employment type must be a string" },
    notEmpty: { errorMessage: "Employment type is required" },
  },
  department: {
    in: ["body"],
    isString: { errorMessage: "Department must be a string" },
    notEmpty: { errorMessage: "Department is required" },
  },
  training: {
    in: ["body"],
    isBoolean: { errorMessage: "Training must be true or false" },
    toBoolean: true,
  },
};
