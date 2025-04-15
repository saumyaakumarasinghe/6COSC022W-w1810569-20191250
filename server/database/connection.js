const sqlite3 = require('sqlite3');
const path = require('path');
const dotenv = require('dotenv');

// Dynamically load the correct .env file based on NODE_ENV
const envFile = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.prod';
    case 'test':
      return '.env.test';
    default:
      return '.env.dev';
  }
})();
dotenv.config({ path: envFile });

// Dynamically set the database file based on the environment
const dbFile = process.env.DB_NAME;
if (!dbFile) {
  throw new Error('DB_NAME is not defined in the environment variables');
}
const dbPath = path.resolve(__dirname, dbFile);

const database = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log(`Database connection success. Using ${dbFile}`);
  }
});

module.exports = database;