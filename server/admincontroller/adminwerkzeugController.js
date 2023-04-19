const mysql = require('mysql');

 
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); 
exports.viewAdminWerkzeug = (req, res) => { 
    let searchQuery = req.query.search;
    let filterQuery = req.query['select'];
    let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
    let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
    //Alle Werkzeuge
    let query = `SELECT * FROM werkzeug `; 
    if (filterQuery && searchQuery) {
      query = `SELECT * FROM werkzeug WHERE Bezeichnung ='${filterQuery}' AND Name LIKE '%${searchQuery}%' ORDER BY ${sortColumn} ${sortOrder}`;
    } else if (filterQuery) {
      query = `SELECT * FROM werkzeug WHERE Bezeichnung ='${filterQuery}' ORDER BY ${sortColumn} ${sortOrder}`;
    } else if (searchQuery) {
      query = `SELECT * FROM werkzeug WHERE Name LIKE '%${searchQuery}%' ORDER BY ${sortColumn} ${sortOrder}`;
    } else {
      query = `SELECT * FROM werkzeug ORDER BY ${sortColumn} ${sortOrder}`;
    }
      connection.query(query, (err, rows) => {
            if (!err) {
              res.render('adminwerkzeug', { rows, sortColumn, sortOrder});
            } else {
              console.log(err);
            }
            });
          }
exports.viewAdminWerkzeugArosa = (req, res) => { 
    let searchQuery = req.query.search;
    let sortOrder = req.query.sortOrder || "ASC";
    let sortColumArosa = req.query.sortArosaBy || "WerkzeugId"; 
    let querya = `SELECT * FROM werkzeugarosa `;
    let query = `SELECT * FROM werkzeug `; 

    if (searchQuery) {
      querya = `SELECT * FROM werkzeugarosa WHERE WerkzeugId LIKE '%${searchQuery}%' OR Bearbeiter LIKE '%${searchQuery}%' ORDER BY ${sortColumArosa} ${sortOrder}`;
    } else {
      querya = `SELECT * FROM werkzeugarosa ORDER BY ${sortColumArosa} ${sortOrder}`;
    }

connection.query(query, (err, rows) => {
    connection.query(querya, (err, rowsArosa) =>{
      if(!err){
        res.render('adminwerkzeugarosa', { sortOrder, rowsArosa, rows});
                          } else {
                            console.log(err);
                       }
                 });
            });
        }  
exports.viewAdminWerkzeugPeist = (req, res) => {
  let searchQuery = req.query.search;
  let sortColumn = req.query.sortBy || "id";
  let sortOrder = req.query.sortOrder || "ASC";
     //Peist
     let sortColumPeist = req.query.sortPeistBy || "WerkzeugId"; 
     let queryp = `SELECT * FROM werkzeugpeist `;
     let query = `SELECT * FROM werkzeug `;

     if (searchQuery) {
      queryp = `SELECT * FROM werkzeugpeist WHERE WerkzeugId LIKE '%${searchQuery}%' OR Bearbeiter LIKE '%${searchQuery}%' ORDER BY ${sortColumPeist} ${sortOrder}`;
    } else {
      queryp = `SELECT * FROM werkzeugpeist ORDER BY ${sortColumPeist} ${sortOrder}`;
    }
connection.query(query, (err, rows) => {
  connection.query(queryp, (err, rowsPeist) =>{
    if(!err){
      res.render('adminwerkzeugpeist', {sortColumn, sortOrder, rowsPeist, rows});
                        } else {
                          console.log(err);
                      }
                });
              });
            } 
exports.viewAdminWerkzeugMitarbeiter = (req, res) => {
  let searchQuery = req.query.search;
  let sortColumn = req.query.sortBy || "id";
  let sortOrder = req.query.sortOrder || "ASC";
   //Mitarbeiter
   let sortColumMitarbeiter = req.query.sortMitarbeiterBy || "WerkzeugId"; 
   let querym = `SELECT * FROM werkzeugmitarbeiter `;
   let query = `SELECT * FROM werkzeug `; 
   if (searchQuery) {
    querym = `SELECT * FROM werkzeugmitarbeiter WHERE WerkzeugId LIKE '%${searchQuery}%' OR Bearbeiter LIKE '%${searchQuery}%' ORDER BY ${sortColumMitarbeiter} ${sortOrder}`;
  } else {
    querym = `SELECT * FROM werkzeugmitarbeiter ORDER BY ${sortColumMitarbeiter} ${sortOrder}`;
  }
connection.query(query, (err, rows) => {
   connection.query(querym, (err, rowsMitarbeiter) =>{
    if(!err){
      res.render('adminwerkzeugmitarbeiter', {sortColumn, sortOrder, rowsMitarbeiter, rows});
                        } else {
                          console.log(err);
                      }
                });
          });
      }  
exports.viewAdminWerkzeugKunde = (req, res) => {
  let searchQuery = req.query.search;
  let sortColumn = req.query.sortBy || "id";
  let sortOrder = req.query.sortOrder || "ASC";
    //Kunde
    let sortColumKunde = req.query.sortKundeBy || "WerkzeugId"; 
    let queryk = `SELECT * FROM werkzeugkunde `;
    let query = `SELECT * FROM werkzeug `; 
    if (searchQuery) {
      queryk = `SELECT * FROM werkzeugkunde WHERE WerkzeugId LIKE '%${searchQuery}%' OR Bearbeiter LIKE '%${searchQuery}%' ORDER BY ${sortColumKunde} ${sortOrder}`;
    } else {
      queryk = `SELECT * FROM werkzeugkunde ORDER BY ${sortColumKunde} ${sortOrder}`;
    }
  connection.query(query, (err, rows) => {
    connection.query(queryk, (err, rowsKunde) =>{
    if(!err){
      res.render('adminwerkzeugkunde', {sortColumn, sortOrder, rowsKunde, rows});
                        } else {
                          console.log(err);
                      }
                });
          });
      } 
exports.updateAdminWerkzeug = (req, res) => {
            const id = req.params.id;   
            const bezeichnung = req.body['bezeichnung'];
            const name = req.body['name'];
            const mitarbeiter = req.body['mitarbeiter'];
            const arosa = req.body['arosa'];
            const peist = req.body['peist'];
            const kunde = req.body['kunden'];
            const artnr = req.body['artnr'];
            const lieferant = req.body['lieferant'];
            const values = [id, bezeichnung, name, mitarbeiter, arosa, peist, kunde, artnr, lieferant, id];
            console.log(values);
            connection.query(`UPDATE werkzeug SET Id = ?, Bezeichnung = ?, Name = ?, AnzahlMitarbeiter = ?, AnzahlArosa = ?, AnzahlPeist = ?, AnzahlKunden = ?, Artikelnummer = ? ,Lieferant = ? WHERE Id = ? `, values, (err, rows) => {
                    if (!err) {
                    res.redirect('back');
                    } else {
                    console.log(err);
                    }
                });
              } 
exports.updateAdminWerkzeugArosa = (req, res) => {
  const id = req.params.id;   
  const werkzeugid = req.body['werkzeugid'];
  const werkzeugarosa = req.body['werkzeugarosa'];
  const werkzeugkunde = req.body['werkzeugkunde'];
  const werkzeugpeist = req.body['werkzeugpeist'];
  const werkzeugmitarbeiter = req.body['werkzeugmitarbeiter'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const values = [id, werkzeugid, werkzeugarosa, werkzeugkunde, werkzeugpeist, werkzeugmitarbeiter, notiz, bearbeiter, id];
  connection.query(`UPDATE werkzeugarosa SET Id = ?, WerkzeugId = ?, Werkzeugarosa = ?,  Werkzeugkunde = ? , Werkzeugpeist = ? , Werkzeugmitarbeiter = ?, Notiz = ?, Bearbeiter = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.updateAdminWerkzeugPeist = (req, res) => {
  const id = req.params.id;   
  const werkzeugid = req.body['werkzeugid'];
  const werkzeugarosa = req.body['werkzeugarosa'];
  const werkzeugkunde = req.body['werkzeugkunde'];
  const werkzeugpeist = req.body['werkzeugpeist'];
  const werkzeugmitarbeiter = req.body['werkzeugmitarbeiter'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const values = [id, werkzeugid, werkzeugarosa, werkzeugkunde, werkzeugpeist, werkzeugmitarbeiter, notiz, bearbeiter, id];
  connection.query(`UPDATE werkzeugpeist SET Id = ?, WerkzeugId = ?, Werkzeugarosa = ?,  Werkzeugkunde = ? , Werkzeugpeist = ? , Werkzeugmitarbeiter = ?, Notiz = ?, Bearbeiter = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.updateAdminWerkzeugMitarbeiter = (req, res) => {
  const id = req.params.id;   
  const werkzeugid = req.body['werkzeugid'];
  const werkzeugarosa = req.body['werkzeugarosa'];
  const werkzeugkunde = req.body['werkzeugkunde'];
  const werkzeugpeist = req.body['werkzeugpeist'];
  const werkzeugmitarbeiter = req.body['werkzeugmitarbeiter'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const values = [id, werkzeugid, werkzeugarosa, werkzeugkunde, werkzeugpeist, werkzeugmitarbeiter, notiz, bearbeiter, id];
  connection.query(`UPDATE werkzeugmitarbeiter SET Id = ?, WerkzeugId = ?, Werkzeugarosa = ?,  Werkzeugkunde = ? , Werkzeugpeist = ? , Werkzeugmitarbeiter = ?, Notiz = ?, Bearbeiter = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.updateAdminWerkzeugKunde = (req, res) => {
  const id = req.params.id;   
  const werkzeugid = req.body['werkzeugid'];
  const werkzeugarosa = req.body['werkzeugarosa'];
  const werkzeugkunde = req.body['werkzeugkunde'];
  const werkzeugpeist = req.body['werkzeugpeist'];
  const werkzeugmitarbeiter = req.body['werkzeugmitarbeiter'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const values = [id, werkzeugid, werkzeugarosa, werkzeugkunde, werkzeugpeist, werkzeugmitarbeiter, notiz, bearbeiter, id];
  connection.query(`UPDATE werkzeugkunde SET Id = ?, WerkzeugId = ?, Werkzeugarosa = ?,  Werkzeugkunde = ? , Werkzeugpeist = ? , Werkzeugmitarbeiter = ?, Notiz = ?, Bearbeiter = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.updateAdminWerkzeugAnzahlArosa = (req, res) => {
  const id = req.params.id;   
  const anzahl = req.body['anzahl'];
  const values = [anzahl, id];
  connection.query(`UPDATE werkzeug SET AnzahlArosa = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      }); 
    } 
exports.updateAdminWerkzeugAnzahlPeist = (req, res) => {
  const id = req.params.id;   
  const anzahl = req.body['anzahl'];
  const values = [anzahl, id];
  connection.query(`UPDATE werkzeug SET AnzahlPeist = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          console.log(values);
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }
exports.adminanzahlwerkzeugmitarbeiter = (req, res) => {
  const id = req.params.id;   
  const anzahl = req.body['anzahl'];
  const values = [anzahl, id];
  connection.query(`UPDATE werkzeug SET AnzahlMitarbeiter = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          console.log(values);
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }  
exports.adminanzahlwerkzeugkunde = (req, res) => {
  const id = req.params.id;   
  const anzahl = req.body['anzahl'];
  const values = [anzahl, id];
  connection.query(`UPDATE werkzeug SET AnzahlKunden = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          console.log(values);
          res.redirect('back');
        } else { 
          console.log(err);
        }
      });
    }  
exports.saveAdminWerkzeug = (req, res) => { 
      const bezeichnung = req.body['bezeichnung'];
      const name = req.body['name'];
      const mitarbeiter = req.body['mitarbeiter'];
      const arosa = req.body['arosa'];
      const peist = req.body['peist'];
      const kunde = req.body['kunden'];
      const artnr = req.body['artnr'];
      const lieferant = req.body['lieferant'];
      const values = [bezeichnung, name, mitarbeiter, arosa, peist, kunde, artnr, lieferant];
      console.log(values);
      connection.query(`INSERT INTO werkzeug (Bezeichnung, Name, AnzahlMitarbeiter, AnzahlArosa, AnzahlPeist, AnzahlKunden, Artikelnummer ,Lieferant) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
            if (!err) {
              res.redirect('back');
            } else {
              console.log(err);
            }
          });  
        } 
exports.saveAdminWerkzeugArosa = (req, res) => { 
  const werkzeugid = req.body['werkzeugid'];
  const werkzeugarosa = req.body['werkzeugarosa'];
  const werkzeugkunde = req.body['werkzeugkunde'];
  const werkzeugpeist = req.body['werkzeugpeist'];
  const werkzeugmitarbeiter = req.body['werkzeugmitarbeiter'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const values = [werkzeugid, werkzeugarosa, werkzeugkunde, werkzeugpeist, werkzeugmitarbeiter, notiz, bearbeiter];
  connection.query(`INSERT INTO werkzeugarosa (WerkzeugId, Werkzeugarosa, Werkzeugkunde, Werkzeugpeist, Werkzeugmitarbeiter, Notiz, Bearbeiter) VALUES (?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }
exports.saveAdminWerkzeugPeist = (req, res) => { 
  const werkzeugid = req.body['werkzeugid'];
  const werkzeugarosa = req.body['werkzeugarosa'];
  const werkzeugkunde = req.body['werkzeugkunde'];
  const werkzeugpeist = req.body['werkzeugpeist'];
  const werkzeugmitarbeiter = req.body['werkzeugmitarbeiter'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const values = [werkzeugid, werkzeugarosa, werkzeugkunde, werkzeugpeist, werkzeugmitarbeiter, notiz, bearbeiter];
  connection.query(`INSERT INTO werkzeugpeist (WerkzeugId, Werkzeugarosa, Werkzeugkunde, Werkzeugpeist, Werkzeugmitarbeiter, Notiz, Bearbeiter) VALUES (?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        } 
      });
    }
exports.saveAdminWerkzeugMitarbeiter = (req, res) => { 
  const werkzeugid = req.body['werkzeugid'];
  const werkzeugarosa = req.body['werkzeugarosa'];
  const werkzeugkunde = req.body['werkzeugkunde'];
  const werkzeugpeist = req.body['werkzeugpeist'];
  const werkzeugmitarbeiter = req.body['werkzeugmitarbeiter'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const values = [werkzeugid, werkzeugarosa, werkzeugkunde, werkzeugpeist, werkzeugmitarbeiter, notiz, bearbeiter];
  connection.query(`INSERT INTO werkzeugmitarbeiter (WerkzeugId, Werkzeugarosa, Werkzeugkunde, Werkzeugpeist, Werkzeugmitarbeiter, Notiz, Bearbeiter) VALUES (?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }
exports.saveAdminWerkzeugKunde = (req, res) => { 
  const werkzeugid = req.body['werkzeugid'];
  const werkzeugarosa = req.body['werkzeugarosa'];
  const werkzeugkunde = req.body['werkzeugkunde'];
  const werkzeugpeist = req.body['werkzeugpeist'];
  const werkzeugmitarbeiter = req.body['werkzeugmitarbeiter'];
  const notiz = req.body['notiz'];
  const bearbeiter = req.body['bearbeiter'];
  const values = [werkzeugid, werkzeugarosa, werkzeugkunde, werkzeugpeist, werkzeugmitarbeiter, notiz, bearbeiter];
  connection.query(`INSERT INTO werkzeugkunde (WerkzeugId, Werkzeugarosa, Werkzeugkunde, Werkzeugpeist, Werkzeugmitarbeiter, Notiz, Bearbeiter) VALUES (?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }
exports.deleteAdminWerkzeug = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM werkzeug WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.deleteAdminWerkzeugArosa = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM werkzeugarosa WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.deleteAdminWerkzeugPeist = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM werkzeugpeist WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.deleteAdminWerkzeugMitarbeiter = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM werkzeugmitarbeiter WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.deleteAdminWerkzeugKunde = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM werkzeugkunde WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    } 
exports.orderAdminWerkzeugArosa = (req, res) => { 
  connection.query(`SET @count = 0`, (err) => {
    if (!err) {
      connection.query(`UPDATE werkzeugarosa SET id = (@count:= @count + 1)`, (err) => {
        if (!err) {
          connection.query(`ALTER TABLE werkzeugarosa AUTO_INCREMENT = 1`, (err) => {
            if (!err) {
              res.redirect('back');
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}
exports.orderAdminWerkzeugPeist = (req, res) => { 
  connection.query(`SET @count = 0`, (err) => {
    if (!err) {
      connection.query(`UPDATE werkzeugpeist SET id = (@count:= @count + 1)`, (err) => {
        if (!err) {
          connection.query(`ALTER TABLE werkzeugpeist AUTO_INCREMENT = 1`, (err) => {
            if (!err) {
              res.redirect('back');
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}
exports.orderAdminWerkzeugMitarbeiter = (req, res) => { 
  connection.query(`SET @count = 0`, (err) => {
    if (!err) {
      connection.query(`UPDATE werkzeugmitarbeiter SET id = (@count:= @count + 1)`, (err) => {
        if (!err) {
          connection.query(`ALTER TABLE werkzeugmitarbeiter AUTO_INCREMENT = 1`, (err) => {
            if (!err) {
              res.redirect('back');
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}
exports.orderAdminWerkzeugKunde = (req, res) => { 
  connection.query(`SET @count = 0`, (err) => {
    if (!err) {
      connection.query(`UPDATE werkzeugkunde SET id = (@count:= @count + 1)`, (err) => {
        if (!err) {
          connection.query(`ALTER TABLE werkzeugkunde AUTO_INCREMENT = 1`, (err) => {
            if (!err) {
              res.redirect('back');
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}   
