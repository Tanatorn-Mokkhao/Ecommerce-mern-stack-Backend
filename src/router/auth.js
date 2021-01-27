const express = require("express");
const { requiresignin } = require("../common-middleware");
const { signup, signin, signout } = require("../controller/auth");
const {
  validationsignin,
  isRequestValidated,
  validationsignup,
} = require("../validator/auth");

const router = express.Router();

router.post("/user/signup", validationsignup, isRequestValidated, signup);

router.post("/user/signin", validationsignin, isRequestValidated, signin);

router.post("/user/signout", requiresignin, signout);

module.exports = router;
