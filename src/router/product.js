const express = require("express");
const { requiresignin, adminMoiddleware } = require("../common-middleware");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
  createProduct,
  getProduct,
  deleteProduct,
  getProductsByslug,
  getAllProduct,
} = require("../controller/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/create/product",
  requiresignin,
  adminMoiddleware,
  upload.array("productPictures"),
  createProduct
);

router.post("/get/product", getProduct);

router.post("/delete/product", deleteProduct);

router.post("/product/:slug", getProductsByslug);

router.post("/get/all/product", getAllProduct);

module.exports = router;
