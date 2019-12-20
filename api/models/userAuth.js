const conn = require('../../config/database');

module.exports = {
    register : (req,username,password,role) => {
        const{Name, Logo, Description, Location, Date_of_Birth, Showcase} = req.body
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO users SET username=?,password=?,role=?',[username,password,role], (err)=>{
                if(!err){
                    if(role==='engineer'){
                        conn.query(`INSERT INTO engineers (Name, Description, Location, Date_of_Birth, Showcase, Date_Created, Date_Updated)
                        VALUES ("${Name}", "${Description}", "${Location}", "${Date_of_Birth}", "${Showcase}", NOW(), NOW())`, (err)=>{
                            if(!err){
                                let message = 'Register Succes'
                                resolve(message)
                            }else{
                                reject(err)
                            }
                        })
                    }else{
                        conn.query(`INSERT INTO companies (Name, Logo, Location, Description) 
                        VALUES ("${Name}", "${Logo}", "${Location}", "${Description}") `, (err)=>{
                            if(!err){
                                let message = 'Register Success'
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
                    //console.log(response)
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    }
}