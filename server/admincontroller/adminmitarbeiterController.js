const mysql = require('mysql');
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.viewAdminMitarbeiter = (req, res) => {   
  let query = `
  SELECT *,
    DATE_FORMAT(Datum, '%v  -  %Y') AS Woche,
    SUM(Stunden) AS Wochenstunden
  FROM stunden
  WHERE Kontrolliert = 'Ja'
  GROUP BY Arbeitername, Woche
  ORDER BY Arbeitername, Woche;
`;
let querya = `
    SELECT *, 
    DATE_FORMAT(Datum, '%Y-%m') AS Monat, 
    SUM(Stunden) AS Monatsstunden
    FROM stunden
    WHERE Kontrolliert = 'Ja'
    GROUP BY Arbeitername, DATE_FORMAT(Datum, '%Y-%m');
    `;
connection.query(querya, (err, rowsMonat) => {
        if (!err) {
   connection.query(query, (err, rows) => {
          if (!err) {
            res.render('admin-mitarbeiter', { rows, rowsMonat});
          } else {
            console.log(err);
          }
          });
        }else {
          console.log(err);
        }
        });
      }