const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sauravkumar91937:qazxswedc@cluster0.iq3nua2.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
