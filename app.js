require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./api/routes/index");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


app.use(bodyParser.json());

app.use('/', routes);

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and Running on PORT:", process.env.APP_PORT);
});

module.exports = app;