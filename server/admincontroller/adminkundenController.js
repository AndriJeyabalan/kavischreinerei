const mysql = require('mysql');
 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
exports.viewAdminKunden = (req, res) => { 
        let searchQuery = req.query.search;
        let filterQuery = req.query['filter-type'];
        let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
        let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
        
        let query = `SELECT * FROM kunden`;
        
        let whereClause = "";
        
        if (searchQuery && searchQuery != "") {
          if (whereClause) {
            whereClause += ` AND `;
          } else {
            whereClause += ` WHERE `;
          }
          whereClause += `Vorname LIKE '%${searchQuery}%' OR Nachname LIKE '%${searchQuery}%' `;
        }
        
        if (filterQuery) {
          if (whereClause) {
            whereClause += ` AND `;
          } else {
            whereClause += ` WHERE `;
          }
          whereClause += `Status ='${filterQuery}'`;
        }
        
        query += whereClause + ` ORDER BY ${sortColumn} ${sortOrder}`;
        

        connection.query(query, (err, rows) => {
              if (!err) {
                res.render('admin-kunden', { rows, sortColumn, sortOrder});
              } else {
                console.log(err);
              }
          });
}
exports.updateAdminKunden = (req, res) => {
    const id = req.params.id;   
    const vorname = req.body['vorname'];
    const nachname = req.body['nachname'];
    const strasse = req.body['strasse'];
    const hausnummer = req.body['hausnummer'];
    const haus = req.body['haus'];
    const plz = req.body['plz'];
    const ort = req.body['ort'];
    const telefonnummer = req.body['telefonnummer'];
    const ende = req.body['ende'];
    const status = req.body['status'];
    const values = [id, vorname, nachname, strasse, hausnummer, haus, plz, ort, telefonnummer, ende, status, id];
    connection.query(`UPDATE kunden SET id = ?, Vorname = ?, Nachname = ?, Strasse = ?, Hausnummer = ?, Haus = ?, PLZ = ?, Ort = ? ,Telefonnummer = ? ,Ende = ? ,Status = ? WHERE id = ? `, values, (err, rows) => {
          if (!err) {
            res.redirect('back');
          } else {
            console.log(err);
          }
        });
} 
exports.saveAdminKunden = (req, res) => {  
    const vorname = req.body['vorname'];
    const nachname = req.body['nachname'];
    const strasse = req.body['strasse'];
    const hausnummer = req.body['hausnummer'];
    const haus = req.body['haus'];
    const plz = req.body['plz'];
    const ort = req.body['ort'];
    const telefonnummer = req.body['telefonnummer'];
    const ende = req.body['ende'];
    const status = req.body['status'];
    const values = [vorname, nachname, strasse, hausnummer, haus, plz, ort, telefonnummer, ende, status];
    console.log(values);
    connection.query(`INSERT INTO kunden (Vorname, Nachname, Strasse, Hausnummer, Haus, PLZ, Ort ,Telefonnummer, Ende, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });  
} 
exports.deleteAdminkunden = (req, res) => {
    const id = req.params.id;   
    connection.query(`DELETE FROM kunden WHERE Id = ? `, id, (err) => {
            if (!err) {
            res.redirect('back');
            } else {
            console.log(err);
            }
        });
}  
exports.viewAdminKundenauftraege = (req, res) => { 
  const id = req.params.id;   
  let query = `
  SELECT ka.*, s.GesamtStunden, s.GesamtVerrechnet
  FROM kundenaufträge ka
  LEFT JOIN (
    SELECT KundenId, AuftragsId, SUM(Stunden) AS GesamtStunden, SUM(Verrechnet) AS GesamtVerrechnet
    FROM stunden
    WHERE KundenId = ${id} AND Kontrolliert = "Ja"
    GROUP BY KundenId, AuftragsId
  ) s ON ka.Id = s.AuftragsId
  WHERE ka.KundenId = ${id}
  ORDER BY ka.Id
`; 
  let querya = `SELECT * FROM stunden where KundenId = ? && Kontrolliert = 'Ja'`;
  let queryb = `SELECT * FROM kunden where Id = ?`;
  let filterQuery = req.query['filter-type'];
  if (filterQuery == "NULL") {
    querya += ` && AuftragsId = ""`;
  }
  if (filterQuery == "NOT") {
    querya += ` && AuftragsId != ""`;
  }
  connection.query(queryb, id, (err, rowsKunde) =>{
      if(!err){
    connection.query(querya, id, (err, rowsStunden) =>{
        if(!err){
        connection.query(query, id, (err, rows) => {
              if (!err) {
                      res.render('admin-kundenauftraege', { rows, id, rowsStunden, rowsKunde });
                      console.log(querya);
                    } else {
                      console.log(err);
                    } 
                    });
                  }
                  else {
                    console.log(err);
                  }
                });
              }else {
                console.log(err);
              }
            });
}
exports.saveAdminKundenauftraege = (req, res) => {  
  const id = req.body['id'];  
  const kurzbezeichnung = req.body['kurzbezeichnung'];
  const status = req.body['status'];
  const beschrieb = req.body['beschrieb'];
  const offeriert = req.body['offeriert'];
  const values = [id, kurzbezeichnung, beschrieb, status, offeriert];
  console.log(values);
  connection.query(`INSERT INTO kundenaufträge (KundenId, Kurzbezeichnung, Beschrieb, Status, Offertensumme) VALUES (?, ?, ?, ?, ?) `, values, (err, rows) => {
          if (!err) {
          res.redirect('back');
          } else {
          console.log(err);
          }
      });  
}
exports.updateAdminKundenauftraege = (req, res) => {
  const kundenid = req.body['kundenid'];  
  const id = req.body['id'];  
  const kurzbezeichnung = req.body['kurzbezeichnung'];
  const status = req.body['status'];
  const beschrieb = req.body['beschrieb'];
  const offerte = req.body['offeriert'];
  const values = [ kundenid, kurzbezeichnung, beschrieb, status, offerte, id];  
  const sqldelete = 'DELETE FROM kundenaufträge WHERE Id = ?';
  console.log(values); 
  if (req.body.action === 'Ändern') {
  connection.query(`UPDATE kundenaufträge SET KundenId = ?, Kurzbezeichnung = ?, Beschrieb = ?, Status = ?, Offertensumme = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        }
      }); }
      else if (req.body.action === 'Löschen') {
        connection.query(sqldelete, [id], (error, results) => {
          if (error) throw error;
          console.log('Eintrag erfolgreich gelöscht!');
          res.redirect('back'); // Zurück zur Übersichtsseite
        });
      
    }
}
exports.stundenZuordnen = (req, res) => {
  const id = req.body['id'];
  const auftragsid = req.body['auftragsid'];
  const arbeitername = req.body['arbeitername'];
  const stunden = req.body['stunden'];
  const datum = req.body['datum'];
  const beschrieb = req.body['beschrieb'];
  const verrechnet = req.body['verrechnet'];
  const values = [ arbeitername, stunden, beschrieb, auftragsid, datum, verrechnet, id];  
  console.log(values);
  connection.query(`UPDATE stunden SET Arbeitername = ?, Stunden = ?, Erledigte_Arbeit = ?, AuftragsId = ?, Datum = ?, Verrechnet = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
} 
//Fotos
exports.viewAdminKundenFoto = (req, res) => { 
  let kundenid = req.params.id;
  let query = `SELECT * FROM foto WHERE kunden_id = '${kundenid}'`;
  let queryb = `SELECT * FROM foto WHERE kunden_id = '${kundenid}' LIMIT 1`;
  connection.query(queryb, (err, rowsform) => {
    connection.query(query, (err, rows) => {
        if (!err) {
          res.render('admin-foto', {rows, rowsform, kundenid});
        } else {
          console.log(err);
        }
    });
  }); 
}
const fs = require('fs');
const path = require('path');
const { log } = require('console');
exports.saveAdminKundenFoto = (req, res) => {
  if (!req.file) {
    return res.status(400).send('Es wurde kein Foto ausgewählt.');
  }
  // Speichern des Dateipfads in der Datenbank
  const tempFilePath = req.file.path;
  // Pfad zum Speicherort, an dem die Datei gespeichert werden soll
  const newFileName = req.file.filename;
  const newFilePath = path.posix.join('../uploads/', newFileName);
  // Lesen und Schreiben der Datei
  fs.readFile(tempFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Es ist ein Fehler aufgetreten.');
    } else {  
      // Speichern des Dateipfads in der Datenbank
      const id = req.body.id;
      const query = 'INSERT INTO foto (kunden_id, Fotos) VALUES (?, ?)';
      connection.query(query, [id, newFilePath], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Es ist ein Fehler aufgetreten.');
        }
        res.redirect('back');
      });
    }
  });
};
exports.deleteAdminKundenFoto = (req, res) => {
  const id = req.params.id;
  const query = 'SELECT Fotos FROM foto WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Es ist ein Fehler bei der sql ausgabe aufgetreten.');
    }
    const filePath = path.posix.join(__dirname, '..', 'public', 'uploads', result[0].Fotos);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Es ist ein Fehler im fs.unlink aufgetreten.');
      }
      const query = 'DELETE FROM foto WHERE id = ?';
      connection.query(query, [id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Es ist ein Fehler beim löschen aufgetreten.');
        }
        res.redirect('back');
      });
    });
  });
};
//Kundenübersicht

exports.viewAdminKundenDruck = (req, res) => {
  const id = req.params.id;
  let query = `SELECT * FROM kunden WHERE id = ?`;
  let querya = `SELECT * FROM kundenaufträge WHERE KundenId = ?`;
  let queryb = `SELECT AuftragsId, Arbeitername, Datum, Verrechnet, Erledigte_Arbeit, Stunden, SUM(Stunden) AS Gesamtstunden
                FROM stunden
                WHERE KundenId = ? AND AuftragsId != ''
                GROUP BY AuftragsId, Arbeitername, Datum
                ORDER BY CAST(AuftragsId AS UNSIGNED) ASC, Arbeitername ASC, Datum ASC
                `;
  let queryc = `SELECT SUM(Stunden) AS Gesamtstunden FROM stunden WHERE KundenId = ? AND AuftragsId = ''`;
  let queryd = `SELECT * FROM stunden WHERE KundenId = ? AND AuftragsId = ''`;
connection.query(queryd, [id], (err, rowsausgabe) => { 
  connection.query(queryc, [id], (err, rowsstunden) => {            
      connection.query(query, [id], (err, rowskunden) => {
        if (!err) {
          connection.query(querya, [id], (err, rowsauftrag) => {
            if (!err) {
              let previousAuftragsId = null; // Variable zum Speichern der vorherigen AuftragsId
              let summe = 0; // Variable zum Speichern der Summe der Stunden
              connection.query(queryb, [id], (err, rows) => {
                if (err) {
                  console.log(err); 
                  return;
                }
                let removedStunden = req.query.removed;
                const flatRows = [];
                rows.forEach(row => {
                  // Wenn die AuftragsId wechselt, füge eine Summenzeile hinzu
                  if (previousAuftragsId !== row.AuftragsId) {
                    if (previousAuftragsId) {
                      
                      flatRows.push({ showSumRow: true, totalHours: summe});
                      summe = 0; // Setze die Summe wieder auf 0 zurück
                    }
                    previousAuftragsId = row.AuftragsId;
                  }
                  summe += row.Stunden;
                  flatRows.push(row);
                }); 
                // Füge am Ende eine Summenzeile hinzu, wenn notwendig
                if (previousAuftragsId && flatRows.some(row => row.showSumRow)) {
                  flatRows.push({ showSumRow: true, totalHours: summe});
                }

                if (!err) {
                  console.log(rows);
                  res.render('admin-druck', { rowskunden, rowsauftrag, rows: flatRows, removedStunden, rowsstunden, rowsausgabe});
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
    });
  });
}

