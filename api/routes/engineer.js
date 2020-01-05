'use strict';
const express = require('express');
const Route = express.Router()

const authCheck = require('../helpers/authCheck');
const engineers = require("../controllers/engineers");

Route
    //company routes
    .get('/', engineers.getEngineers) // http://localhost:5000/api/engineers
    .get('/:id', engineers.getEngineer)
    .post('/', authCheck.engineersCheck, engineers.addEngineers) // http://localhost:5000/api/engineers
    .patch('/:id', authCheck.engineersCheck, engineers.editEngineers) // http://localhost:5000/api/engineers/:id
    .delete('/:id', authCheck.engineersCheck, engineers.deleteEngineers) // http://localhost:5000/api/engineers/:id

module.exports=Route;