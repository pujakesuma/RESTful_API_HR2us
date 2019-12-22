'use strict';

require('dotenv').config()
const model = require('../models/userAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register : (req, res) => {
        const {body} = req;
        const regExp = /^[a-z]{6,}$/.test(body.username);
        const password = bcrypt.hashSync(body.password, 8)
        if (regExp == true){
            model.register(req,body.username,password,body.role)
            .then(response => {
                res.status(200).json({
                    error: false,
                    message: response
                })
            })
            .catch(err => {
                res.status(400).json({
                    error: true,
                    message: err
                })
            })
        }else{
            res.json({
                error: true,
                message: 'Invalid Username!'
            })
        }
    },
    login : (req, res) => {
        const username = req.body.username
        const password = req.body.password?req.body.password:''
        const role = req.body.role
        console.log(req.body)
        if(!username){
            res.json({
                message : 'Username Required!'
            })
        }else{
            model.getUser(username,role)
            .then(response =>{
                console.log(response)
                let validPassword = bcrypt.compareSync(password, response[0].password)
                console.log(validPassword)
                if(!validPassword){
                    res.json({
                        message:'Invalid Password!'
                    })
                }else{
                    
                    jwt.sign({response}, process.env.SECRET_KEY, {expiresIn: '7h'}, (err, token) =>{
                        
                        res.json({
                            message:'You are in!',
                            username: response[0].username,
                            role: response[0].role,
                            token
                        })
                    })
                }
            })
            .catch(err =>{
                res.json({
                    message: err
                })
            })
        }
    }
}