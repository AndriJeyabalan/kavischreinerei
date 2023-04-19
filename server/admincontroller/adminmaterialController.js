const mysql = require('mysql');


// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); 
 
exports.viewAdminMaterial = (req, res) => { 
      let searchQuery = req.query.search;
      let filterQuery = req.query['select'];
      let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
      let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
      //Alle Werkzeuge
      let query = `SELECT * FROM material `; 
      if (filterQuery && searchQuery) {
        query = `SELECT * FROM material WHERE Bezeichnung ='${filterQuery}' AND Name LIKE '%${searchQuery}%' ORDER BY ${sortColumn} ${sortOrder}`;
      } else if (filterQuery) {
        query = `SELECT * FROM material WHERE Bezeichnung ='${filterQuery}' ORDER BY ${sortColumn} ${sortOrder}`;
      } else if (searchQuery) {
        query = `SELECT * FROM material WHERE Name LIKE '%${searchQuery}%' ORDER BY ${sortColumn} ${sortOrder}`;
      } else {
        query = `SELECT * FROM material ORDER BY ${sortColumn} ${sortOrder}`;
      }
            connection.query(query, (err, rows) => {
                  if (!err) {
                    res.render('adminmaterial', { rows, sortColumn, sortOrder });
                  } else {
                    console.log(err);
                }
              });
            }
exports.viewAdminMaterialArosa = (req, res) => { 
    let searchQuery = req.query.search;
    let sortOrder = req.query.sortOrder || "ASC";
    let sortColumArosa = req.query.sortArosaBy || "MaterialId"; 
    let querya = "";
    let query = `SELECT * FROM material `; 
    if (searchQuery) {
      querya = `SELECT * , DATE_FORMAT(Datum, '%Y.%m.%d') AS formatiertes_Datum FROM materialarosa WHERE MaterialId LIKE '%${searchQuery}%' OR Bearbeiter LIKE '%${searchQuery}%' ORDER BY ${sortColumArosa} ${sortOrder}`;
    } else {
      querya = `SELECT * , DATE_FORMAT(Datum, '%Y.%m.%d') AS formatiertes_Datum FROM materialarosa ORDER BY ${sortColumArosa} ${sortOrder}`;
    }

connection.query(query, (err, rows) => {
    connection.query(querya, (err, rowsArosa) =>{
      if(!err){
        res.render('adminmaterialarosa', {sortColumArosa, sortOrder, rowsArosa, rows});
                          } else {
                            console.log(err);
                        }
                  });
            });
        }   
exports.viewAdminMaterialPeist = (req, res) => {
  let searchQuery = req.query.search;
  let sortColumn = req.query.sortBy || "id";
  let sortOrder = req.query.sortOrder || "ASC";
  let sortColumPeist = req.query.sortPeistBy || "MaterialId"; 
  let query = `SELECT * FROM material `;
  let queryp = ""
  if (searchQuery) {
    queryp = `SELECT * , DATE_FORMAT(Datum, '%Y.%m.%d') AS formatiertes_Datum FROM materialpeist WHERE MaterialId LIKE '%${searchQuery}%' OR Bearbeiter LIKE '%${searchQuery}%' ORDER BY ${sortColumPeist} ${sortOrder}`;
  } else {
    queryp = `SELECT * , DATE_FORMAT(Datum, '%Y.%m.%d') AS formatiertes_Datum FROM materialpeist ORDER BY ${sortColumPeist} ${sortOrder}`;
  }
connection.query(query, (err, rows) => {
  connection.query(queryp, (err, rowsPeist) =>{
    if(!err){
      res.render('adminmaterialpeist', {sortColumn, sortOrder, rowsPeist, rows});
                        } else {
                          console.log(err);
                      }
                });
              });
            }  
exports.updateAdminMaterial = (req, res) => {
  const id = req.params.id;   
  const bezeichnung = req.body['bezeichnung'];
  const name = req.body['name'];
  const arosa = req.body['arosa'];
  const peist = req.body['peist'];
  const artnr = req.body['artnr'];
  const lieferant = req.body['lieferant'];
  const einkaufspreis = req.body['einkaufspreis'];
  const verkaufspreis = req.body['verkaufspreis'];
  const values = [id, bezeichnung, name, arosa, peist, artnr, lieferant, einkaufspreis, verkaufspreis, id];
  connection.query(`UPDATE material SET Id = ?, Bezeichnung = ?, Name = ?, AnzahlArosa = ?, AnzahlPeist = ?, Artikelnummer = ? ,Lieferant = ?, Einkaufspreis = ?, Verkaufspreis = ? WHERE Id = ? `, values, (err, rows) => {
          if (!err) {
          res.redirect('back');
          } else {
          console.log(err);
          }
      });
    } 
exports.updateAdminMaterialArosa = (req, res) => {
  const id = req.params.id;   
  const materialid = req.body['materialid'];
  const aufenthaltsort = req.body['aufenthaltsort'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const datum = req.body['datum'];
  const values = [id, materialid, aufenthaltsort, notiz, bearbeiter, datum, id];
  connection.query(`UPDATE materialarosa SET Id = ?, MaterialId = ?, Aufenthaltsort = ?, Notiz = ?, Bearbeiter = ?, Datum = ? WHERE Id = ? `, values, (err, rows) => {
          if (!err) {
          res.redirect('back');
          } else {
          console.log(err);
          }
      });
    } 
exports.updateAdminMaterialPeist = (req, res) => {
  const id = req.params.id;   
  const materialid = req.body['materialid'];
  const aufenthaltsort = req.body['aufenthaltsort'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const datum = req.body['datum'];
  const values = [id, materialid, aufenthaltsort, notiz, bearbeiter, datum, id];
  connection.query(`UPDATE materialpeist SET Id = ?, MaterialId = ?, Aufenthaltsort = ?, Notiz = ?, Bearbeiter = ?, Datum = ? WHERE Id = ? `, values, (err, rows) => {
          if (!err) {
          res.redirect('back');
          } else {
          console.log(err);
          }
      });
    } 
exports.updateAdminMaterialAnzahlArosa = (req, res) => {
  const id = req.params.id;   
  const anzahl = req.body['anzahl'];
  const values = [anzahl, id];
  connection.query(`UPDATE material SET AnzahlArosa = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });  
    } 
exports.updateAdminMaterialAnzahlPeist = (req, res) => {
  const id = req.params.id;   
  const anzahl = req.body['anzahl'];
  const values = [anzahl, id];
  connection.query(`UPDATE material SET AnzahlPeist = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }
exports.saveAdminMaterial = (req, res) => {  
  const bezeichnung = req.body['bezeichnung'];
  const name = req.body['name'];
  const arosa = req.body['arosa'];
  const peist = req.body['peist'];
  const artnr = req.body['artnr'];
  const lieferant = req.body['lieferant'];
  const einkaufspreis = req.body['einkaufspreis'];
  const verkaufspreis = req.body['verkaufspreis'];
  const values = [bezeichnung, name, arosa, peist, artnr, lieferant, einkaufspreis, verkaufspreis];
  connection.query(`INSERT INTO material (Bezeichnung, Name, AnzahlArosa, AnzahlPeist, Artikelnummer, Lieferant, Einkaufspreis, Verkaufspreis) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });  
    } 
exports.saveAdminMaterialArosa = (req, res) => { 
  const materialid = req.body['materialid'];
  const aufenthaltsort = req.body['aufenthaltsort'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const datum = req.body['datum'];
  const values = [materialid, aufenthaltsort, notiz, bearbeiter, datum];
  connection.query(`INSERT INTO materialarosa (MaterialId, Aufenthaltsort, Notiz, Bearbeiter, Datum) VALUES (?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });  
    } 
exports.saveAdminMaterialPeist = (req, res) => { 
  const materialid = req.body['materialid'];
  const aufenthaltsort = req.body['aufenthaltsort'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const datum = req.body['datum'];
  const values = [materialid, aufenthaltsort, notiz, bearbeiter, datum];
  connection.query(`INSERT INTO materialpeist (MaterialId, Aufenthaltsort, Notiz, Bearbeiter, Datum) VALUES (?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });  
    } 
exports.deleteAdminMaterial = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM material WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.deleteAdminMaterialArosa = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM materialarosa WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.deleteAdminMaterialPeist = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM materialpeist WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 