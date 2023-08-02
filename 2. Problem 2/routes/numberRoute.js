const express = require("express");

const router = express.Router();
const numberController = require("../controllers/numberController");

router.get('/number', numberController.calculate)

module.exports = router;