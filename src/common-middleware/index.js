const jwt = require("jsonwebtoken");

exports.requiresignin = (req, res, next) => {
  // console.log(req.cookies.token);
  if (req.cookies.token) {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } else res.status(401).json({ error: "authorization requried" });
};

exports.adminMoiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).josn({ message: "Admin Access denied" });
  }
  next();
};

exports.userMiddlerware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User Access denied" });
  }
  next();
};
