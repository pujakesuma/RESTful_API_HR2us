const conn = require('../../config/database');

module.exports = {
    getSearch: (query) => {
        return new Promise ((resolve, reject) => {
            conn.query (`SELECT engineers.Name, GROUP_CONCAT(skill.Skill) as Skills 
            FROM \`engineers\` LEFT JOIN \`skill\` ON 
            engineers.id_engineer = skill.id_engineer WHERE engineers.Name 
            LIKE '%${query.name}%' AND skill.Skill LIKE '%${query.skill}%' 
            GROUP BY engineers.id_engineer ORDER BY \`engineers\`.\`Name\` ASC, \`Skills\` ASC`, 
            (err, response) => {
                if (!err) {
                    resolve (response);
                }else {
                    reject (err);
                }
            });
        });
    },
};