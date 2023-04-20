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
    const datum = new Date().toLocaleDateString('de-DE');
    const arbeitername = req.session.user.username;
    let query = `SELECT * FROM fahrzeug`;
    let query2 = `SELECT * FROM tanken WHERE arbeiter = ? && Datum = ?`;
    const values = [arbeitername, datum];
connection.query(query2, values, (err, rowstanken) => {  
    connection.query(query, (err, rows) => {
      if (!err) {
        let removedFahrzeug = req.query.removed;
        res.render('fahrzeug', { rows, removedFahrzeug, rowstanken });
      } else {
        console.log(err);
      }
      console.log('The data from Fahrzeug table: \n', rows, rowstanken);
    });
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
        const datum = new Date().toLocaleDateString('de-DE');
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
 exports.editTanken = (req, res) =>{
  connection.query(`SELECT * FROM tanken WHERE id = ?`, [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
      return res.render('edit-tanken', { rows: rows[0] });
    }
              res.render('edit-tanken', { 
              rows: rows[0],
          });
      });
};
exports.updateTanken = (req, res) => {
  connection.query('SELECT * FROM fahrzeug WHERE Id = ?', [req.params.id], (err, rows) => {
    const menge = req.body['menge'];
    const preis = req.body['preis'];
    const values = [menge, preis, req.params.id];
    connection.query(`UPDATE tanken SET Menge = ?, Preis = ? WHERE Id = ? `, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.render('edit-fahrzeug', { rows: rows[0] });
      }
      res.redirect('back');
    });
  });
};

