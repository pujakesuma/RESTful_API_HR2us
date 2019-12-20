const express = require('express');
const Route = express.Router();

const companies = require('./companies');
const engineers = require('./engineer');
const search = require('./search');
const skill = require('./skill');
const auth = require('./userAuth');

Route.use('/api/companies', companies);
Route.use('/api/engineers', engineers);
Route.use('/api/search', search);
Route.use('/api/skill', skill);
Route.use('/userAuth', auth);

module.exports = Route;