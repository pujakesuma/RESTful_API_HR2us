'use strict';

const model = require('../models/engineers');
const uuidv4 = require('uuid/v4');
const form = require('../helpers/form');
const multer = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')

const storage = multer.diskStorage({
    destination: './public/uploads/engineers',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//initialize upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1*1024*1024
    },
    fileFilter: helpers.imageFilter
}).single('photo')

module.exports = {
    getEngineer: (req, res)=>{
        let id = req.params.id
        model.getEngineer(id)
            .then(response=>{
                res.status(200).json({
                    error: false,
                    response
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error:true,
                    err
                })
            })
    },
    getEngineers: (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const offset = (page-1)*limit
        const sort = req.query.sort ? req.query.sort : 'name'
        const order = req.query.order || 'asc'
        const name = req.query.name
        const skill = req.query.skill
        let condition = ''
        let url = req.originalUrl

        if(!name){
            condition = "where skill like '%"+skill+"%' order by "+sort+" "+order
        }
        if(!skill){
            condition = "where name like '%"+name+"%' order by "+sort+" "+order
        }
        if(name && skill){
            condition = "where name like '%"+name+"%' or skill like '%"+skill+"%' order by "+sort+" "+order
        }
        if(!name && !skill){
            condition = "order by "+sort+" "+order
        }

        let nextPage = 'http://localhost:5000/'+url.replace(`page=${page}`, 'page='+parseInt(page+1))
        let prevPage = 'http://localhost:5000/'+url.replace(`page=${page}`, 'page='+parseInt(page-1))
        
        model
            .getEngineers (limit, offset, condition)
            .then (response => {
                let pageTotal = response.dataTotal%limit===0?response.dataTotal/limit:Math.floor((response.dataTotal/limit)+1)
                if(page>pageTotal || page===0){
                    return res.status(200).json({
                        error: true,
                        message: '404 Page Not Found',
                        page,
                        limit,
                        totalData: response.dataTotal,
                        totalPage: pageTotal,
                        response
                    })
                }else if(page===1&&pageTotal!==1){
                    return res.status(200).json({
                        error: false,
                        page,
                        nextPage,
                        limit,
                        totalData: response.dataTotal,
                        totalPage: pageTotal,
                        response
                    })
                }else if(page===pageTotal&&pageTotal!==1){
                    return res.status(200).json({
                        error: false,
                        page,
                        prevPage ,
                        limit,
                        totalData: response.dataTotal,
                        totalPage: pageTotal,
                        response
                    })
                }else if(pageTotal===1){
                    return res.status(200).json({
                        error: false,
                        page,
                        limit,
                        totalData: response.dataTotal,
                        totalPage: pageTotal,
                        response
                    })
                }else{
                    return res.status(200).json({
                        error: false,
                        page,
                        nextPage,
                        prevPage,
                        limit,
                        totalData: response.dataTotal,
                        totalPage: pageTotal,
                        response
                    })
                }
            })
            .catch (err => {
                return res.status(400).json({
                    error: true,
                    message: err
            })
        });
    },
    addEngineers: (req, res) => {
        upload(req, res, (err) => {
            if(req.fileValidationError){
                res.status(400).json({
                    error : true,
                    message: 'Only image files are allowed!'
                })
            }else if(err){
                res.status(400).json({
                    message: err
                })
            }else{
                const {name, description, skill, location, date_of_birth, email, expected_salary, showcase} = req.body
                const id = uuidv4().split('-')[0]
                const photo = req.file ? req.file.filename : req.file
                const {date_created, date_updated} = new Date()
                const data = {id, name, photo, description, skill, location, date_of_birth, showcase, date_created, date_updated, email, expected_salary}
                model
                    .addEngineers (data)
                    .then (response => {
                        res.status(200).json({
                            error: false,
                            message: response
                        })
                    })
                    .catch (err =>{
                        res.status(400).json({
                            error: true,
                            message: err
                        })
                    })
                }
            })
    },
    editEngineers: (req, res) => {
        upload(req, res, (err)=>{
            if(err){
                res.status(400).json({
                    message: err
                })
            }else{
                const {name, description, skill, location, date_of_birth, expected_salary, email, showcase} = req.body
                const photo = req.file ? req.file.filename : req.file
                const date_updated = new Date()
                const id = req.params.id
                const data = { name, photo, description, skill, location, date_of_birth, showcase, date_updated, email, expected_salary }
                model
                    .editEngineers (data, id)
                    .then (response => {
                        res.status(200).json({
                            error: false,
                            message: response
                        })
                    })
                    .catch (err =>{
                        res.status(400).json({
                            error: true,
                            message: err
                        })
                    })
                }
        })        
    },
    deleteEngineers: (req, res) => {
        const id = req.params.id
        model
            .deleteEngineers(id)
            .then(response=>{
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
            });
    }
};

