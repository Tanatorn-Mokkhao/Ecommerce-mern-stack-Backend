const express = require("express");
const { requiresignin, userMiddlerware } = require("../common-middleware");
const {
  createAddress,
  deleteAddress,
  editAddress,
  getAddress,
} = require("../controller/address");
const router = express.Router();

router.post("/create/address", requiresignin, userMiddlerware, createAddress);

router.post("/delete/address", requiresignin, userMiddlerware, deleteAddress);

router.post("/edit/address", requiresignin, userMiddlerware, editAddress);

router.post("/get/address", requiresignin, userMiddlerware, getAddress);

module.exports = router;
