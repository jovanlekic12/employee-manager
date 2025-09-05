export const LogInValidationSchema = {
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid email address",
    },
    normalizeEmail: true,
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long",
    },
    trim: true,
  },
};
