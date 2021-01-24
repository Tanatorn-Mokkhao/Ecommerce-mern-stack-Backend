const express = require("express");
const { getInitialData } = require("../controller/initialData");
const router = express.Router();

router.post("/initial/category", getInitialData);

module.exports = router;
