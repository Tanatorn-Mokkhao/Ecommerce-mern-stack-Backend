const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// const { requiresignin } = require("./src/common-middleware/");
// const userRoutes = require("./src/router/auth");
const adminRoutes = require("./src/router/admin/auth");

const app = express();
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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
// app.use("/api", userRoutes);
app.use("/api", adminRoutes);

// app.get("/", (req, res) => {
//   const token = jwt.sign(
//     { _id: "123456", role: "user" },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );
//   res
//     .status(202)
//     .cookie("token", token, {
//       sameSite: "strict",
//       path: "/",
//       expires: new Date(new Date().getTime() + 5 * 1000),
//       httpOnly: true,
//       // secure: true,
//     })
//     .send("Cookiebeing initialsed");
// });

// app.get("/deletecookie", requiresignin, (req, res) => {
//   console.log(req.cookies);
//   res.status(202).clearCookie("token").send("cookies cleared");
// });

app.listen(process.env.PORT, () => {
  console.log("server is running on poart", process.env.PORT);
});