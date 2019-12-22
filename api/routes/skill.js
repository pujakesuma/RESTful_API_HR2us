'use strict';
const express = require('express');
const Route = express.Router()

const engineers = require("../controllers/skill");

Route
    .get('/', engineers.getSkill) // http://localhost:3000/api/skill
    .post('/', engineers.addSkill) // http://localhost:3000/api/skill
    .patch('/:id_skill', engineers.editSkill) // http://localhost:3000/api/skill/:id_skill
    .delete('/:id_skill', engineers.deleteSkill) //http://localhost:3000/api/skill/:id_skill

module.exports=Route;