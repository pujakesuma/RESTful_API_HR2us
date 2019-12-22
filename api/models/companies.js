const conn = require('../../config/database');

module.exports = {
    getCompanies: query => {
        const limit = query.limit || 5;
        const page = query.page || 1;
        const offset = (page - 1) * limit;
        //GROUP BY engineers.id_engineer ORDER BY \`engineers\`.\`Name\` ASC, \`Skills\` ASC, 
        //\`engineers\`.\`Date_Updated\` ASC LIMIT ${limit} OFFSET ${offset}
        return new Promise ((resolve, reject) => {
            conn.query (`SELECT * FROM companies GROUP BY id ORDER BY Name ASC LIMIT ${limit} OFFSET ${offset}`, (err, response) => {
                if (!err) {
                    resolve (response);
                }else {
                    reject (err);
                }
            });
        });
    },
    addCompany: body => {
        return new Promise ((resolve, reject) => {
            conn.query (
                'INSERT INTO companies SET ?',
                [body],
                (err, response) => {
                    if (!err) {
                        resolve (response);
                    }else{
                        reject (err);
                    }
                }
            );
        });
    },
    editCompany: (query, params) => {
        return new Promise ((resolve, reject) => {
            conn.query (
                'UPDATE companies SET ? where ?',
                [query, params],
                (err, response) => {
                    if (!err) {
                        resolve (response);
                    }else{
                        reject (err);
                    }
                }
            );
        });
    },
    deleteCompany: params => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM companies WHERE ?',
            [params],
            (err, response) => {
                if (!err){
                    resolve(response);
                }else{
                    reject(err);
                }
            })
        });
    }
};