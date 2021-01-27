const express = require("express");
const { requiresignin } = require("../common-middleware");
const { signup, signin, signout } = require("../controller/auth");

const router = express.Router();

router.post("/user/signiup", signup);

router.post("/user/signin", signin);

router.post("/user/signout", requiresignin, signout);

module.exports = router;
