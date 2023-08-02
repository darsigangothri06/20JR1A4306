const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const trainRoutes = require("./routes/trainRoutes.js")
// create express app
const app = express();

// get the body data
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/trains', trainRoutes);
const port = 8000;



module.exports = app;