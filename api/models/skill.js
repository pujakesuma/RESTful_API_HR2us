const conn = require('../../config/database');

module.exports = {
    getSkill: () => {
        return new Promise ((resolve, reject) => {
            conn.query ('SELECT * FROM skill', (err, response) => {
                if (!err) {
                    resolve (response);
                }else {
                    reject (err);
                }
            });
        });
    },
    addSkill: body => {
        const {Name, id_engineer} = body;
        return new Promise ((resolve, reject) => {
            conn.query (
                `INSERT INTO skill (Name, id_engineer)
                VALUES ("${Name}", "${id_engineer}")`,
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
    editSkill: (query, params) => {
        return new Promise ((resolve, reject) => {
            conn.query (
                'UPDATE skill SET ? where ?',
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
    deleteSkill: params => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM skill WHERE ?',
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