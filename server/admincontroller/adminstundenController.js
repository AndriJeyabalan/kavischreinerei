const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); 
exports.viewAdminStunden = (req, res) => { 
    let searchQuery = req.query.search;
    let searchQueryStunden = req.query.searchstunden;
    let filterQuery = req.query['filter-type'];
    let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
    let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
    
    let query = `SELECT * FROM stunden`;
    let querya = `SELECT * FROM kunden`;
    
    let whereClause = "";
    
    if (searchQuery) {
      querya += ` WHERE Vorname LIKE '%${searchQuery}%' OR Nachname LIKE '%${searchQuery}%'`;
    }
    if (searchQueryStunden) {
      if (whereClause) {
        whereClause += ` AND `;
      } else {
        whereClause += ` WHERE `;
      }
      whereClause += `Kundenname LIKE '%${searchQueryStunden}%' OR Arbeitername LIKE '%${searchQueryStunden}%' OR Datum LIKE '%${searchQueryStunden}%'`;
    }
    if (filterQuery) {
      query += ` WHERE Kontrolliert ='${filterQuery}'`;
    }
  
    
    query += whereClause + ` ORDER BY ${sortColumn} ${sortOrder}`;
    
    connection.query(querya, (err, rowsKunde) =>{
          if(!err){ 
        connection.query(query, (err, rows) => {
              if (!err) {
                res.render('admin-stunden', { rows, sortColumn, sortOrder, rowsKunde });
              } else {
                console.log(err);
              }
              });
            }else {
              console.log(err);
            }
        });
      }
exports.updateAdminStunden = (req, res) => {
  const id = req.params.id;   
  const kundenname = req.body['kundenname'];
  const kundenid = req.body['kundenid'];
  const stunden = req.body['stunden'];
  const erledigte_arbeit = req.body['erledigte_arbeit'];
  const arbeitername = req.body['arbeitername'];
  const datum = req.body['datum'];
  const kontrolliert = req.body['bestätigt'];
  const verrechnet = req.body['verrechnet'];
  const values = [id, kundenname, kundenid, stunden, erledigte_arbeit, arbeitername, datum, kontrolliert, verrechnet, id];
  console.log(values);
  connection.query(`UPDATE stunden SET Id = ?, Kundenname = ?, KundenId = ?, Stunden = ?, Erledigte_Arbeit = ?, Arbeitername = ?, Datum = ?, Kontrolliert = ?, Verrechnet = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
    }  
