const jwt = require("jsonwebtoken");

exports.requiresignin = (req, res, next) => {
  console.log(req.cookies.token);
  if (req.cookies.token) {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } else res.status(401).json({ error: "authorization requried" });
};
