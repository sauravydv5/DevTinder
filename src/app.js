const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.send({ firstName: "saurav", lastName: "yadav" });
// });
// app.use("/test", (req, res) => {
//   res.send("hello from test ");
// });
// app.get("/hello", (req, res) => {
//   res.send("hello hello ");
// });

app.use(
  "/",
  (req, res, next) => {
    //route handler
    // res.send("route Hanlder 1");
    next();
  },
  (req, res) => {
    //route handler 2
    res.send("route Handler 2");
  }
);

app.listen(3000, () => {
  console.log("server is running sucessfully port  3000");
});
