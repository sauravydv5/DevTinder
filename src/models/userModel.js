const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
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
    },
    password: {
      type: String,
      required: true,
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
