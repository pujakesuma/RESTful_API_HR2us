'use strict';

const model = require('../models/search');
const form = require('../helpers/form');

//GET
module.exports = {
    getSearch: (req, res) => {
        const {query} = req
        model
            .getSearch (query)
            .then (response => {
          //resolve
                form.success (res, response);
            })
            .catch (err => {
          //reject
                console.log (err);
        });
    },
};