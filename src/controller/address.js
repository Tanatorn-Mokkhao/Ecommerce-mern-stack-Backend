const Address = require("../model/address");
const user = require("../model/user");

exports.createAddress = (req, res) => {
  const { payload } = req.body;
  Address.findOneAndUpdate(
    { user: req.user._id },
    {
      $push: {
        address: payload,
      },
    },
    { new: true, upsert: true }
  ).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      return res.status(200).json({ address });
    }
  });
};

exports.deleteAddress = (req, res) => {
  const { id } = req.body;
  Address.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { address: { _id: id } } },
    { new: true }
  ).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      return res.status(200).json({ address });
    }
  });
};

exports.editAddress = (req, res) => {
  const { payload } = req.body;
  Address.findOneAndUpdate(
    { user: req.user._id, "address._id": payload._id },
    { $set: { address: payload } },
    { new: true }
  ).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      return res.status(200).json({ address });
    }
  });
};

exports.getAddress = (req, res) => {
  Address.findOne({ user: req.user._id }).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      return res.status(200).json({ address });
    }
  });
};
