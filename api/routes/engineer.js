'use strict';
const express = require('express');
const Route = express.Router()

const authCheck = require('../helpers/authCheck');
const engineers = require("../controllers/engineers");

Route
    //company routes
    .get('/', engineers.getEngineers)
    .post('/', authCheck.engineersCheck, engineers.addEngineers)
    .patch('/:id_engineer', authCheck.engineersCheck, engineers.editEngineers)
    .delete('/:id_engineer', authCheck.engineersCheck, engineers.deleteEngineers)

module.exports=Route;