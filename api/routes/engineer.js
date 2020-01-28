'use strict';
const express = require('express');
const Route = express.Router()

const authCheck = require('../helpers/authCheck');
const engineers = require("../controllers/engineers");

Route
    //company routes
    .get('/', engineers.getEngineers)
    .get('/:id', engineers.getEngineer)
    .post('/', authCheck.engineersCheck, engineers.addEngineers)
    .patch('/:id', authCheck.engineersCheck, engineers.editEngineers)
    .delete('/:id', authCheck.engineersCheck, engineers.deleteEngineers)

module.exports=Route;