const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); 
exports.viewAdminSchluessel = (req, res) => { 
    let searchQuery = req.query.search;
    let filterQuery = req.query['select'];
    let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
    let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
    
    let query = `SELECT * , DATE_FORMAT(Datum, '%Y.%m.%d') AS formatiertes, DATE_FORMAT(DatumZurueckgegeben, '%Y.%m.%d') AS formatiertesDatum FROM schluessel`;
    
    let whereClause = "";

    if (searchQuery) {
      if (whereClause) {
        whereClause += ` AND `;
      } else { 
        whereClause += ` WHERE `;
      }
      whereClause += `Vorname LIKE '%${searchQuery}%' OR Nachname LIKE '%${searchQuery}%' `;
    }
    if (filterQuery === "data") {
      query += ` WHERE Zurueckgegeben !=''`;
    }else if (filterQuery === "nodata"){
      query += ` WHERE Zurueckgegeben =''`;
    }
   
    
    query += whereClause + ` ORDER BY ${sortColumn} ${sortOrder}`;

        connection.query(query, (err, rows) => {
              if (!err) {
                res.render('admin-schluessel', { rows, sortColumn, sortOrder });
              } else {
                console.log(err);
              } 
              });
            }
exports.updateAdminSchluessel = (req, res) => {
  const id = req.params.id;   
  const vorname = req.body['vorname'];
  const nachname = req.body['nachname'];
  const code = req.body['code'];
  const notiz = req.body['notiz'];
  const entgegengenommen = req.body['entgegengenommen'];
  const zurueckgegeben = req.body['zurueckgegeben'];
  const datum = req.body['datum'];
  const datumzurueckgegeben = req.body['datumzurueckgegeben'];
  const values = [id, vorname, nachname, code, notiz, entgegengenommen, zurueckgegeben, datum, datumzurueckgegeben, id];
  console.log(values);
  connection.query(`UPDATE schluessel SET Id = ?, Vorname = ?, Nachname = ?, Code = ?, Notiz = ?, Entgegengenommen = ?, Zurueckgegeben = ?, Datum = ?, DatumZurueckgegeben = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }   
exports.saveAdminSchluessel = (req, res) => { 
  const vorname = req.body['vorname'];
  const nachname = req.body['nachname'];
  const code = req.body['code'];
  const notiz = req.body['notiz'];
  const entgegengenommen = req.body['entgegengenommen'];
  const zurueckgegeben = req.body['zurueckgegeben'];
  const datum = req.body['datum'];
  const datumzurueckgegeben = req.body['datumzurueckgegeben'];
  const values = [vorname, nachname, code, notiz, entgegengenommen, zurueckgegeben, datum, datumzurueckgegeben];
  console.log(values);
  connection.query(`INSERT INTO schluessel (Vorname, Nachname, Code, Notiz, Entgegengenommen, Zurueckgegeben, Datum ,DatumZurueckgegeben) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });  
    } 
exports.deleteAdminSchluessel = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM schluessel WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }