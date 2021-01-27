const exrpress = require("express");
const { requiresignin, userMiddlerware } = require("../common-middleware");
const {
  addToCart,
  getCart,
  deleteProductInCart,
} = require("../controller/cart");

const router = exrpress.Router();

router.post("/add/cart", requiresignin, userMiddlerware, addToCart);

router.post("/get/cart", requiresignin, userMiddlerware, getCart);

router.post(
  "/delete/item/cart",
  requiresignin,
  userMiddlerware,
  deleteProductInCart
);

module.exports = router;
