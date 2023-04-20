const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// View Werkzeuge
exports.viewWerkzeuge = (req, res) => {
  let searchQuery = req.query.search;
  let filterQuery = req.query['tool-type'];
  let isFiltering = false; // Hier initialisieren
  let query = `SELECT * FROM werkzeug`;
  if (searchQuery) {
    query += ` WHERE Name LIKE '%${searchQuery}%'`;
    isFiltering = true; // Hier setzen
  } else if (filterQuery) {
    query += ` WHERE Bezeichnung ='${filterQuery}'`;
    isFiltering = true; // Hier setzen
  }
  connection.query(query, (err, rows) => {
    if (!err) {
      let removedWerkzeug = req.query.removed;
      res.render('werkzeug', { rows, removedWerkzeug, isFiltering }); // Hier übergeben
    } else {
      console.log(err);
    }
    console.log('The data from Werkzeug table: \n', rows);
  }); 
};
//Edit Werkzeug
exports.editWerkzeug = (req, res) =>{
  const arbeitername = req.session.user.username;
  connection.query(`SELECT * FROM werkzeug WHERE id = ?`, [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
      return res.render('edit-werkzeug', { rows: rows[0] });
    }
    
    connection.query(`SELECT * FROM werkzeugpeist WHERE WerkzeugId = ?`, [req.params.id], (err, rowsPeist) => {
      if (err) {
        console.log(err);
        return res.render('edit-werkzeug', { rows: rows[0] });
      }
      
      connection.query(`SELECT * FROM werkzeugarosa WHERE WerkzeugId = ?`, [req.params.id], (err, rowsArosa) => {
        if (err) {
          console.log(err);
          return res.render('edit-werkzeug', { rows: rows[0] });
        } 

          connection.query(`SELECT * FROM werkzeugmitarbeiter WHERE WerkzeugId = ?`, [req.params.id], (err, rowsMitarbeiter) => {
            if (err) {
              console.log(err);
              return res.render('edit-werkzeug', { rows: rows[0] });
            }

              connection.query(`SELECT * FROM werkzeugkunde WHERE WerkzeugId = ?`, [req.params.id], (err, rowsKunde) => {
                if (err) {
                  console.log(err);
                  return res.render('edit-werkzeug', { rows: rows[0] });
                }

            
                const hasPeistData = rowsPeist.length > 0;
                const peistData = hasPeistData ? rowsPeist[0] : null;
                
                const hasArosaData = rowsArosa.length > 0;
                const arosaData = hasArosaData ? rowsArosa[0] : null;

                const hasMitarbeiterData = rowsMitarbeiter.length > 0;
                const mitarbeiterData = hasMitarbeiterData ? rowsMitarbeiter[0] : null;

                const hasKundeData = rowsKunde.length > 0;
                const kundeData = hasKundeData ? rowsKunde[0] : null;
            
            res.render('edit-werkzeug', { 
                rows: rows[0],
                rowsPeist: rowsPeist,
                rowsArosa: rowsArosa,
                rowsMitarbeiter: rowsMitarbeiter, 
                rowsKunde: rowsKunde, 
                peistData: peistData, 
                arosaData: arosaData, 
                mitarbeiterData: mitarbeiterData, 
                kundeData: kundeData, 
                hasPeistData: hasPeistData, 
                hasArosaData: hasArosaData, 
                hasMitarbeiterData: hasMitarbeiterData, 
                hasKundeData: hasKundeData
            });
          });
        });
      });
    });
  });
};
exports.editWerkzeugPeist = (req, res) => {
  const peistId = req.params.id;
  connection.query(`SELECT * FROM werkzeugpeist WHERE id = ?`, [peistId], (err, rows) => {
    if (!err) {
      const werkzeugId = rows[0].WerkzeugId; // Hier wird die WerkzeugId aus dem Ergebnis extrahiert
      connection.query(`SELECT * FROM werkzeug WHERE id = ?`, [werkzeugId], (err, rowswerkzeug) => {
        if (!err) {
          return res.render('edit-werkzeug-peist', { rows: rows[0], rowswerkzeug: rowswerkzeug[0] }); // rowswerkzeug sollte auch [0] haben
        }  
        res.render('edit-werkzeug', { 
          rows: rows[0] ,
          rowswerkzeug: rowswerkzeug[0],
          werkzeugId: werkzeugId
        });
      });
    } else {
      console.log(err);
      res.render('error', { message: 'Error retrieving data' });
    }
  });
};
exports.editWerkzeugArosa = (req, res) =>{
  const arosaId = req.params.id;
  connection.query(`SELECT * FROM werkzeugarosa WHERE id = ?`, [arosaId], (err, rows) => {
    if (!err) {
      const werkzeugId = rows[0].WerkzeugId; // Hier wird die WerkzeugId aus dem Ergebnis extrahiert
      connection.query(`SELECT * FROM werkzeug WHERE id = ?`, [werkzeugId], (err, rowswerkzeug) => {
        if (!err) {
          return res.render('edit-werkzeug-arosa', { rows: rows[0], rowswerkzeug: rowswerkzeug[0] }); // rowswerkzeug sollte auch [0] haben
        }  
        res.render('edit-werkzeug', { 
          rows: rows[0] ,
          rowswerkzeug: rowswerkzeug[0],
          werkzeugId: werkzeugId
        });
      });
    } else {
      console.log(err);
      res.render('error', { message: 'Error retrieving data' });
    }
  }); 
};
exports.editWerkzeugMitarbeiter = (req, res) =>{
  const mitarbeiterId = req.params.id;
  connection.query(`SELECT * FROM werkzeugmitarbeiter WHERE id = ?`, [mitarbeiterId], (err, rows) => {
    if (!err) {
      const werkzeugId = rows[0].WerkzeugId; // Hier wird die WerkzeugId aus dem Ergebnis extrahiert
      connection.query(`SELECT * FROM werkzeug WHERE id = ?`, [werkzeugId], (err, rowswerkzeug) => {
        if (!err) {
          return res.render('edit-werkzeug-mitarbeiter', { rows: rows[0], rowswerkzeug: rowswerkzeug[0] }); // rowswerkzeug sollte auch [0] haben
        }  
        res.render('edit-werkzeug', { 
          rows: rows[0] ,
          rowswerkzeug: rowswerkzeug[0],
          werkzeugId: werkzeugId
        });
      });
    } else {
      console.log(err);
      res.render('error', { message: 'Error retrieving data' });
    }
  });
};
exports.editWerkzeugKunde = (req, res) =>{
  const kundeId = req.params.id;
  connection.query(`SELECT * FROM werkzeugkunde WHERE id = ?`, [kundeId], (err, rows) => {
    if (!err) {
      const werkzeugId = rows[0].WerkzeugId; // Hier wird die WerkzeugId aus dem Ergebnis extrahiert
      connection.query(`SELECT * FROM werkzeug WHERE id = ?`, [werkzeugId], (err, rowswerkzeug) => {
        if (!err) {
          return res.render('edit-werkzeug-kunde', { rows: rows[0], rowswerkzeug: rowswerkzeug[0] }); // rowswerkzeug sollte auch [0] haben
        }  
        res.render('edit-werkzeug', { 
          rows: rows[0] ,
          rowswerkzeug: rowswerkzeug[0],
          werkzeugId: werkzeugId         
        });
      });
    } else {
      console.log(err);
      res.render('error', { message: 'Error retrieving data' });
    }
  }); 
};
exports.editWerkzeugPeistEintrag = (req, res) => {
  const id = req.body['id'];
  // Delete the entry in the werkzeugpeist table with the given id
  connection.query('select * FROM werkzeugpeist WHERE id = ?', [id], (err, rows) => {
  connection.query('DELETE FROM werkzeugpeist WHERE id = ?', [id], (err, result) => {
    if (!rows[0]) {
      res.status(500).send('Keine Datensätze gefunden');
      console.log(id)
      return;
    }

    const arbeitername = req.session.user.username;
    let werkzeugarosa = req.body['Werkzeugarosa'];
    let werkzeugpeist = req.body['Werkzeugpeist'];
    let werkzeugkunde = req.body['Werkzeugkunde'];
   
      const tabellenname = req.body['aktion-select'];
      const spaltennameeins = 'Werkzeugarosa';
      const spaltennamezwei = 'Werkzeugpeist';
      const spaltennamedrei = 'Werkzeugkunde';
      const spaltennamevier = 'Werkzeugmitarbeiter'; 

    if (tabellenname === 'werkzeugmitarbeiter') {
      connection.query(`UPDATE werkzeug SET AnzahlPeist = AnzahlPeist - 1, AnzahlMitarbeiter = AnzahlMitarbeiter + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      });  
    } else if (tabellenname === 'werkzeugkunde') {
      connection.query(`UPDATE werkzeug SET AnzahlPeist = AnzahlPeist - 1, AnzahlKunden = AnzahlKunden + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      }); 
    } else if (tabellenname === 'werkzeugpeist') {
      connection.query(`UPDATE werkzeug SET AnzahlPeist = AnzahlPeist - 1, AnzahlPeist = AnzahlPeist + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      }); 
    }
      else if (tabellenname === 'werkzeugarosa') {
        connection.query(`UPDATE werkzeug SET AnzahlPeist = AnzahlPeist - 1, AnzahlArosa = AnzahlArosa + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
          } else { 
          }
        }); 
      }
    else {
      res.status(500).send('wekzeug wurde nicht richtig suptrahiert und addiert');
      return;
    }
    const notiz = req.body['notiz'];
    const values = [rows[0].WerkzeugId, werkzeugarosa, werkzeugpeist, werkzeugkunde, arbeitername, notiz, arbeitername];
    connection.query(`INSERT INTO ${tabellenname} (WerkzeugId, ${spaltennameeins}, ${spaltennamezwei}, ${spaltennamedrei}, ${spaltennamevier}, Notiz, Bearbeiter) VALUES ( ?, ?, ?, ?, ?, ?, ?)`, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Fehler beim Einfügen eines neuen Eintrags in die ${tabellenname}-Tabelle`);
      } else {
        res.redirect('/editwerkzeug/'+ rows[0].WerkzeugId);
      }
    });
    });
  });
};
exports.editWerkzeugArosaEintrag = (req, res) => {
  const id = req.body['id'];
  // Delete the entry in the werkzeugpeist table with the given id
  connection.query('select * FROM werkzeugarosa WHERE id = ?', [id], (err, rows) => {
  connection.query('DELETE FROM werkzeugarosa WHERE id = ?', [id], (err, result) => {      
    if (!rows[0]) {
      res.status(500).send('Keine Datensätze gefunden');
      console.log(id)
      return;
    }
    const arbeitername = req.session.user.username;
    let werkzeugarosa = req.body['Werkzeugarosa'];
    let werkzeugpeist = req.body['Werkzeugpeist'];
    let werkzeugkunde = req.body['Werkzeugkunde'];
   
      const tabellenname = req.body['aktion-select'];
      const spaltennameeins = 'Werkzeugarosa';
      const spaltennamezwei = 'Werkzeugpeist';
      const spaltennamedrei = 'Werkzeugkunde';
      const spaltennamevier = 'Werkzeugmitarbeiter'; 


    if (tabellenname === 'werkzeugmitarbeiter') {
      connection.query(`UPDATE werkzeug SET AnzahlArosa = AnzahlArosa - 1, AnzahlMitarbeiter = AnzahlMitarbeiter + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      });  
    } else if (tabellenname === 'werkzeugkunde') {
      connection.query(`UPDATE werkzeug SET AnzahlArosa = AnzahlArosa - 1, AnzahlKunden = AnzahlKunden + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      }); 
    } else if (tabellenname === 'werkzeugpeist') {
      connection.query(`UPDATE werkzeug SET AnzahlArosa = AnzahlArosa - 1, AnzahlPeist = AnzahlPeist + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      }); 
    }
      else if (tabellenname === 'werkzeugarosa') {
        connection.query(`UPDATE werkzeug SET AnzahlArosa = AnzahlArosa - 1, AnzahlArosa = AnzahlArosa + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
          } else { 
          }
        }); 
      }
    else {
      res.status(500).send('wekzeug wurde nicht richtig suptrahiert und addiert');
      return;
    }
    const notiz = req.body['notiz'];
    const values = [rows[0].WerkzeugId, werkzeugarosa, werkzeugpeist, werkzeugkunde, arbeitername, notiz, arbeitername];
    connection.query(`INSERT INTO ${tabellenname} (WerkzeugId, ${spaltennameeins}, ${spaltennamezwei}, ${spaltennamedrei}, ${spaltennamevier}, Notiz, Bearbeiter) VALUES ( ?, ?, ?, ?, ?, ?, ?)`, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Fehler beim Einfügen eines neuen Eintrags in die ${tabellenname}-Tabelle`);
      } else {
        res.redirect('/editwerkzeug/'+ rows[0].WerkzeugId);
      }
    });
    });
  });
};
exports.editWerkzeugKundenEintrag = (req, res) => {
  const id = req.body['id'];
  // Delete the entry in the werkzeugpeist table with the given id
  connection.query('select * FROM werkzeugkunde WHERE id = ?', [id], (err, rows) => {
  connection.query('DELETE FROM werkzeugkunde WHERE id = ?', [id], (err, result) => {
    let werkzeugarosa = req.body['Werkzeugarosa'];
    let werkzeugpeist = req.body['Werkzeugpeist'];
    let werkzeugkunde = req.body['Werkzeugkunde'];
    if (!rows[0]) {
      res.status(500).send('Keine Datensätze gefunden');
      console.log(id)
      return;
    }
      const tabellenname = req.body['aktion-select'];
      const spaltennameeins = 'Werkzeugarosa';
      const spaltennamezwei = 'Werkzeugpeist';
      const spaltennamedrei = 'Werkzeugkunde';
      const spaltennamevier = 'Werkzeugmitarbeiter';

    const arbeitername = req.session.user.username;

    if (tabellenname === 'werkzeugmitarbeiter') {
      connection.query(`UPDATE werkzeug SET AnzahlKunden = AnzahlKunden - 1, AnzahlMitarbeiter = AnzahlMitarbeiter + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      });  
    } else if (tabellenname === 'werkzeugkunde') {
      connection.query(`UPDATE werkzeug SET AnzahlKunden = AnzahlKunden - 1, AnzahlKunden = AnzahlKunden + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      }); 
    } else if (tabellenname === 'werkzeugpeist') {
      connection.query(`UPDATE werkzeug SET AnzahlKunden = AnzahlKunden - 1, AnzahlPeist = AnzahlPeist + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      }); 
    }
      else if (tabellenname === 'werkzeugarosa') {
        connection.query(`UPDATE werkzeug SET AnzahlKunden = AnzahlKunden - 1, AnzahlArosa = AnzahlArosa + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
          } else { 
          }
        }); 
      }
    else {
      res.status(500).send('wekzeug wurde nicht richtig suptrahiert und addiert');
      return;
    }
    const notiz = req.body['notiz'];
    const values = [rows[0].WerkzeugId, werkzeugarosa, werkzeugpeist, werkzeugkunde, arbeitername, notiz, arbeitername];
    connection.query(`INSERT INTO ${tabellenname} (WerkzeugId, ${spaltennameeins}, ${spaltennamezwei}, ${spaltennamedrei}, ${spaltennamevier}, Notiz, Bearbeiter) VALUES ( ?, ?, ?, ?, ?, ?, ?)`, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Fehler beim Einfügen eines neuen Eintrags in die ${tabellenname}-Tabelle`);
      } else {
        res.redirect('/editwerkzeug/'+ rows[0].WerkzeugId);
      }
    });
    });
  });
};
exports.editWerkzeugMitarbeiterEintrag = (req, res) => {
  const id = req.body['id'];
  // Delete the entry in the werkzeugpeist table with the given id
  connection.query('select * FROM werkzeugmitarbeiter WHERE id = ?', [id], (err, rows) => {
  connection.query('DELETE FROM werkzeugmitarbeiter WHERE id = ?', [id], (err, result) => {
    let werkzeugarosa = req.body['Werkzeugarosa'];
    let werkzeugpeist = req.body['Werkzeugpeist'];
    let werkzeugkunde = req.body['Werkzeugkunde'];
    if (!rows[0]) {
      res.status(500).send('Keine Datensätze gefunden');
      console.log(id)
      return;
    }
      const tabellenname = req.body['aktion-select'];
      const spaltennameeins = 'Werkzeugarosa';
      const spaltennamezwei = 'Werkzeugpeist';
      const spaltennamedrei = 'Werkzeugkunde';
      const spaltennamevier = 'Werkzeugmitarbeiter';

    const arbeitername = req.session.user.username;

    if (tabellenname === 'werkzeugmitarbeiter') {
      connection.query(`UPDATE werkzeug SET AnzahlMitarbeiter = AnzahlMitarbeiter - 1, AnzahlMitarbeiter = AnzahlMitarbeiter + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      });  
    } else if (tabellenname === 'werkzeugkunde') {
      connection.query(`UPDATE werkzeug SET AnzahlMitarbeiter = AnzahlMitarbeiter - 1, AnzahlKunden = AnzahlKunden + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      }); 
    } else if (tabellenname === 'werkzeugpeist') {
      connection.query(`UPDATE werkzeug SET AnzahlMitarbeiter = AnzahlMitarbeiter - 1, AnzahlPeist = AnzahlPeist + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
        } else { 
        }
      }); 
    }
      else if (tabellenname === 'werkzeugarosa') {
        connection.query(`UPDATE werkzeug SET AnzahlMitarbeiter = AnzahlMitarbeiter - 1, AnzahlArosa = AnzahlArosa + 1 WHERE id = ?`, [rows[0].WerkzeugId], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Fehler beim Aktualisieren des Werkzeugs');
          } else { 
          }
        }); 
      } 
    else {
      res.status(500).send('wekzeug wurde nicht richtig suptrahiert und addiert');
      return;
    }
    const notiz = req.body['notiz'];
    const values = [rows[0].WerkzeugId, werkzeugarosa, werkzeugpeist, werkzeugkunde, arbeitername, notiz, arbeitername];
    connection.query(`INSERT INTO ${tabellenname} (WerkzeugId, ${spaltennameeins}, ${spaltennamezwei}, ${spaltennamedrei}, ${spaltennamevier}, Notiz, Bearbeiter) VALUES ( ?, ?, ?, ?, ?, ?, ?)`, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Fehler beim Einfügen eines neuen Eintrags in die ${tabellenname}-Tabelle`);
      } else {
        res.redirect('/editwerkzeug/'+ rows[0].WerkzeugId);
      }
    });
    });
  });
};