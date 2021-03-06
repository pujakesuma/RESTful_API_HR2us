'use strict';

const express = require('express');
const Route = express.Router()

const auth = require('../controllers/userAuth')

Route
    .post('/register', auth.register) // http://localhost:5000/userAuth/register
    .post('/login', auth.login) // http://localhost:5000/userAuth/login

module.exports = Route;