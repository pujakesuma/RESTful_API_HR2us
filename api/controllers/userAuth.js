'use strict';

require('dotenv').config()
const model = require('../models/userAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register : (req, res) => {
        const {name, email, role} = req.body
        const {date_updated, date_created} = Date.now()
        const password = bcrypt.hashSync(req.body.password, 8)
        const data = {email, password, role}
        const dataEngineer = {name, email, date_created, date_updated}
        const dataCompany = {name, email}
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(regex.test(email)){
            model.register(data, dataEngineer, dataCompany)
            .then(response=>{
                console.log(response)
                res.status(200).json({
                    error: false,
                    message: response
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error: true,
                    message: err
                })
            })
        }else{
            res.json({
                error: true,
                message: 'Invalid Email!'
            })
        }
    },
    login : (req, res) => {
        const email = req.body.email
        const password = req.body.password?req.body.password:''
        const role = req.body.role
        console.log(req.body)
        if(!email){
            res.json({
                message : 'Email Required!'
            })
        }else{
            model.getUser(email,role)
            .then(response =>{
                console.log(response)
                let validPassword = bcrypt.compareSync(password, response[0].password)
                console.log(validPassword)
                if(!validPassword){
                    res.json({
                        message:'Invalid Password!'
                    })
                }else{
                    
                    jwt.sign({response}, process.env.SECRET_KEY, {expiresIn: '1d'}, (err, token) =>{
                        
                        res.json({
                            message:'You are in!',
                            email: response[0].email,
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