const conn = require('../../config/database');

module.exports = {
    getEngineer: (id)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`Select * from engineers where id='${id}'`, (err, response)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            })
        })
    },

    getEngineers : (limit, offset, condition)=>{
        return new Promise((resolve, reject)=>{
            const sql = `SELECT COUNT(*) as data from engineers ${condition}`
            console.log(sql)
            conn.query(sql, (err, rows)=>{
                let dataTotal = rows.data
                if(err){
                    resolve.json({
                        err
                    })
                }else{
                    conn.query(`SELECT * FROM engineers ${condition} limit ${offset}, ${limit}`, (err, data)=>{
                        if(err){
                            reject(err)
                        }else{
                            let response = {dataTotal, data}
                            resolve(response)
                        }
                    })
                } 
            })
        })
    },
    addEngineers: (data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO engineers set ?', data, (err)=>{
                if(err){
                    reject(err)
                }else{
                    let message = 'Data Added Successfully'
                    resolve(message)
                }
            })
        })
    },
    
    editEngineers: (data, id)=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * FROM engineers where id =?', id, (err, rows, fields)=>{
                if(err) throw err
                if(rows.length<=0){
                    let message = 'User not found'
                    reject(message)
                }else{
                    conn.query('UPDATE engineers set ? WHERE id = ?', [data,id], (err)=>{
                        if(!err){
                            let response = 'Data Updated Successfully'
                            resolve(response)
                        }else{
                            reject(err)
                        }
                    })
                }
            })
        })
    },
    deleteEngineer : (id)=>{
        return new Promise((resolve, reject)=>{
            conn.query('DELETE FROM engineers where id = ?', id, (err)=>{
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