const mysql = require('mysql');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// View Kunde
exports.viewKunde = (req, res) => {
  let searchQuery = req.query.search;
  let isFiltering = false; // Hier initialisieren
  let query = `SELECT * FROM kunden WHERE Status = "Laufend"`;
  let kundenid = req.params.id;
  let querya = `SELECT * FROM foto WHERE kunden_id = '${kundenid}'`;

connection.query(querya, (err, rowsform) => {
  if (searchQuery) {
    query += ` && Vorname LIKE '%${searchQuery}%' OR Nachname LIKE '%${searchQuery}%'`;
    isFiltering = true; // Hier setzen
  }
    connection.query(query, (err, rows) => {
      if (!err) {
        let removedKunde = req.query.removed;
        res.render('kunde', { rows, removedKunde, rowsform, isFiltering });
      } else {
        console.log(err);
      }
      console.log('The data from Kunde table: \n', rows);
    });
  });
}
exports.editKunde = (req, res) =>{
  let kundenid = req.params.id;
  let querya = `SELECT * FROM foto WHERE kunden_id = '${kundenid}'`;

connection.query(querya, (err, rowsform) => {
    connection.query(`SELECT * FROM kunden WHERE id = ?`, [req.params.id], (err, rows) => {
      if (err) {
        console.log(err);
        return res.render('edit-kunde', { rows: rows[0], rowsform });
      }
      
      connection.query(`SELECT * FROM kundenaufträge WHERE KundenId = ?`, [req.params.id], (err, rowsAuftrag) => {
        if (err) {
          console.log(err);
          return res.render('edit-kunde', { rows: rows[0] });
        }
  
                 res.render('edit-kunde', { 
                  rows: rows[0],
                  rowsAuftrag: rowsAuftrag,
                  rowsform
              });
            });
          });
        });
      };
exports.editKundeErledigt = (req, res) => {
  connection.query(`UPDATE kundenaufträge SET Status = ?  WHERE id = ?`, ["Erledigt", req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
      return res.render('edit-kunde', { rows: rows[0] });
    }
    res.redirect('back');
  });
};
