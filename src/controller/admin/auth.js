const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../model/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  // console.log(firstName, lastName, userName, email, password);
  User.findOne({ email: req.body.payload.email }).exec((error, email) => {
    if (email) return res.status(400).json({ error: "this email aready use" });
    User.findOne({ username: req.body.payload.userName }).exec(
      (error, data) => {
        if (data)
          return res.status(400).json({ error: "this username aready use" });
        const {
          firstName,
          lastName,
          userName,
          email,
          password,
        } = req.body.payload;
        const hash_password = bcrypt.hashSync(password, 10);
        const add = new User({
          firstName,
          lastName,
          email,
          hash_password,
          username: userName,
          role: "admin",
        });
        add.save((error, user) => {
          if (error) return res.status(400).json({ error });
          if (user) {
            return res.status(201).json({ user });
          }
        });
      }
    );
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body.payload;
  User.findOne({ email: email }).exec((error, user) => {
    if (error) return res.status(400).json({ error: "email invalid" });
    if (user) {
      if (user.authenticate(password) && user.role == "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { firstName, lastName, email, role, username } = user;
        res
          .status(202)
          .cookie("token", token, {
            sameSite: "strict",
            path: "/",
            // expires: new Date(new Date().getTime() + 5 * 1000),
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            httpOnly: true,
            // secure: true,
          })
          .json({ user: { firstName, lastName, email, role, username } });
      } else {
        return res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ error: "something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  res.status(202).clearCookie("token").send("cookies cleared");
};
