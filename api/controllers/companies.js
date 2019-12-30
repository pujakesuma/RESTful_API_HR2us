'use strict';

const model = require('../models/companies');
const form = require('../helpers/form');

module.exports = {
    getCompanies: (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const offset = (page-1)*limit
        const sort = req.query.sort ? req.query.sort : 'name'
        const order = req.query.order || 'asc'
        const name = req.query.name
        let condition = ''
        let url = req.originalUrl
        
        if(name){
            condition = "where name like '%"+name+"%' order by "+sort+" "+order
        }
        if(!name){
            condition = "order by "+sort+" "+order
        }
    
        let nextPage = 'http://localhost:5000/'+url.replace(`page=${page}`, 'page='+parseInt(page+1))
        let prevPage = 'http://localhost:5000/'+url.replace(`page=${page}`, 'page='+parseInt(page-1))
        
        console.log(condition)
        model.getCompanies(limit, offset, condition)
        .then(response=>{
            let pageTotal = response.dataTotal%limit===0?response.dataTotal/limit:Math.floor((response.dataTotal/limit)+1)
            if(page>pageTotal || page===0){
                return res.status(200).json({
                    error: true,
                    message: '404 Page Not Found!',
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
                    prevPage,
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
                // return miscHelper.response(res, 200, false, 'Success', result)
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
        .catch(err=>{
            res.status(400).json({
                error:true,
                message: err
            })
        })
    },
    addCompany: (req, res) => {
        const {name, email, location, description} = req.body
            const data = {id, name, email, logo, location, description}
            model.addCompany(data)
            .then(response=>{
                res.status(201).json({
                    error:false,
                    message: response
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error: true,
                    message: err
                })
            })
    },

    editCompany: (req, res) => {
        const {name, email, location, description} = req.body
            const data = {name, email, logo, location, description}
            const id = req.params.id
            model.editCompany(data, id)
            .then(response=>{
                res.status(201).json({
                    error:false,
                    message: response
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error:true,
                    message: err
                })
            })
    },
    deleteCompany: (req, res) => {
        const id = req.params.id
        model.deleteCompany(id)
        .then(response=>{
        res.status(200).json({
            error:false,
            message: response
        })
    })
    .catch(err=>{
        res.status(400).json({
            error:true,
            message: err
        })
    })
}
}