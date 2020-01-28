'use strict';
const express = require('express');
const Route = express.Router()

const authCheck = require('../helpers/authCheck')
const company = require("../controllers/companies");

Route
    //company routes
    .get('/:id', company.getCompany)
    .get('/', company.getCompanies) 
    .post('/', authCheck.companyCheck, company.addCompany) 
    .patch('/:id', authCheck.companyCheck, company.editCompany)
    .delete('/:id', authCheck.companyCheck, company.deleteCompany) 

module.exports=Route;