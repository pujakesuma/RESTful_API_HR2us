'use strict';

const model = require('../models/companies');
const form = require('../helpers/form');

module.exports = {
    getCompanies: (req, res) => {
        model
            .getCompanies (req.query)
            .then (response => {
                form.success (res, response);
            })
            .catch (err => {
                console.log (err);
        });
    },
    addCompany: (req, res) => {
        const {body} = req;
        model
            .addCompany (body)
            .then (response => {
                const data = {
                    id: response.insertId,
                    'WELCOME! You are in as : ': body.username,
                };
                form.success (res, data);
            })
            .catch (err =>
                console.log (err)
            );
    },
    editCompany: (req, res) => {
        const {params, query} = req;
        model
            .editCompany (query, params)
            .then (response => {
                res.json (response);
            })
            .catch (err =>
                console.log (err)
            );
    },
    deleteCompany: (req, res) => {
        const {params} = req;
        model
            .deleteCompany(params)
            .then(response=>{
                res.json(response);
            })
            .catch(err=>
                console.log(err)
            );
    }
};
