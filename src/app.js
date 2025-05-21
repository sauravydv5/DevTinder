const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(
  cors({
    // origin: "http://localhost:5173/login",
    // credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//signup Api
app.post("/signup", async (req, res) => {
  try {
    //Validate of data...

    validateSignUpData(req.body);

    const { firstName, lastName, email, password } = req.body;

    //Encrypt the Password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // creating a new instane of the user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("user added sucessfully!");
  } catch (err) {
    res.status(400).send("Error Saving the user:" + err.message);
  }
});

//login Api
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Crendatials..");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Sucessfull!!!");
    } else {
      throw new Error("Invalid Crendatials..");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//Profile Api
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // Set by userAuth middleware

    res.send(user);
  } catch (err) {
    res.status(401).send({ error: "Unauthorized: Invalid or expired token" });
  }
});

//Send Connection Request...

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  //sending connection request
  console.log("Sending a connection request..");

  res.send(user.firstName + "sent the connection request!");
});

connectDB()
  .then(() => {
    console.log("Database connected  sucessfully...");
    app.listen(3000, () => {
      console.log("server is running sucessfully port  3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected..");
  });
