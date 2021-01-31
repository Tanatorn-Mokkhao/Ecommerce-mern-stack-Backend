const express = require("express");
const {
  queryRevenueByDate,
  getFilter,
  getPrivotRevenue,
} = require("../../controller/admin/dashbaord");

const router = express.Router();

router.post("/get/dashboard", queryRevenueByDate);

router.post("/get/filter", getFilter);

router.post("/get/privot", getPrivotRevenue);

module.exports = router;
