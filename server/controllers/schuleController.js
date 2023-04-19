const mysql = require('mysql');

// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Schule
exports.viewSchule = (req, res) => {
    let searchQuery = req.query.search;
    let filterQuery = req.query['tool-type'];
    
    let query = `SELECT * FROM schule`;
  
    if (searchQuery) {
      query += ` WHERE Kurzbezeichnung LIKE '%${searchQuery}%'`;
    }
  
    if (filterQuery) {
      query += ` WHERE Bezeichnung ='${filterQuery}'`;
    }
  
    connection.query(query, (err, rows) => {
      if (!err) {
        let removedSchule = req.query.removed;
        res.render('schule', { rows, removedSchule });
      } else {
        console.log(err);
      }
      console.log('The data from Schule table: \n', rows);
    });
  }

  exports.viewSchuleEintrag = (req, res) => {
    connection.query(`SELECT * FROM schule WHERE Id = ? `, [req.params.id], (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }res.render('viewschule', { 
            rows: rows[0] ,
        });
    });
  }