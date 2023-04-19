const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); 
exports.viewAdminSchuhle = (req, res) => { 
    let searchQuery = req.query.search;
    let filterQuery = req.query['select'];
    let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
    let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
    
    let query = `SELECT * FROM schule`;
    
    let whereClause = "";

    if (searchQuery) {
      if (whereClause) {
        whereClause += ` AND `;
      } else { 
        whereClause += ` WHERE `;
      }
      whereClause += `Kurzbezeichnung LIKE '%${searchQuery}%' OR Id LIKE '%${searchQuery}%' `;
    }
    if (filterQuery) {
      query += ` WHERE Bezeichnung ='${filterQuery}'`;
    }
     
    query += whereClause + ` ORDER BY ${sortColumn} ${sortOrder}`;

        connection.query(query, (err, rows) => {
              if (!err) {
                res.render('admin-schuhle', { rows, sortColumn, sortOrder });
              } else {
                console.log(err);
              } 
              });
            }
exports.updateAdminSchuhle = (req, res) => {
  const id = req.params.id;   
  const kurzbezeichnung = req.body['kurzbezeichnung'];
  const bezeichnung = req.body['bezeichnung'];
  const beschrieb = req.body['beschrieb'];
  const material_werkzeug = req.body['material_werkzeug'];
  const values = [id, kurzbezeichnung, bezeichnung, beschrieb, material_werkzeug, id];
  console.log(values);
  connection.query(`UPDATE schule SET Id = ?, Kurzbezeichnung = ?, Bezeichnung = ?, Beschrieb = ?, Material_Werkzeug = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }   
exports.saveAdminSchuhle = (req, res) => { 
const kurzbezeichnung = req.body['kurzbezeichnung'];
  const bezeichnung = req.body['bezeichnung'];
  const beschrieb = req.body['beschrieb'];
  const material_werkzeug = req.body['material_werkzeug'];
  const values = [kurzbezeichnung, bezeichnung, beschrieb, material_werkzeug];
  console.log(values);
  connection.query(`INSERT INTO schule (Kurzbezeichnung, Bezeichnung, Beschrieb, Material_Werkzeug) VALUES (?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });  
    } 
exports.deleteAdminSchuhle = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM schule WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }
    