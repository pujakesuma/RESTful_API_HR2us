const conn = require('../../config/database');

module.exports = {
    getCompanies: () => {
        return new Promise ((resolve, reject) => {
            conn.query ('SELECT * FROM companies', (err, response) => {
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