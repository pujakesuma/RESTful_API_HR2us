require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./api/routes/index");
const cors = require("cors");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('./public'))

app.use('/', routes); //route localhost:3000/../..
app.listen(process.env.PORT, () => {
    console.log("Server up and Running on PORT:", process.env.APP_PORT);
});

module.exports = app;