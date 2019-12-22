'use strict';

const model = require('../models/engineers');
const form = require('../helpers/form');

module.exports = {
    getEngineers: (req, res) => {
        model
            .getEngineers (req.query)
            .then (response => {
                form.success (res, response);
            })
            .catch (err => {
                console.log (err);
        });
    },
    addEngineers: (req, res) => {
        const {body} = req;
        model
            .addEngineers (body)
            .then (response => {
                const data = {
                    'WELCOME! You are in as : ': body.Name
                };
                form.success (res, data);
            })
            .catch (err =>
                console.log (err)
            );
    },
    editEngineers: (req, res) => {
        const {params, query} = req;
        model
            .editEngineers (query, params)
            .then (response => {
                res.json (response);
            })
            .catch (err =>
                console.log (err)
            );
    },
    deleteEngineers: (req, res) => {
        const {params} = req;
        model
            .deleteEngineers(params)
            .then(response=>{
                res.json(response);
            })
            .catch(err=>
                console.log(err)
            );
    }
};

