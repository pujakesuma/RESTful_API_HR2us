'use strict';

const model = require('../models/search');
const form = require('../helpers/form');

//GET
module.exports = {
    getSearch: (_, res) => {
        model
            .getSearch ()
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