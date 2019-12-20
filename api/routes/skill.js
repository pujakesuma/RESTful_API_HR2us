'use strict';
const express = require('express');
const Route = express.Router()

const engineers = require("../controllers/skill");

Route
    //company routes
    .get('/', engineers.getSkill)
    .post('/', engineers.addSkill)
    .patch('/:id_skill', engineers.editSkill)
    .delete('/:id_skill', engineers.deleteSkill)

module.exports=Route;