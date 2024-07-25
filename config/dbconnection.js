const mysql = require('mysql');

// create a new MySQL connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_ROOT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

// connect to the MySQL database
db.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to fucking backend!');
  }
});
// close the MySQL connection
// db.end();

module.exports = db;