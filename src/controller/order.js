const mongoose = require("mongoose");
const Cart = require("../model/cart");
const Product = require("../model/product");
const Order = require("../model/order");
const Address = require("../model/address");

exports.Addorder = (req, res) => {
  const { payload } = req.body;
  let total = 0;
  for (let data of payload.orderItems) {
    total += data.price;
  }
  const add = new Order({
    user: req.user._id,
    address: payload.address,
    orderItems: payload.orderItems,
    totalprice: total,
  });
  add.save((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      Cart.findOneAndDelete({ user: req.user._id }).exec(
        async (error, cart) => {
          if (error) return res.status(400).json({ error });
          if (cart) {
            let list = [];
            list = payload.orderItems.map((data) => {
              return { _id: data.product, quantity: data.quantity };
            });

            for (let data of list) {
              await Product.findOne({ _id: data._id }).exec(
                async (error, product) => {
                  if (product) {
                    await Product.findOneAndUpdate(
                      { _id: data._id },
                      { quantity: product.quantity - data.quantity },
                      { new: true }
                    );
                  }
                }
              );
            }
            return res.status(200).json({ message: "success" });
          }
        }
      );
    }
  });
};

exports.getOrder = (req, res) => {
  Order.find({})
    .select("_id user orderItems createdAt status address")
    .populate({ path: "user", select: "firstName lastName" })
    .populate({ path: "orderItems.product", select: "name picture" })
    .exec((error, order) => {
      if (error) return res.statu(400).json({ error });
      if (order) {
        return res.status(200).json({ order });
      }
    });
};

exports.changeStatus = (req, res) => {
  const { _id, status } = req.body.payload;
  Order.findOneAndUpdate(
    { _id: _id },
    { $set: { status: status } },
    { new: true }
  ).exec((error, status) => {
    if (error) return res.statu(400).json({ error });
    if (status) {
      return res.status(200).json({ status });
    }
  });
};

exports.getOrderHistory = (req, res) => {
  Order.find({ user: req.user._id })
    .select("orderItems status totalprice")
    .populate({ path: "orderItems.product", select: "name picture" })
    .sort([["updatedAt", "descending"]])
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        return res.status(200).json({ order });
      }
    });
};

// UPDATENEW FILED IN DATA BASE AND DELETE

// exports.updateStatus = (req, res) => {
//   Order.updateMany({}, { $unset: { test: "pending" } }, { multi: true }).exec(
//     (error, update) => {
//       if (error) return res.statu(400).json({ error });
//       if (update) {
//         return res.status(200).json({ update });
//       }
//     }
//   );
// };

// exports.updateStatus = (req, res) => {
//   Order.updateMany({}, { $set: { test: "pending" } }, { multi: true }).exec(
//     (error, update) => {
//       if (error) return res.statu(400).json({ error });
//       if (update) {
//         return res.status(200).json({ update });
//       }
//     }
//   );
// };
