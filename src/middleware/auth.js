const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting cheacked....");
  const token = "xyzqwertyuiop";
  const isAdminAuthorized = token === "xyzqwertyuiop";
  if (!isAdminAuthorized) {
    res.status(401).send("user not authorized");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  console.log("Admin auth is getting cheacked....");
  const token = "xyzqwertyuiop";
  const isAdminAuthorized = token === "xyzqwertyuiop";
  if (!isAdminAuthorized) {
    res.status(401).send("user not authorized");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
