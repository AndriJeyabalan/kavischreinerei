const mysql = require('mysql');
 
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Material
  exports.viewMaterial = (req, res) => {
    let searchQuery = req.query.search;
    let filterQuery = req.query['tool-type'];
    let isFiltering = false; // Hier initialisieren
    
    let query = `SELECT * FROM material`;
  
    if (searchQuery) {
      query += ` WHERE Name LIKE '%${searchQuery}%'`;
      isFiltering = true; // Hier setzen
    }
  
    if (filterQuery) {
      query += ` WHERE Bezeichnung ='${filterQuery}'`;
      isFiltering = true; // Hier setzen
    }
  
    connection.query(query, (err, rows) => {
      if (!err) {
        let removedMaterial = req.query.removed;
        res.render('material', { rows, removedMaterial, isFiltering });
      } else {
        console.log(err);
      }
      console.log('The data from Material table: \n', rows);
    });
  }

  //Edit Material
exports.editMaterial = (req, res) =>{
  connection.query(`SELECT * FROM material WHERE id = ?`, [req.params.id], (err, rows) => {
    if (err) {
      console.log(err);
      return res.render('edit-material', { rows: rows[0] });
    }
    
    connection.query(`SELECT * FROM materialpeist WHERE MaterialId = ?`, [req.params.id], (err, rowsPeist) => {
      if (err) {
        console.log(err);
        return res.render('edit-material', { rows: rows[0] });
      }
      
      connection.query(`SELECT * FROM materialarosa WHERE MaterialId = ?`, [req.params.id], (err, rowsArosa) => {
        if (err) {
          console.log(err);
          return res.render('edit-material', { rows: rows[0] });
        }
            
                const hasPeistData = rowsPeist.length > 0;
                const peistData = hasPeistData ? rowsPeist[0] : null;
                
                const hasArosaData = rowsArosa.length > 0;
                const arosaData = hasArosaData ? rowsArosa[0] : null;

            res.render('edit-material', { 
                rows: rows[0],
                rowsPeist: rowsPeist,
                rowsArosa: rowsArosa, 
                peistData: peistData, 
                arosaData: arosaData,  
                hasPeistData: hasPeistData, 
                hasArosaData: hasArosaData, 
            });
          });
        });
      });
    };

    exports.editMaterialPeist = (req, res) => {
      const peistId = req.params.id;
      connection.query(`SELECT * FROM materialpeist WHERE id = ?`, [peistId], (err, rows) => {
        if (!err) {
          const materialId = rows[0].MaterialId; 
          connection.query(`SELECT * FROM material WHERE id = ?`, [materialId], (err, rowsmaterial) => {
            if (!err) {
              return res.render('edit-material-peist', { rows: rows[0], rowsmaterial: rowsmaterial[0] }); 
            }  
            res.render('edit-material', { 
              rows: rows[0] ,
              rowsmaterial: rowsmaterial[0],
              materialId: materialId
            });
          });
        } else {
          console.log(err);
          res.render('error', { message: 'Error retrieving data' });
        }
      });
    };
     
    exports.editMaterialArosa = (req, res) =>{
      const arosaId = req.params.id;
      connection.query(`SELECT * FROM materialarosa WHERE id = ?`, [arosaId], (err, rows) => {
        if (!err) {
          const materialId = rows[0].MaterialId; 
          connection.query(`SELECT * FROM material WHERE id = ?`, [materialId], (err, rowsmaterial) => {
            if (!err) {
              return res.render('edit-material-arosa', { rows: rows[0], rowsmaterial: rowsmaterial[0] });
            }  
            res.render('edit-material', { 
              rows: rows[0] ,
              rowsmaterial: rowsmaterial[0],
              materialId: materialId
            });
          });
        } else {
          console.log(err);
          res.render('error', { message: 'Error retrieving data' });
        }
      });
    };

    exports.editMaterialArosaEintrag = (req, res) => {
      const id = req.body['id'];
      // Delete the entry in the material table with the given id
      connection.query('SELECT * FROM materialarosa WHERE id = ?', [id], (err, rows) => {
        if (!rows[0]) {
          res.status(500).send('Keine Datensätze gefunden');
          console.log(id)
          return;
        }
        const arbeitername = req.session.user.username;
        const wert = req.body['wert']


          connection.query(`UPDATE material SET AnzahlArosa = ?  WHERE id = ?`, [wert, rows[0].MaterialId], (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send('Fehler beim Aktualisieren des Materials');
            } else { 
            }
          }); 
        const aufenthaltsort = req.body['aufenthaltsort'];
        const notiz = req.body['notiz'];
        const values = [rows[0].MaterialId, aufenthaltsort, notiz, arbeitername, id];
        connection.query(`UPDATE materialarosa SET MaterialId = ?, Aufenthaltsort = ?, Notiz = ?, Bearbeiter = ? WHERE Id = ?`, values, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send(`Fehler beim Einfügen eines neuen Eintrags in die Material-Arosa-Tabelle`);
          } else {
            res.redirect('/editmaterial/'+ rows[0].MaterialId);
          }
        });
        });
    };

    exports.editMaterialPeistEintrag = (req, res) => {
      const id = req.body['id'];
      // Delete the entry in the material table with the given id
      connection.query('SELECT * FROM materialpeist WHERE id = ?', [id], (err, rows) => {
        if (!rows[0]) {
          res.status(500).send('Keine Datensätze gefunden');
          console.log(id)
          return;
        }
        const arbeitername = req.session.user.username;
        const wert = req.body['wert']


          connection.query(`UPDATE material SET AnzahlPeist = ?  WHERE id = ?`, [wert, rows[0].MaterialId], (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send('Fehler beim Aktualisieren des Materials');
            } else { 
            }
          }); 
        const aufenthaltsort = req.body['aufenthaltsort'];
        const notiz = req.body['notiz'];
        const values = [rows[0].MaterialId, aufenthaltsort, notiz, arbeitername, id];
        connection.query(`UPDATE materialpeist SET MaterialId = ?, Aufenthaltsort = ?, Notiz = ?, Bearbeiter = ? WHERE Id = ?`, values, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send(`Fehler beim Einfügen eines neuen Eintrags in die Material-Peist-Tabelle`);
          } else {
            res.redirect('/editmaterial/'+ rows[0].MaterialId);
          }
        });
        });
    };
    