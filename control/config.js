const mysql = require("mysql");
const fs = require("fs");
let sql = fs.readFileSync("./control/db.sql").toString();
const dotenv = require("dotenv");
dotenv.config()

let con = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  });
  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME
})
sql = sql.replace(/DB_DBNAME/g, process.env.DB_DBNAME);
con.connect(function(err) {
    if (err) throw err;
    console.log("konektovan na localhost!");
    con.query(sql, function (err) {
      if (err) throw err;
      console.log("Baza napravljena");
      connection.connect((err) => {
        if(err) throw err;
        console.log("konektovani ste na bazu...");
      });
     
    });
  });

  module.exports = connection;