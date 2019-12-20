'use strict';

const express = require('express');
const Route = express.Router()

const auth = require('../controllers/userAuth')

Route
    .post('/register', auth.register)
    .post('/login', auth.login)

module.exports = Route;