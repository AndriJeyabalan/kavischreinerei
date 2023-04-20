const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// View Fahrzeuge
  exports.viewPost = (req, res) => {
    let searchQuery = req.query.search;
    let isFiltering = false; // Hier initialisieren 
    let query = `SELECT * FROM post`;
  
    if (searchQuery) { 
      query += ` WHERE Kundenname LIKE '%${searchQuery}%' OR Name LIKE '%${searchQuery}%' && EntgegengenommenVon = ""`;
      isFiltering = true; // Hier setzen
    }else{
        query += ` WHERE EntgegengenommenVon = ""`
    } 
    let query2 = `SELECT * FROM post`;
  
    if (searchQuery) { 
      query2 += ` WHERE Kundenname LIKE '%${searchQuery}%' OR Name LIKE '%${searchQuery}%' && Rueckstand != ""`;
      isFiltering = true; // Hier setzen
    }else{
        query2 += ` WHERE Rueckstand != ""`
    } 
    connection.query(query2, (err, rowsrueckstand) => {
        connection.query(query, (err, rows) => {
        if (!err) {
            res.render('post', { rows, rowsrueckstand, isFiltering });
        } else {
            console.log(err);
        }
        });
    });
  } 
exports.nehmenPost = (req, res) => {
const id = req.params.id; // ID des zu bearbeitenden Stundeneintrags
const rueckstand = req.body.rueckstand;
const now = new Date();
const tag = now.getDate();
const monat = now.toLocaleString('default', { month: 'long' });
const jahr = now.getFullYear();
const datum = tag + ', ' + monat + ', ' + jahr;
const arbeiter = req.session.user.username;

const sql = 'UPDATE post SET EntgegengenommenVon = ?, EntgegengenommenAm = ?, Rueckstand = ? WHERE Id = ?';

connection.query(sql, [arbeiter, datum, rueckstand,  id], (error, results) => {
    if (error) throw error;
    console.log('Stunden erfolgreich gespeichert!');
    res.redirect('back'); // Zurück zur Übersichtsseite
}); 
} 
exports.nehmenPostrueckstand = (req, res) => {
    const id = req.params.id; // ID des zu bearbeitenden Stundeneintrags
    const rueckstand = req.body.rueckstand;
    const now = new Date();
    const tag = now.getDate();
    const monat = now.toLocaleString('default', { month: 'long' });
    const jahr = now.getFullYear();
    const datum = tag + ', ' + monat + ', ' + jahr;
    const arbeiter = req.session.user.username;
    
    const sql = 'UPDATE post SET EntgegengenommenVon = ?, EntgegengenommenAm = ?, Rueckstand = ? WHERE Id = ?';
    
    connection.query(sql, [arbeiter, datum, rueckstand,  id], (error, results) => {
        if (error) throw error;
        console.log('Stunden erfolgreich gespeichert!');
        res.redirect('back'); // Zurück zur Übersichtsseite
    }); 
} 