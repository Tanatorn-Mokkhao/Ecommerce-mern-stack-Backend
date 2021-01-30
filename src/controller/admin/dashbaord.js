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
