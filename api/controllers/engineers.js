'use strict';

const model = require('../models/engineers');
const form = require('../helpers/form');

module.exports = {
    getEngineers: (req, res) => {
        model
            .getEngineers (req.query)
            .then (response => {
          //resolve
                form.success (res, response);
            })
            .catch (err => {
          //reject
                console.log (err);
        });
    },
    addEngineers: (req, res) => {
        const {body} = req;
        model
            .addEngineers (body)
            .then (response => {
          // resolve
                const data = {
                    'data has been added': body.Name
                };
                form.success (res, data);
            })
            .catch (err =>
          // reject
                console.log (err)
            );
    },
    editEngineers: (req, res) => {
        const {params, query} = req;
      // res.json ({
      //   params,
      //   query,
      // });
        model
            .editEngineers (query, params)
            .then (response => {
          //resolve
                res.json (response);
            })
            .catch (err =>
          //reject
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

