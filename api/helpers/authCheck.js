require("dotenv").config();

const jwt = require('jsonwebtoken');

module.exports = {
    engineersCheck : (req, res, next) => {
        const {authorization, username} = req.headers
        if(!authorization || !username){
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
            if(username !== decoded.response[0].username){
                return res.status(403).json({
                    message: 'Token is not Valid for username'
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
        const { authorization, username } = req.headers
        if(!authorization || !username){
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
            if(username !== decoded.result[0].username){
                return res.status(403).json({
                    message: 'Token is not Valid for username'
                })
            }
            if(decoded.result[0].role !== 'company'){
                return res.status(403).json({
                    message: 'Access Denied'
                })
            }
            next()
        })
    }
}