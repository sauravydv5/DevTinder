const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/userModel");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Sucessfull");
    } else {
      throw new Error("Invalid Crendatials..");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//find user by email.
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const user = await User.findOne({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

//Feed Api -  GET/feed - get all the users from the database.

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

//delete data
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //const user = await User.findByIdAndDelete({ _id:userId });
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted sucessfully...");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//update data of the user...

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(JSON.stringify(data));

  try {
    const ALLOWED_UPDATE = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not Allowed");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    res.send("User updated successfully.");
  } catch (err) {
    res.status(500).send("Update Failed: " + err.message);
  }
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

// // const { adminAuth, userAuth } = require("./middleware/auth");

// // app.use("/admin", adminAuth);
// // app.use("/user", userAuth);

// // app.post("./user/login", (req, res) => {
// //   res.send("user logged sucessfully.....");
// // });

// //For admin auth
// // app.get("/admin/getAlldata", (req, res) => {
// //   res.send("All Data Sent.....");
// // });
// // app.get("/admin/deleteUser", (req, res) => {
// //   res.send("All user Delete.....");
// // });
// // app.get("/admin/patchUser", (req, res) => {
// //   res.send("All user Patched.....");
// // });

// // //for userauth
// // app.get("/user/getAlldata", userAuth, (req, res) => {
// //   res.send("All Data Sent.....");
// // });

// app.get("/getUserData", (req, res) => {
//   //logic of db call and get user data

//   // try{

//   // }catch(err){

//   // }

//   throw new Error("jdadhad");
//   res.send("User Data sent...");
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong");
//   }
//   //  else {
//   //   next();
//   // }
// });
