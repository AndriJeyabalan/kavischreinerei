const mysql = require('mysql');

// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// View Stunden
exports.viewTermine = (req, res) => {
    // Stunden the connection
    const arbeitername = req.session.user.username;
    let query = `SELECT *, DATE_FORMAT(Datum, '%d.%m') as formattedDate FROM termine WHERE Arbeiter = ? && Erledigt = "" ORDER BY Datum ASC`;
      
    connection.query(query,[arbeitername], (err, rows) => {
        if (!err) { 
          res.render('termine', { rows});
        } else {
          console.log(err); 
        }
        console.log('The data from termine table: \n', rows);
      });
    } 
//Stunden speichern
exports.createTermine = (req, res) => {
    const { datum, dateto, notiz} = req.body;
    const arbeitername = req.session.user.username;
      // SQL-Abfrage zum Einfügen der Daten
      const query = `INSERT INTO termine (Datum, Zeit, Notiz, Arbeiter) 
      VALUES (?, ?, ?, ?)`;
      const values = [datum, dateto, notiz, arbeitername];
      connection.query(query, values, (err, result) => {
        if (err) throw err;
        console.log(values);
        res.redirect('back');
    });
  }
//Edit Termine
exports.editTermine = (req, res) => {
  // Stunden the connection
  connection.query(`SELECT *, DATE_FORMAT(datum, '%Y-%m-%d') as formattedDate From termine WHERE id = ?`, [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-termine', { rows: rows[0] });
    } else {
      console.log(err);
    }
  });
}
exports.edittTermine = (req, res) => {

  const id = req.params.id; // ID des zu bearbeitenden Stundeneintrags
  const { datum, dateto, notiz} = req.body;
  const arbeitername = req.session.user.username;



  const sql = 'UPDATE termine SET Datum = ?, Zeit = ?, Notiz = ?,  Arbeiter = ? WHERE Id = ?';
  const sqldelete = 'DELETE FROM termine WHERE Id = ?';
  if (req.body.action === 'Speichern') {
  connection.query(sql, [datum, dateto, notiz,  arbeitername, id], (error, results) => {
    if (error) throw error;
    res.redirect('/termine');
  }); } else if (req.body.action === 'Löschen') {
    connection.query(sqldelete, [id], (error, results) => {
      if (error) throw error;
      res.redirect('/termine'); // Zurück zur Übersichtsseite
    });
  }
}
//erledigt Termine
exports.erledigtTermine = (req, res) => {
  const id = req.params.id ;
    const query = `UPDATE termine SET Erledigt = "Ja" WHERE Id = ?`;
    connection.query(query, id, (err, result) => {
      if (err) throw err;
      res.redirect('back');
  });
}
