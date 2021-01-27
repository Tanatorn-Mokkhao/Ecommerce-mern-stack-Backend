const Cart = require("../model/cart");

exports.addToCart = (req, res) => {
  const { cart } = req.body;
  console.log(cart);
  Cart.findOne({ user: req.user._id }).exec((error, cartItems) => {
    if (error) return res.status(400).json({ error });
    if (cartItems) {
      const items = cartItems.cart.find((data) => data.product == cart.product);

      if (items) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cart.product": cart.product },
          {
            $set: {
              "cart.$": {
                ...cart,
                quantity: items.quantity + cart.quantity,
                price: items.price + cart.price,
              },
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          if (cart) {
            return res.status(200).json({ cart });
          }
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          { $push: { cart: { ...cart } } },
          { new: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          if (cart) {
            return res.status(200).json({ cart });
          }
        });
      }
    } else {
      const add = new Cart({
        user: req.user._id,
        cart: cart,
      });
      add.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(200).json({ cart });
        }
      });
    }
  });
};

exports.getCart = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .select("user cart")
    .populate({ path: "cart.product", select: "_id name picture" })
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        // console.log(cart.cart.length);
        return res.status(200).json({ cart });
      } else {
        return res.status(202).json({ cart });
      }
    });
};

exports.deleteProductInCart = (req, res) => {
  const { productid } = req.body;
  Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cart: { product: productid } } },
    { new: true }
  ).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      if (cart.cart.length == 0) {
        Cart.findOneAndDelete({ user: req.user._id }).exec((error, cart1) => {
          return res.status(200).json({ cart1 });
        });
      } else {
        return res.status(200).json({ cart });
      }
    }
  });
};
