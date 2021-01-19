const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const http = require("http");
const Cookie = require("cookie-httponly");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, email) => {
    if (email) return res.status(400).json({ error: "this email aready use" });
    User.findOne({ username: req.body.username }).exec((error, data) => {
      if (data)
        return res.status(400).json({ error: "this username aready use" });
      const { firstName, lastName, email, password, username } = req.body;
      const hash_password = bcrypt.hashSync(password, 10);
      const add = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username,
      });
      add.save((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
          return res.status(201).json({ user });
        }
      });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error: "email invalid" });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const cookie = new Cookie(req, res);
      }
    }
  });
};
