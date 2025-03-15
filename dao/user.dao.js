const db = require("../config/database.config");

const createUser = async ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Users (name, email, password) VALUES (?, ?, ?)`;

        db.run(sql, [name, email, password], function (err) {
            if (err) {
                console.error("Error inserting user:", err.message);
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

module.exports = {
    createUser
};
