export const NewUserValidationSchema = {
  full_name: {
    in: ["body"],
    isString: {
      errorMessage: "Full name must be a string",
    },
    notEmpty: {
      errorMessage: "Full name is required",
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "Full name must be at least 5 characters long",
    },
    trim: true,
  },

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

  confirmPassword: {
    in: ["body"],
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      },
    },
  },
};
