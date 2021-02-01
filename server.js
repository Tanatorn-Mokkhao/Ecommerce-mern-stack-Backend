const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const userRoutes = require("./src/router/auth");
const adminRoutes = require("./src/router/admin/auth");
const categoryRoutes = require("./src/router/category");
const initialRoutes = require("./src/router/initialData");
const productRoutes = require("./src/router/product");
const cartRoutes = require("./src/router/cart");
const addressRoutes = require("./src/router/address");
const orderRoutes = require("./src/router/order");
const dashBoardRoutes = require("./src/router/admin/dashboard");

env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3xwdm.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Connected database");
  });

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3006"],
  })
);

app.use(cookieParser());
app.use("/api", userRoutes);
app.use("/public", express.static(__dirname + "/src/uploads"));
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", initialRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", dashBoardRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log("server is running on poart", process.env.PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3006"],
    credentials: true,
  },
});

const Order = require("./src/model/order");

const changeStream = Order.watch();

changeStream.on("change", (change) => {
  console.log(change); // You could parse out the needed info and send only that data.
  io.emit("changeData");
});

// changeStream.on("change", (change) => {
//   console.log(change); // You could parse out the needed info and send only that data.
//   Test.find({}).exec((error, data) => {
//     if (data) {
//       io.emit("changeData", data);
//     }
//   });
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const env = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const app = express();
// // const jwt = require("jsonwebtoken");
// // const { requiresignin } = require("./src/common-middleware/");
// // const http = require("http").createServer(app);
// // const io = require("socket.io")(http);
// ////////////////////////////////////////////////
// const userRoutes = require("./src/router/auth");
// const adminRoutes = require("./src/router/admin/auth");
// const categoryRoutes = require("./src/router/category");
// const initialRoutes = require("./src/router/initialData");
// const productRoutes = require("./src/router/product");
// const cartRoutes = require("./src/router/cart");
// const addressRoutes = require("./src/router/address");
// const orderRoutes = require("./src/router/order");
// const dashBoardRoutes = require("./src/router/admin/dashboard");

// env.config();

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3xwdm.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected database");
//   });

// app.use(express.json());

// // const io = require("socket.io")(http, {
// //   cors: {
// //     origin: ["http://localhost:3000", "http://localhost:3006"],
// //     credentials: true,
// //   },
// // });

// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3000", "http://localhost:3006"],
//   })
// );

// // io.on("connection", (data) => {
// //   console.log("user connected");
// //   app.use("/api", userRoutes);

// //   data.on("disconnect", () => {
// //     console.log("user disconnect");
// //   });
// // });

// app.use(cookieParser());
// app.use("/api", userRoutes);
// app.use("/public", express.static(__dirname + "/src/uploads"));
// app.use("/api", adminRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", initialRoutes);
// app.use("/api", productRoutes);
// app.use("/api", cartRoutes);
// app.use("/api", addressRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", dashBoardRoutes);

// //http only cookie
// // app.get("/", (req, res) => {
// //   const token = jwt.sign(
// //     { _id: "123456", role: "user" },
// //     process.env.JWT_SECRET,
// //     { expiresIn: "1d" }
// //   );
// //   res
// //     .status(202)
// //     .cookie("token", token, {
// //       sameSite: "strict",
// //       path: "/",
// //       expires: new Date(new Date().getTime() + 5 * 1000),
// //       httpOnly: true,
// //       // secure: true,
// //     })
// //     .send("Cookiebeing initialsed");
// // });

// // app.get("/deletecookie", requiresignin, (req, res) => {
// //   console.log(req.cookies);
// //   res.status(202).clearCookie("token").send("cookies cleared");
// // });

// // http.listen(process.env.PORT, () => {
// //   console.log("server is running on port", process.env.PORT);
// // });

// // use with no socket

// app.listen(process.env.PORT, () => {
//   console.log("server is running on poart", process.env.PORT);
// });
