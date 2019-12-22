'use strict';
const express = require('express');
const Route = express.Router()

const authCheck = require('../helpers/authCheck');
const engineers = require("../controllers/engineers");

Route
    //company routes
    .get('/', engineers.getEngineers) // http://localhost:3000/api/engineers
    .post('/', authCheck.engineersCheck, engineers.addEngineers) // http://localhost:3000/api/engineers
    .patch('/:id_engineer', authCheck.engineersCheck, engineers.editEngineers) // http://localhost:3000/api/engineers/:id
    .delete('/:id_engineer', authCheck.engineersCheck, engineers.deleteEngineers) // http://localhost:3000/api/engineers/:id

module.exports=Route;