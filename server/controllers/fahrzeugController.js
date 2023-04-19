const mysql = require('mysql');

// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// View Fahrzeuge
  exports.viewFahrzeug = (req, res) => {
    let searchQuery = req.query.search;
    
    let query = `SELECT * FROM fahrzeug`;
  
    if (searchQuery) {
      query += ` WHERE Name LIKE '%${searchQuery}%'`;
    }
  
    connection.query(query, (err, rows) => {
      if (!err) {
        let removedFahrzeug = req.query.removed;
        res.render('fahrzeug', { rows, removedFahrzeug });
      } else {
        console.log(err);
      }
      console.log('The data from Fahrzeug table: \n', rows);
    });
  } 
      //Edit Fahrzeuge
exports.editFahrzeuge = (req, res) =>{
    connection.query(`SELECT * FROM fahrzeug WHERE id = ?`, [req.params.id], (err, rows) => {
      if (err) {
        console.log(err);
        return res.render('edit-fahrzeug', { rows: rows[0] });
      }
                res.render('edit-fahrzeug', { 
                rows: rows[0],
            });
        });
      };
      exports.fahrzeugeTanken = (req, res) => {
        connection.query('SELECT * FROM fahrzeug WHERE id = ?', [req.params.id], (err, rows) => {

        const datum = new Date();
        const arbeitername = req.session.user.username;
        const menge = req.body['menge'];
        const preis = req.body['preis'];
        const values = [rows[0].Id, menge, preis, arbeitername, datum];
        connection.query(`INSERT INTO tanken (FahrzeugId, Menge, Preis, Arbeiter, Datum) VALUES (?, ?, ?, ?, ?)`, values, (err, result) => {
          if (err) {
            console.log(err);
            return res.render('edit-fahrzeug', { rows: rows[0] });
          }
          res.redirect('back');
        });
    });
 };
      