const sqlite3 = require('sqlite3');
const sql3 = sqlite3.verbose();

// connect to the database
const DB = new sql3.Database('./database.db', sqlite3.OPEN_READWRITE, connected);

function connected(err) {
    if (err) {
        console.log(err.message);
        return
    }
    console.log("Connected to the database");
}

exports.module = { DB }