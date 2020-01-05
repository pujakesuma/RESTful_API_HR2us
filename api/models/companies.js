const conn = require('../../config/database');

module.exports = {
    getCompany: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * From company where id='${id}'`, (err, response) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            })
        })
    },
    // getCompanies: query => {
    //     const limit = query.limit || 5;
    //     const page = query.page || 1;
    //     const offset = (page - 1) * limit;
    //     return new Promise ((resolve, reject) => {
    //         conn.query (`SELECT * FROM companies GROUP BY id ORDER BY Name ASC LIMIT ${limit} OFFSET ${offset}`, (err, response) => {
    //             if (!err) {
    //                 resolve (response);
    //             }else {
    //                 reject (err);
    //             }
    //         });
    //     });
    // },
    getCompanies: (limit, offset, condition)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`SELECT COUNT(*) as data from companies ${condition}`, (err, rows)=>{
                let dataTotal=rows[0].data
                if(err){
                    reject(err)
                }else{
                    conn.query(`SELECT * FROM companies ${condition} limit ${offset}, ${limit}`, (err, data)=>{
                        if(!err){
                            let response = {dataTotal, data}
                            resolve(response)
                        }else{
                            reject(err)
                        }
                    })
                }
            })
        })
    },
    // addCompany: body => {
    //     return new Promise ((resolve, reject) => {
    //         conn.query (
    //             'INSERT INTO companies SET ?',
    //             [body],
    //             (err, response) => {
    //                 if (!err) {
    //                     resolve (response);
    //                 }else{
    //                     reject (err);
    //                 }
    //             }
    //         );
    //     });
    // },
    addCompany: (data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO companies set ?', data, (err)=>{
                if(!err){
                    let response='Data Added Successfully'
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    },
    // editCompany: (query, params) => {
    //     return new Promise ((resolve, reject) => {
    //         conn.query (
    //             'UPDATE companies SET ? where ?',
    //             [query, params],
    //             (err, response) => {
    //                 if (!err) {
    //                     resolve (response);
    //                 }else{
    //                     reject (err);
    //                 }
    //             }
    //         );
    //     });
    // },
    editCompany: (data, id)=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * FROM companies where id=?', id, (err, rows, fields)=>{
                if(err) throw err
                if(rows.length<=0){
                    let message = 'User Not Found'
                    reject(message)
                }else{
                    conn.query('UPDATE companies set ? where id=?', [data, id], (err)=>{
                        if(!err){
                            let response='Data Updated Successfully'
                            resolve(response)
                        }else{
                            reject(err)
                        }
                    })
                }
            })
        })
    },
    // deleteCompany: params => {
    //     return new Promise((resolve, reject) => {
    //         conn.query('DELETE FROM companies WHERE ?',
    //         [params],
    //         (err, response) => {
    //             if (!err){
    //                 resolve(response);
    //             }else{
    //                 reject(err);
    //             }
    //         })
    //     });
    // }
    deleteCompany: (id)=>{
        return new Promise((resolve, reject)=>{
            conn.query('DELETE FROM company where id = ?', id, (err)=>{
                if(!err){
                    conn.query('DELETE FROM users where id = ?', id, (err)=>{
                        if(!err){
                            let response = 'Data Deleted Successfully'
                            resolve(response)
                        }
                    })
                }else{
                    reject(err)
                }
            })
        })
    }
};