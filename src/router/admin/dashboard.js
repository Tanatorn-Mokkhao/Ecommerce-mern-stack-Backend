const express = require("express");
const { queryRevenueByDate } = require("../../controller/admin/dashbaord");

const router = express.Router();

router.post("/get/dashboard", queryRevenueByDate);

module.exports = router;
