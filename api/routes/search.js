'use strict';
const express = require('express');
const Route = express.Router()

const engineers = require("../controllers/search");

Route
    //company routes
    .get('/', engineers.getSearch)

module.exports=Route;