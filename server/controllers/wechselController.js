const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

  exports.viewHome = (req, res) => {
    res.render('index');
    console.log("Home Seite");
  }
  exports.viewallStunden = (req, res) => {
    res.render('stunden');
    console.log("Stunden Seite");
  }
  exports.viewallWerkzeuge = (req, res) => {
    res.render('werkzeug');
    console.log("Werkzeuge Seite");
  }
  exports.viewallTermine = (req, res) => {
    res.render('termine');
    console.log("Termine Seite");
  }