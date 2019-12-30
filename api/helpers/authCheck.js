require("dotenv").config();

const jwt = require('jsonwebtoken');

module.exports = {
    engineersCheck : (req, res, next) => {
        const {authorization, email} = req.headers
        if(!authorization || !email){
            return res.status(404).json({
                message: 'Unauthorized'
            })
        }
        const token = authorization.split(" ")[1]
        //decode JWT and Validation
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err && err.name === 'JsonWebTokenError'){
                return res.status(403).json({
                    message: 'Invalid Token'
                })
            }
            if(err && err.name === 'TokenExpiredError'){
                return res.status(403).json({
                    message: 'Expired Token'
                })
            }

            //check if token registered with correct username
            if(email !== decoded.response[0].email){
                return res.status(403).json({
                    message: 'Token is not Valid for email'
                })
            }
            if(decoded.response[0].role !== 'engineer'){
                return res.status(403).json({
                    message: 'Access Denied'
                })
            }
            next()
        })
    },
    companyCheck : (req, res, next)=>{
        const { authorization, email } = req.headers
        if(!authorization || !email){
            return res.status(404).json({
                message: 'Unauthorized'
            })
        }
        const token = authorization.split(" ")[1]
        //decode JWT and Validation
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err && err.name === 'JsonWebTokenError'){
                return res.status(403).json({
                    message: 'Invalid Token'
                })
            }
            if(err && err.name === 'TokenExpiredError'){
                return res.status(403).json({
                    message: 'Expired Token'
                })
            }

            //check if token registered with correct username
            if(email !== decoded.response[0].email){
                return res.status(403).json({
                    message: 'Token is not Valid for email'
                })
            }
            if(decoded.response[0].role !== 'company'){
                return res.status(403).json({
                    message: 'Access Denied'
                })
            }
            next()
        })
    }
}