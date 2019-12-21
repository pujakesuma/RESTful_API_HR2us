'use strict';

const model = require('../models/skill');
const form = require('../helpers/form');

//GET
module.exports = {
    getSkill: (_, res) => {
        model
            .getSkill ()
            .then (response => {
          //resolve
                form.success (res, response);
            })
            .catch (err => {
          //reject
                console.log (err);
        });
    },
    addSkill: (req, res) => {
        const {body} = req;
        model
            .addSkill (body)
            .then (response => {
          // resolve
                const data = {
                    id: response.insertId,
                    username: body.username,
                };
                form.success (res, data);
            })
            .catch (err =>
          // reject
                console.log (err)
            );
    },
    editSkill: (req, res) => {
        const {params, query} = req;
        model
            .editSkill (query, params)
            .then (response => {
          //resolve
                res.json (response);
            })
            .catch (err =>
          //reject
                console.log (err)
            );
    },
    deleteSkill: (req, res) => {
        const {params} = req;
        model
            .deleteSkill(params)
            .then(response=>{
                res.json(response);
            })
            .catch(err=>
                console.log(err)
            );
    }
};

