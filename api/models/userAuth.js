const conn = require('../../config/database');

module.exports = {
    register : (req,username,password,role) => {
        const{Name, Logo, Description, Location, Showcase} = req.body
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO users SET username=?,password=?,role=?',[username,password,role], (err)=>{
                if(!err){
                    if(role==='engineer'){
                        conn.query(`INSERT INTO engineers (Name, Description, Location, Showcase, Date_Created, Date_Updated)
                        VALUES ("${Name}", "${Description}", "${Location}", "${Showcase}", NOW(), NOW())`, (err)=>{
                            if(!err){
                                let message = {
                                    status:"Registration Success"
                                }
                                resolve(message)
                            }else{
                                reject(err)
                            }
                        })
                    }else{
                        conn.query(`INSERT INTO companies (Name, Logo, Location, Description) 
                        VALUES ("${Name}", "${Logo}", "${Location}", "${Description}") `, (err)=>{
                            if(!err){
                                let message = ('Register Success! username: ' + username)
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
    getUser : (username, role) => {
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * From users where username = ? AND role = ?', [username,role], (err, response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    }
}