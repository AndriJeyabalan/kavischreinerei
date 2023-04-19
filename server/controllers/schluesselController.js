const mysql = require('mysql');

// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Schlüssel
exports.viewSchluessel = (req, res) => {
let query = `SELECT * FROM schluessel WHERE Zurueckgegeben = ?`;
connection.query(query, "", (err, rows) => {
        if (!err) {
        let removedSchluessel = req.query.removed;
        res.render('schluessel', { rows, removedSchluessel });
        } else {
        console.log(err);
        }
        console.log('The data from Schluessel table: \n', rows);
    });
}
        //Edit Schlüssel
exports.editSchluessel = (req, res) =>{
    connection.query(`SELECT * FROM schluessel WHERE Id = ?`, [req.params.id], (err, rows) => {
      if (err) {
        console.log(err);
        return res.render('edit-schluessel', { rows: rows[0] });
      }
                res.render('edit-schluessel', { 
                rows: rows[0],
            });
        });
      };
//Schlüssel Zurückgeben
exports.zurueckgebenSchluessel = (req, res) =>{
    const arbeitername = req.session.user.username;
    const datum = new Date();
    connection.query(`UPDATE schluessel SET Zurueckgegeben = ?, DatumZurueckgegeben = ?  WHERE Id = ?`, [arbeitername, datum, req.params.id], (err, rows) => {
        if (err) {
          console.log(err);
          return res.render('edit-schluessel', { rows: rows[0] });
        }
        let query = `SELECT * FROM schluessel WHERE Zurueckgegeben = ?`;
        connection.query(query, "", (err, rows) => {
                if (!err) {
                let removedSchluessel = req.query.removed;
                res.redirect('/schluessel');
                res.render('schluessel', { rows, removedSchluessel });
                } else {
                console.log(err);
                }
                console.log('The data from Schluessel table: \n', rows);
            });
        });
    };
//Schlüssel Zurückgeben
exports.editNotizSchluessel = (req, res) =>{
    const notiz = req.body['notiz'];
    connection.query(`UPDATE schluessel SET Notiz = ?  WHERE Id = ?`, [notiz, req.params.id], (err, rows) => {
        if (err) {
          console.log(err);
          return res.render('back', { rows: rows[0] });
        }
    
    connection.query(`SELECT * FROM schluessel WHERE Id = ?`, [req.params.id], (err, rows) => {
        if (err) {
        console.log(err);
        return res.render('back', { rows: rows[0] });
        }
        res.redirect('back');
      });
    });
 };

 //Schlüssel Speichern
exports.speicherSchluessel = (req, res) =>{
  const kundenvorname = req.body['kundenvorname'];
  const kundennachname = req.body['kundennachname'];
  const code = req.body['code'];
  const notiz = req.body['notiz'];
  const datum = new Date();
  const arbeiter = req.session.user.username;
  const values = [kundenvorname, kundennachname, code, notiz, arbeiter, datum];
  connection.query(`INSERT INTO schluessel (Vorname, Nachname, Code, Notiz, Entgegengenommen, Datum) VALUES (?, ?, ?, ?, ?, ?)`, values, (err, result) => {
      if (!err) {

        res.redirect('back');
      }
  });
};