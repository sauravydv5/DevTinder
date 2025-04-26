const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello from dashbord");
});
app.get("/test", (req, res) => {
  res.send("hello from ");
});
app.get("/hello", (req, res) => {
  res.send("hello hello ");
});

app.listen(3000, () => {
  console.log("server is running sucessfully port  3000");
});
