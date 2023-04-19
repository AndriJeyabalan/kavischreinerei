const mysql = require('mysql');

// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
exports.viewAdminLieferanten = (req, res) => { 
        let searchQuery = req.query.search;
        let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
        let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
        
        let query = `SELECT * FROM lieferanten`;
        
        let whereClause = "";
        
        if (searchQuery && searchQuery != "") {
          if (whereClause) {
            whereClause += ` AND `;
          } else {
            whereClause += ` WHERE `;
          }
          whereClause += `Firmenname LIKE '%${searchQuery}%' OR Id LIKE '%${searchQuery}%' `;
        }
        
        
        query += whereClause + ` ORDER BY ${sortColumn} ${sortOrder}`;
        

        connection.query(query, (err, rows) => {
              if (!err) {
                res.render('admin-lieferanten', { rows, sortColumn, sortOrder});
              } else {
                console.log(err);
              }
        });
}
exports.updateAdminLieferanten = (req, res) => {
  const id = req.params.id;   
  const firmenname = req.body['firmenname'];
  const email = req.body['email'];
  const tel = req.body['tel'];
  const firmenchef = req.body['firmenchef'];
  const strasse = req.body['strasse'];
  const nr = req.body['nr'];
  const plz = req.body['plz'];
  const ort = req.body['ort'];
  const values = [id, firmenname, email, tel, firmenchef, strasse, nr, plz,ort, id];
  console.log(values);
  connection.query(`UPDATE lieferanten SET Id = ?, Firmenname = ?, Email = ?, Tel = ?, Firmenchef = ?, Strasse = ?, Nr = ?, PLZ = ?, Ort = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
}   
exports.saveAdminLieferanten = (req, res) => { 
  const firmenname = req.body['firmenname'];
  const email = req.body['email'];
  const tel = req.body['tel'];
  const firmenchef = req.body['firmenchef'];
  const strasse = req.body['strasse'];
  const nr = req.body['nr'];
  const plz = req.body['plz'];
  const ort = req.body['ort'];
  const values = [firmenname, email, tel, firmenchef, strasse, nr, plz,ort];
  console.log(values);
  connection.query(`INSERT INTO lieferanten ( Firmenname, Email, Tel, Firmenchef, Strasse, Nr, PLZ, Ort) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });  
} 
exports.deleteAdminLieferanten = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM lieferanten WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
}
//Verkäufer
exports.viewAdminVerkaufer = (req, res) => { 
  let searchQuery = req.query.search;
  let sortColumn = req.query.sortBy || "id"; // Standardmäßig nach "id" sortieren
  let sortOrder = req.query.sortOrder || "ASC"; // Standardmäßig aufsteigend sortieren
  
  let query = `SELECT * FROM verkaufer`;
  
  let whereClause = "";
  
  if (searchQuery && searchQuery != "") {
    if (whereClause) {
      whereClause += ` AND `;
    } else {
      whereClause += ` WHERE `;
    }
    whereClause += `Name LIKE '%${searchQuery}%' OR Id LIKE '%${searchQuery}%' OR Firma LIKE '%${searchQuery}%'`;
  }
  
  
  query += whereClause + ` ORDER BY ${sortColumn} ${sortOrder}`;
  

  connection.query(query, (err, rows) => {
        if (!err) {
          res.render('admin-verkaufer', { rows, sortColumn, sortOrder});
        } else {
          console.log(err);
        }
  });
}
exports.updateAdminVerkaufer = (req, res) => {
  const id = req.params.id;   
  const name = req.body['name'];
  const verantwortungsbereich = req.body['verantwortungsbereich'];
  const email = req.body['email'];
  const tel = req.body['tel'];
  const firma = req.body['firma'];
  const notiz = req.body['notiz'];
  const ferien = req.body['ferien'];
  const values = [id, name, verantwortungsbereich, email, tel, firma, notiz, ferien, id];
  console.log(values);
  connection.query(`UPDATE verkaufer SET Id = ?, Name = ?, Verantwortungsbereich = ?, Email = ?, Tel = ?, Firma = ?, Notiz = ?, Ferien = ? WHERE Id = ? `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
}   
exports.saveAdminVerkaufer = (req, res) => { 
  const name = req.body['name'];
  const verantwortungsbereich = req.body['verantwortungsbereich'];
  const email = req.body['email'];
  const tel = req.body['tel'];
  const firma = req.body['firma'];
  const notiz = req.body['notiz'];
  const ferien = req.body['ferien'];
  const values = [ name, verantwortungsbereich, email, tel, firma, notiz, ferien];
  console.log(values);
  connection.query(`INSERT INTO verkaufer (Name, Verantwortungsbereich, Email, Tel, Firma, Notiz, Ferien) VALUES (?, ?, ?, ?, ?, ?, ?) `, values, (err, rows) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });  
} 
exports.deleteAdminVerkaufer = (req, res) => {
  const id = req.params.id;   
  connection.query(`DELETE FROM verkaufer WHERE Id = ? `, id, (err) => {
        if (!err) {
          res.redirect('back');
        } else {
          console.log(err);
        }
      });
} 