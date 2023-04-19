const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); 
exports.viewAdminTermine = (req, res) => { 
let query = `SELECT * FROM termine WHERE Erledigt = "" ORDER BY Datum`;

    connection.query(query, (err, rows) => {
            if (!err) {
            res.render('admin-termine', { rows});
            } else {
            console.log(err);
        }
    }); 
} 
exports.alterAdminTermine = (req, res) => { 
  const id = req.params.id;   
  const datum = req.body['datum'];
  const zeit = req.body['zeit'];
  const notiz = req.body['notiz'];
  const arbeiter = req.body['arbeiter'];
  const erledigt = req.body['erledigt'];
  const values = [id, datum, zeit, notiz, arbeiter, erledigt, id];
  console.log(values);
  connection.query(`UPDATE termine SET Id = ?, Datum = ?, Zeit = ?, Notiz = ?, Arbeiter = ?, Erledigt = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }  
exports.deleteAdminTermine = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM termine WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }
exports.saveAdminTermine = (req, res) => { 
  const datum = req.body['datum'];
  const zeit = req.body['zeit'];
  const notiz = req.body['notiz'];
  const arbeiter = req.body['arbeiter'];
  const erledigt = req.body['erledigt'];
  const values = [datum, zeit, notiz, arbeiter, erledigt];
  console.log(values);
  connection.query(`INSERT INTO termine (Datum, Zeit, Notiz, Arbeiter, Erledigt) VALUES (?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      }); 
    }  
exports.viewAdminTermineja = (req, res) => { 
  let query = `SELECT * FROM termine WHERE Erledigt = "Ja" ORDER BY Arbeiter, Datum DESC`;
  
      connection.query(query, (err, rows) => {
              if (!err) {
              res.render('admin-termineja', { rows});
              } else {
              console.log(err);
          }
      }); 
  } 
  exports.alterAdminTermineja = (req, res) => {
    const id = req.params.id;   
    const datum = req.body['datum'];
    const zeit = req.body['zeit'];
    const notiz = req.body['notiz'];
    const arbeiter = req.body['arbeiter'];
    const erledigt = req.body['erledigt'];
    const values = [id, datum, zeit, notiz, arbeiter, erledigt, id];
    console.log(values);
    connection.query(`UPDATE termine SET Id = ?, Datum = ?, Zeit = ?, Notiz = ?, Arbeiter = ?, Erledigt = ? WHERE Id = ? `, values, (err, rows) => {
          if (!err) {
            res.redirect('back');
          } else {
            console.log(err);
          }
        });
      }  
  exports.deleteAdminTermineja = (req, res) => {
    const id = req.params.id;   
    connection.query(`DELETE FROM termine WHERE Id = ? `, id, (err) => {
          if (!err) {
            res.redirect('back');
          } else {
            console.log(err);
          }
        });
      }
  exports.saveAdminTermineja = (req, res) => { 
    const datum = req.body['datum'];
    const zeit = req.body['zeit'];
    const notiz = req.body['notiz'];
    const arbeiter = req.body['arbeiter'];
    const erledigt = req.body['erledigt'];
    const values = [datum, zeit, notiz, arbeiter, erledigt];
    console.log(values);
    connection.query(`INSERT INTO termine (Datum, Zeit, Notiz, Arbeiter, Erledigt) VALUES (?, ?, ?, ?, ?) `, values, (err, rows) => {
          if (!err) {
            res.redirect('back');
          } else {
            console.log(err);
          }
        });
      }  