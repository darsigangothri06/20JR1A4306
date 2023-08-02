const express = require("express");

const trainController = require("../controllers/trainController.js")
const router = express.Router();

// auth
router.use(trainController.protectRoute);
router.get('/getAllTrains', trainController.getAllTrains);
router.get('/:id', trainController.getTrainById);

module.exports = router;