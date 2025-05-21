const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send({ error: "Token is not valid!!!" });
    }

    const decodedObj = jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized: " + err.message });
  }
};

module.exports = userAuth;
