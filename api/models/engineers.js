const conn = require('../../config/database');

module.exports = {
    getEngineers: query => {
        const limit = query.limit || 5;
        const page = query.page || 1;
        const offset = (page - 1) * limit;

        return new Promise ((resolve, reject) => {
            conn.query (`SELECT engineers.Name, engineers.Description, 
            engineers.Location, engineers.Date_of_Birth, GROUP_CONCAT(skill.Skill) as Skills, 
            engineers.Showcase, engineers.Date_Created, engineers.Date_Updated FROM engineers 
            LEFT JOIN skill ON engineers.id_engineer = skill.id_engineer 
            GROUP BY engineers.id_engineer ORDER BY \`engineers\`.\`Name\` ASC, \`Skills\` ASC, 
            \`engineers\`.\`Date_Updated\` ASC LIMIT ${limit} OFFSET ${offset}`, (err, response) => {
                if (!err) {
                    resolve (response);
                }else {
                    reject (err);
                }
            });
        });
    },
    addEngineers: body => {
        const {Name, Description, Location, Date_of_Birth, Showcase} = body;
        //const {Date_Created, Date_Updated} = new Date();
        //INSERT INTO `engineers` (`id_engineer`, `Name`, `Description`, 
        //`Location`, `Date_of_Birth`, `Showcase`, `Date_Created`, `Date_Updated`)
        //VALUES (NULL, '', '', '', '0000-00-00', '', '0000-00-00 00:00:00.000000', current_timestamp())
        return new Promise ((resolve, reject) => {
            conn.query (
                `INSERT INTO engineers (Name, Description, Location, Date_of_Birth, Showcase, Date_Created, Date_Updated)
                VALUES ("${Name}", "${Description}", "${Location}", "${Date_of_Birth}", "${Showcase}", NOW(), NOW())`,
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
    editEngineers: (query, params) => {
        //const {Name, Description, Location, Date_of_Birth, Showcase} = query;
        //const {id} = params;
        //console.log(params);
        return new Promise ((resolve, reject) => {
            conn.query (
                //`UPDATE engineers SET Name="${Name}", Description="${Description}", Location="${Location}", Date_of_Birth="${Date_of_Birth}", Showcase="${Showcase}", Date_Updated=NOW() WHERE id_engineer="${id}")`,
                'UPDATE engineers SET ? where ?',
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
    deleteEngineers: params => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM engineers WHERE ?',
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