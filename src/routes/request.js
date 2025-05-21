const express = require("express");

const requestRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = require("../middleware/auth");
//Send Connection Request Api...
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  //sending connection request
  console.log("Sending a connection request..");

  res.send(user.firstName + "sent the connection request!");
});

module.exports = requestRouter;
