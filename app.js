//importiere die benötigten module, engines
const express = require('express'); //für dem server und routes, sowie das parsen von middleware
const exphbs = require('express-handlebars'); //ist die rendering engine
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

require('dotenv').config();

//initialisiere express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sessions
const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }));

  // Middleware-Funktion, die die Authentifizierung überprüft
function requireLogin(req, res, next) {
  if (req.session && req.session.loggedIn) {
    return next();
  } else {
    res.redirect('/login');
  }
}

//setup template engine hier mit handlebars
const handlebars = exphbs.create({ extname: '.hbs',}); // name verkürzen der extention
app.engine('.hbs', handlebars.engine); //initialise handlebars engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs'); //setup die viewengne

//holds the folder path
//holds the folder path
const routes = require('./server/routes/router'); //zeigt auf office.js
app.use('/', routes); //Tell express to use this route / für home

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.use(bodyParser.urlencoded({ extended: true }));

//port variable festlegen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));


