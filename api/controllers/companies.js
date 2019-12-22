'use strict';

const model = require('../models/companies');
const form = require('../helpers/form');

//GET
module.exports = {
    getCompanies: (req, res) => {
        model
            .getCompanies (req.query)
            .then (response => {
          //resolve
                form.success (res, response);
            })
            .catch (err => {
          //reject
                console.log (err);
        });
    },
    addCompany: (req, res) => {
        const {body} = req;
        model
            .addCompany (body)
            .then (response => {
          // resolve
                const data = {
                    id: response.insertId,
                    'data has been added by': body.username,
                };
                form.success (res, data);
            })
            .catch (err =>
          // reject
                console.log (err)
            );
    },
    editCompany: (req, res) => {
        const {params, query} = req;
      // res.json ({
      //   params,
      //   query,
      // });
        model
            .editCompany (query, params)
            .then (response => {
          //resolve
                res.json (response);
            })
            .catch (err =>
          //reject
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

//DELETE
