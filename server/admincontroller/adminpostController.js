const mysql = require('mysql');

// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// View Post
  exports.viewAdminPost = (req, res) => {

    let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
    let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
    //Alle Werkzeuge
    let query = `SELECT * FROM post WHERE EntgegengenommenVon = ""  ORDER BY ${sortColumn} ${sortOrder}`; 

        connection.query(query, (err, rows) => {
        if (!err) {
            res.render('admin-post', { rows});
        } else {
            console.log(err);
        }
        });
    }
exports.viewAdminPostja = (req, res) => {

    let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
    let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
    //Alle Werkzeuge
    let query = `SELECT * FROM post WHERE EntgegengenommenVon != "" && Rueckstand = "" ORDER BY ${sortColumn} ${sortOrder}`; 

        connection.query(query, (err, rows) => {
        if (!err) {
            res.render('admin-postja', { rows });
        } else {
            console.log(err);
        }
        });
}
exports.viewAdminPostrs = (req, res) => {

    let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
    let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
    //Alle Werkzeuge
    let query = `SELECT * FROM post WHERE Rueckstand != ""  ORDER BY ${sortColumn} ${sortOrder}`; 

        connection.query(query, (err, rows) => {
        if (!err) {
            res.render('admin-postrs', { rows });
        } else {
            console.log(err);
        }
        });
}
exports.alterAdminPost = (req, res) => { 
    const id = req.params.id;   
    const kundenname = req.body['kundenname'];
    const name = req.body['name'];
    const anzahl = req.body['anzahl'];
    const notiz = req.body['notiz'];
    const bam = req.body['bam'];
    const evom = req.body['evon'];
    const eam = req.body['eam'];
    const rueckstand = req.body['rueckstand'];
    const values = [id, kundenname, name, anzahl, notiz, bam, evom, eam, rueckstand, id];
    console.log(values);
    connection.query(`UPDATE post SET Id = ?, Kundenname = ?, Name = ?, Anzahl = ?, Notiz = ?, BestelltAm = ?, EntgegengenommenVon = ?, EntgegengenommenAm = ?, Rueckstand = ? WHERE Id = ? `, values, (err, rows) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });
        }  
exports.alterAdminPostja = (req, res) => { 
    const id = req.params.id;   
    const kundenname = req.body['kundenname'];
    const name = req.body['name'];
    const anzahl = req.body['anzahl'];
    const notiz = req.body['notiz'];
    const bam = req.body['bam'];
    const evom = req.body['evon'];
    const eam = req.body['eam'];
    const rueckstand = req.body['rueckstand'];
    const values = [id, kundenname, name, anzahl, notiz, bam, evom, eam, rueckstand, id];
    console.log(values);
    connection.query(`UPDATE post SET Id = ?, Kundenname = ?, Name = ?, Anzahl = ?, Notiz = ?, BestelltAm = ?, EntgegengenommenVon = ?, EntgegengenommenAm = ?, Rueckstand = ? WHERE Id = ? `, values, (err, rows) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });
}  
exports.alterAdminPostrs = (req, res) => { 
    const id = req.params.id;   
    const kundenname = req.body['kundenname'];
    const name = req.body['name'];
    const anzahl = req.body['anzahl'];
    const notiz = req.body['notiz'];
    const bam = req.body['bam'];
    const evom = req.body['evon'];
    const eam = req.body['eam'];
    const rueckstand = req.body['rueckstand'];
    const values = [id, kundenname, name, anzahl, notiz, bam, evom, eam, rueckstand, id];
    console.log(values);
    connection.query(`UPDATE post SET Id = ?, Kundenname = ?, Name = ?, Anzahl = ?, Notiz = ?, BestelltAm = ?, EntgegengenommenVon = ?, EntgegengenommenAm = ?, Rueckstand = ? WHERE Id = ? `, values, (err, rows) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });
}  
exports.deleteAdminPost = (req, res) => {
    const id = req.params.id;   
    connection.query(`DELETE FROM post WHERE Id = ? `, id, (err) => {
          if (!err) {
            res.redirect('back');
          } else {
            console.log(err);
          }
        });
}
exports.deleteAdminPostja = (req, res) => {
    const id = req.params.id;   
    connection.query(`DELETE FROM post WHERE Id = ? `, id, (err) => {
          if (!err) {
            res.redirect('back');
          } else {
            console.log(err);
          }
        });
}
exports.deleteAdminPostrs = (req, res) => {
    const id = req.params.id;   
    connection.query(`DELETE FROM post WHERE Id = ? `, id, (err) => {
          if (!err) {
            res.redirect('back');
          } else {
            console.log(err);
          }
        });
}
exports.saveAdminPost = (req, res) => { 
    const kundenname = req.body['kundenname'];
    const name = req.body['name'];
    const anzahl = req.body['anzahl'];
    const notiz = req.body['notiz'];
    const bam = req.body['bam'];
    const evom = req.body['evon'];
    const eam = req.body['eam'];
    const rueckstand = req.body['rueckstand'];
    const values = [ kundenname, name, anzahl, notiz, bam, evom, eam, rueckstand];
connection.query(`INSERT INTO post (Kundenname, Name, Anzahl, Notiz, BestelltAm, EntgegengenommenVon, EntgegengenommenAm, Rueckstand) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
        res.redirect('back');
        } else {
        console.log(err);
        }
    }); 
}  