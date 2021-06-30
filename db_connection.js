var mysql = require('mysql');
var dbConfig = require('./config/db.config');

var conn = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
})

conn.connect(error => {
  if (error) throw error;
  else
    console.log("Connected to Database!");
})

module.exports = conn;
//heroku buildpacks:set heroku/nodejs