const express = require("express");
const connectDB = require("./config/database");
const app = express();
const user = require("./models/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database Connected  sucessfully...");
    app.listen(3000, () => {
      console.log("Server is running Sucessfully PORT  3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected..");
  });
