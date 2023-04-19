const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

//Login rendern
exports.viewLogin = (req, res) => {
    res.render('login');
    console.log("Login Seite");
  }


// ...

exports.authenticate = (req, res) => {
  const { username, password } = req.body;
  
  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
    if (username === ""){
      return res.status(401).render('login', { error: 'Wrong username or password' });
    }
    if (results.length === 1) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        } 
        if (user.Freigabe === "ist2023fürallesfreigegeben") {
            req.session.admin = true;
          }
        if (result) {
          req.session.user = user;
          console.log('User logged in:', user.username);
          return res.redirect('/index');
        } 
        else {
          console.log('Wrong password for user:', user.username);
          return res.status(401).render('login', { error: 'Wrong username or password' });
        }
      });
    } else {
      console.log('User not found:', username);
      return res.status(401).render('login', { error: 'Wrong username or password' });
    }
  });
};