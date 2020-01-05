require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./api/routes/index");
const cors = require("cors");
const helmet = require("helmet")
const PORT = process.env.PORT

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.use(cors());
app.use(helmet.xssFilter());

app.use(express.static('./public'))

app.use('/', routes); //route localhost:3000/../..
app.listen( PORT, () => {
    console.log("Server up and Running on PORT:", {PORT} );
});

module.exports = app;