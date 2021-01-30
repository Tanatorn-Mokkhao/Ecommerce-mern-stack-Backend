const express = require("express");
const { requiresignin, userMiddlerware } = require("../common-middleware");
const {
  Addorder,
  getOrder,
  changeStatus,
  getOrderHistory,
} = require("../controller/order");

const router = express.Router();

router.post("/add/order", requiresignin, userMiddlerware, Addorder);

router.post("/get/order", getOrder);

router.post("/change/status", changeStatus);

router.post(
  "/get/orderHistory",
  requiresignin,
  userMiddlerware,
  getOrderHistory
);

// router.post("/update/status", updateStatus);

module.exports = router;
