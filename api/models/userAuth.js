const conn = require('../../config/database');

module.exports = {
    register : (data, dataEngineer, dataCompany)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO users SET ?', data, (err)=>{
                console.log(data)
                if(!err){
                    if(data.role==='engineer'){
                        conn.query('INSERT INTO engineers SET ?', dataEngineer, (err)=>{
                            console.log(dataEngineer)
                            if(!err){
                                let message = 'Register success'
                                resolve(message)    
                            }else{
                                reject(err)
                            }
                        })
                    }else{
                        conn.query('INSERT INTO companies SET ?' , dataCompany, (err)=>{
                            if(!err){
                                let message = 'Register success'
                                resolve(message)    
                            }else{
                                reject(err)
                            }
                        })
                    }
                }else{
                    reject(err)
                }
            })
        })
    },
    getUser : (email, role) => {
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * From users where email = ? AND role = ?', [email,role], (err, response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    }
}