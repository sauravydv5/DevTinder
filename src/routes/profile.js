const express = require("express");

const profileRouter = express.Router();
const User = require("../models/user");
const userAuth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

//Profile Api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // Set by userAuth middleware

    res.send(user);
  } catch (err) {
    res.status(401).send({ error: "Unauthorized: Invalid or expired token" });
  }
});

//profile  Edit....

profileRouter.patch("/profile/edit", async (req, res) => {});

module.exports = profileRouter;
