const express = require("express");
const { requiresignin } = require("../../common-middleware");
const { signup, signin, signout } = require("../../controller/admin/auth");
const {
  validationsignin,
  isRequestValidated,
  validationsignup,
} = require("../../validator/auth");

const router = express.Router();

router.post("/admin/signup", validationsignup, isRequestValidated, signup);

router.post("/admin/signin", validationsignin, isRequestValidated, signin);

router.post("/admin/signout", requiresignin, signout);

module.exports = router;
