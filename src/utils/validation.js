const validator = require("validator");

const validateSignUpData = (data) => {
  const { firstName, lastName, email, password } = data;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format!");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be strong: min 8 chars, with uppercase, lowercase, number, and symbol."
    );
  }
};

module.exports = {
  validateSignUpData,
};
