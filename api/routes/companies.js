'use strict';
const express = require('express');
const Route = express.Router()

const authCheck = require('../helpers/authCheck')
const company = require("../controllers/companies");

Route
    //company routes
    .get('/', company.getCompanies) // http://localhost:3000/api/companies/
    .post('/', authCheck.companyCheck, company.addCompany) // http://localhost:3000/api/companies/
    .patch('/:id', authCheck.companyCheck, company.editCompany) // http://localhost:3000/api/companies/:id
    .delete('/:id', authCheck.companyCheck, company.deleteCompany) // http://localhost:3000/api/companies/

module.exports=Route;