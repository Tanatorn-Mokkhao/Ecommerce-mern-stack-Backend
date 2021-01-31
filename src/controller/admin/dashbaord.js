const Order = require("../../model/order");

// exports.queryRevenueByDate = (req, res) => {
//   const { fromdate, todate } = req.body.payload;
//   console.log(fromdate, todate);
//   if (fromdate == todate) {
//     console.log("equal");
//     Order.find({
//       createdAt: { $lteq: "2021-01-28" },
//     }).exec((error, query) => {
//       if (error) return res.status(400).json({ error });
//       if (query) {
//         let totoalIncome = 0;
//         for (let data of query) {
//           totoalIncome += data.totalprice;
//         }
//         return res.status(200).json({ revenue: totoalIncome });
//       }
//     });
//   } else {
//     Order.find({
//       createdAt: { $gte: fromdate, $lte: todate },
//     }).exec((error, query) => {
//       if (error) return res.status(400).json({ error });
//       if (query) {
//         let totoalIncome = 0;
//         for (let data of query) {
//           totoalIncome += data.totalprice;
//         }
//         return res.status(200).json({ revenue: totoalIncome });
//       }
//     });
//   }
// };

exports.queryRevenueByDate = (req, res) => {
  const { fromdate, todate } = req.body.payload;
  Order.find({
    createdAt: { $gte: fromdate, $lt: todate },
  }).exec((error, query) => {
    if (error) return res.status(400).json({ error });
    if (query) {
      let totoalIncome = 0;
      for (let data of query) {
        totoalIncome += data.totalprice;
      }
      return res.status(200).json({ revenue: totoalIncome });
    }
  });
};

// exports.getFilter = (req, res) => {
//   Order.aggregate([{ $match: { status: "pending" } }]).exec((error, date) => {
//     if (error) return res.status(400).json({ error });
//     if (date) {
//       return res.status(200).json({ date });
//     }
//   });
// };

// exports.getFilter = (req, res) => {
//   Order.aggregate([
//     { $match: { status: "pending" } },
//     { $group: { _id: "$status", totalscore: { $sum: "$totalprice" } } },
//   ]).exec((error, date) => {
//     if (error) return res.status(400).json({ error });
//     if (date) {
//       return res.status(200).json({ date });
//     }
//   });
// };

// exports.getFilter = (req, res) => {
//   Order.aggregate([
//     { $group: { _id: "$status", totalscore: { $sum: "$totalprice" } } },
//   ]).exec((error, date) => {
//     if (error) return res.status(400).json({ error });
//     if (date) {
//       return res.status(200).json({ date });
//     }
//   });
// };

// exports.getFilter = (req, res) => {
//   Order.aggregate([
//     { $group: { _id: "$createdAt", totalscore: { $sum: "$totalprice" } } },
//   ]).exec((error, date) => {
//     if (error) return res.status(400).json({ error });
//     if (date) {
//       return res.status(200).json({ date });
//     }
//   });
// };

exports.getFilter = (req, res) => {
  Order.aggregate([
    { $project: { _id: 0, year: { $year: "$createdAt" } } },
    { $group: { _id: "$year" } },
    { $sort: { _id: -1 } },
  ]).exec((error, filter) => {
    if (error) return res.status(400).json({ error });
    if (filter) {
      return res.status(200).json({ filter });
    }
  });
};

// exports.getPrivotRevenue = (req, res) => {
//   Order.aggregate([
//     {
//       $project: {
//         _id: 0,
//         month: { $month: "$createdAt" },
//         total: "$totalprice",
//       },
//     },
//     { $group: { _id: "$month", totalsale: { $sum: "$total" } } },
//   ]).exec((error, date) => {
//     if (error) return res.status(400).json({ error });
//     if (date) {
//       return res.status(200).json({ date });
//     }
//   });
// };

// exports.getPrivotRevenue = (req, res) => {
//   Order.find({ createdAt: { $year: "$createdAt","2021" }})
//     .exec((error, date) => {
//     if (error) return res.status(400).json({ error });
//     if (date) {
//       return res.status(200).json({ date });
//     }
//   });
// };

exports.getPrivotRevenue = (req, res) => {
  Order.aggregate([
    {
      $project: {
        _id: 0,
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        total: "$totalprice",
      },
    },
    {
      $group: {
        _id: { year: "$year", month: "$month" },
        totalsale: { $sum: "$total" },
      },
    },
    {
      $match: { "_id.year": parseInt(req.body.year) },
    },
    {
      $sort: { "_id.month": 1 },
    },
  ]).exec((error, privot) => {
    if (error) return res.status(400).json({ error });
    if (privot) {
      return res.status(200).json({ privot });
    }
  });
};
