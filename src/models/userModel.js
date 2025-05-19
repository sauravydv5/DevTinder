const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password..:" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid...");
        }
      },
    },

    photoUrl: {
      type: String,
      default: "https://www.pnrao.com/?attachment_id=8917",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid photo url:" + value);
        }
      },
    },

    about: {
      type: String,
      default: "This is default about the user",
    },
    skills: {
      type: [String],
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
