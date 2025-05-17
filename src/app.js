const express = require("express");
const connectDB = require("./config/database");

const app = express();

const User = require("./models/userModel");

app.post("/signup", async (req, res) => {
  // const userObj = {
  //   firstName: "Saurav ",
  //   lastName: "Kumar",
  //   email: "saurav@gmail.com",
  //   password: "Saurav@123",
  // };

  //creating a new instane of the user model
  const user = new User({
    firstName: "gautam ",
    lastName: "Kumar",
    email: "gautam@gmail.com",
    password: "gautam@123",
  });
  try {
    await user.save();
    res.send("user added sucessfully!");
  } catch (err) {
    res.status(400).send("Error Saving the user:" + err.message);
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
