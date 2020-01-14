'use strict';

require('dotenv').config()
const uuidv4 = require('uuid/v4');
const model = require('../models/userAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register : (req, res) => {
        const id = uuidv4().split('-')[0]
        const {name, email, role} = req.body
        const {date_updated, date_created} = Date.now()
        const password = bcrypt.hashSync(req.body.password, 8)
        const data = {id, email, password, role}
        const dataEngineer = {id, name, email, date_created, date_updated}
        const dataCompany = {id, name, email}
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
                message : 'Email Required'
            })
        }else{
            model.getUser(email,role)
            .then(response =>{
                console.log('respon ' + response)
                let validPassword = bcrypt.compareSync(password, response[0].password)
                console.log('pass' + validPassword)
                if(!validPassword){
                    res.json({
                        message:'Invalid Password!'
                    })
                }else{
                    
                    jwt.sign({response}, process.env.SECRET_KEY, {expiresIn: '1d'}, (err, token) =>{
                        
                        res.json({
                            message:'Login Success!',
                            data: response[0],
                            token
                        })
                    })
                }
            })
            .catch(err =>{
                console.log('Catch')
                res.json({
                    err
                })
            })
        }
    }
}