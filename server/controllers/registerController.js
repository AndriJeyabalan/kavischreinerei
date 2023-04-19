const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Register rendern
exports.viewRegister = (req, res) => {
  res.render('register');
  console.log('Register Seite');
}

// Registrierungsformular verarbeiten
exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  // Überprüfen, ob der Benutzername bereits vorhanden ist
  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // Benutzername ist bereits vorhanden
      res.render('register', { error: 'Benutzername ist bereits vergeben' });
    } else {
      // Benutzername ist noch nicht vorhanden
      // Passwort hashen
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        // Benutzer in die Datenbank einfügen
        connection.query('INSERT INTO users SET ?', { username, password: hash }, (error, results) => {
          if (error) throw error;

          res.redirect('/login');
        });
      });
    }
  });
};