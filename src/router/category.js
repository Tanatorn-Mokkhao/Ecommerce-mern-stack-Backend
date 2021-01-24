const express = require("express");
const { requiresignin, adminMoiddleware } = require("../common-middleware");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const router = express.Router();

router.post(
  "/create/category",
  requiresignin,
  adminMoiddleware,
  createCategory
);
router.post(
  "/update/category",
  requiresignin,
  adminMoiddleware,
  updateCategory
);

router.post("/get/category", getCategory);

router.post("/delete/category", deleteCategory);

module.exports = router;
