const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// View Fahrzeuge
  exports.viewQr = (req, res) => {
        res.render('qrcode', { });
      } 

