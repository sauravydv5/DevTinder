const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middleware/auth");

app.use("/admin", adminAuth);
// app.use("/user", userAuth);

// app.post("./user/login", (req, res) => {
//   res.send("user logged sucessfully.....");
// });

//For admin auth
app.get("/admin/getAlldata", (req, res) => {
  res.send("All Data Sent.....");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("All user Delete.....");
});
app.get("/admin/patchUser", (req, res) => {
  res.send("All user Patched.....");
});

//for userauth
app.get("/user/getAlldata", userAuth, (req, res) => {
  res.send("All Data Sent.....");
});

app.listen(3000, () => {
  console.log("server is running sucessfully port  3000");
});
