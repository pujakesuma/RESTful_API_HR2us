'use strict';
const express = require('express');
const Route = express.Router()

const engineers = require("../controllers/search");

Route
    .get('/', engineers.getSearch) // http://localhost:3000/api/search

module.exports=Route;