const app = require("./app.js")
const dotenv = require("dotenv");

const PORT = 8000;

dotenv.config({path: './config.env'})
// start the server
app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log(`App started at server ${PORT}`);
})