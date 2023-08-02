const express = require("express");
const numberRoutes = require("./routes/numberRoute")
const app = express();

app.use('', numberRoutes);

app.listen(8000, () => {
    console.log(`App running on port 8000`)
})