const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.viewAdminFahrzeug = (req, res) => { 
    let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
    let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
    let query = `SELECT * , DATE_FORMAT(LetzteInspektion, '%Y.%m.%d') AS formatiertes, DATE_FORMAT(NaechsteInspektion, '%Y.%m.%d') AS formatiertes_Datum FROM Fahrzeug`;
    let queryt = `SELECT * , DATE_FORMAT(Datum, '%Y.%m.%d') AS formatiertes FROM Tanken`;
    let querytsum = `SELECT FahrzeugId, SUM(Menge) as SummeMenge, SUM(Preis) as SummePreis 
                        FROM Tanken 
                            GROUP BY FahrzeugId`;
    queryt += ` ORDER BY ${sortColumn} ${sortOrder}`;
connection.query(querytsum, (err, rowstankensum) => {  
    connection.query(queryt, (err, rowstanken) => {   
            connection.query(query, (err, rows) => {
                if (!err) {
                    res.render('admin-fahrzeuge', { rows, sortColumn, sortOrder, rowstanken, rowstankensum});
                } else {
                    console.log(err);
                }
                });
            });
        });
    }  
exports.saveAdminFahrzeuge = (req, res) => {  
    const name = req.body['name'];
    const autonummer = req.body['autonummer'];
    const marke = req.body['marke'];
    const kraftstoff = req.body['kraftstoff'];
    const letzte = req.body['letzte'];
    const naechste = req.body['naechste'];
    const values = [name, autonummer, marke, kraftstoff, letzte, naechste, letzte];
    console.log(values);
    connection.query(`INSERT INTO fahrzeug (Name, Autonummer, Marke, Kraftstoff, LetzteInspektion, NaechsteInspektion) VALUES (?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });  
    } 
exports.saveAdminFahrzeugeTanken = (req, res) => {  
    const fahrzeugid = req.body['fahrzeugid'];
    const menge = req.body['menge'];
    const preis = req.body['preis'];
    const arbeiter = req.session.user.username;
    const datum = req.body['datum'];
    const values = [fahrzeugid, menge, preis, arbeiter, datum];
    console.log(values);
    connection.query(`INSERT INTO tanken (FahrzeugId, Menge, Preis, Arbeiter, Datum) VALUES (?, ?, ?, ?, ?) `, values, (err, rows) => {
            if (!err) {
            res.redirect('back');
            } else { 
            console.log(err);
            }
        });  
    } 
exports.updateAdminFahrzeuge = (req, res) => {
    const id = req.params.id;   
    const name = req.body['name'];
    const autonummer = req.body['autonummer'];
    const marke = req.body['marke'];
    const kraftstoff = req.body['kraftstoff'];
    const letzte = req.body['letzte'];
    const naechste = req.body['naechste'];
    const values = [name, autonummer, marke, kraftstoff, letzte, naechste, id];
    console.log(values);
    connection.query(`UPDATE fahrzeug SET Name = ?, Autonummer = ?, Marke = ?, Kraftstoff = ?, LetzteInspektion = ? ,NaechsteInspektion = ? WHERE Id = ? `, values, (err, rows) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });
    } 
exports.updateAdminFahrzeugeTanken = (req, res) => {
    const id = req.params.id;  
    const fahrzeugid = req.body['fahrzeugid'];
    const menge = req.body['menge'];
    const preis = req.body['preis'];
    const arbeiter = req.session.user.username;
    const datum = req.body['datum'];
    const values = [fahrzeugid, menge, preis, arbeiter, datum, id];
    console.log(values);
    connection.query(`UPDATE tanken SET FahrzeugId = ?, Menge = ?, Preis = ?, Arbeiter = ?, Datum = ? WHERE Id = ? `, values, (err, rows) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });
    } 
exports.deleteAdminFahrzeuge = (req, res) => {
    const id = req.params.id;   
    connection.query(`DELETE FROM fahrzeug WHERE Id = ? `, id, (err) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });
      }  
exports.deleteAdminFahrzeugeTanken = (req, res) => {
    const id = req.params.id;   
    connection.query(`DELETE FROM tanken WHERE Id = ? `, id, (err) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });
      } 