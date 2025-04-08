const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const database = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log('Database connection failed.');
  } else {
    console.log('Database connection success.');
  }
});

module.exports = database;
