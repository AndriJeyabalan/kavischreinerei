const mysql = require('mysql');


// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
//Stunden speichern
exports.createStunden = (req, res) => {
  const { kunde, datum, stunden, arbeit} = req.body;
  const arbeitername = req.session.user.username;
  const query1 = `SELECT Stundenansatz FROM users WHERE username = ?`;
  connection.query(query1, [arbeitername], (err, result) => {
    if (err) throw err;
    const stundenansatz = result[0].Stundenansatz;
    const verrechnet = stundenansatz * stunden;
    // SQL-Abfrage zum Einfügen der Daten
    const query2 = `INSERT INTO stunden (Kundenname, Stunden, Erledigte_Arbeit, Arbeitername, Datum, Kontrolliert, Verrechnet) 
    VALUES (?, ?, ?, ?, ?, "nein", ?)`;
    const values = [kunde, stunden, arbeit, arbeitername, datum, verrechnet];
    connection.query(query2, values, (err, result) => {
      if (err) throw err;
      console.log(`${result.affectedRows} Datensätze eingefügt`);
      res.redirect('/stunden');
  });
});
}
//Kunde im Create Stunden Form suchen
exports.kundenSuche = (req, res) => {
    const searchTerm = req.query.q;

  connection.query(`SELECT * FROM kunden WHERE Vorname LIKE '%${searchTerm}%' OR Nachname LIKE '%${searchTerm}%'`, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
    results.forEach((result) => {
    });
  });
};
// View Stunden
exports.viewStunden = (req, res) => {
  // Stunden the connection
  const arbeitername = req.session.user.username;
  const today = new Date();
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
  const formattedLastWeek = lastWeek.toISOString().split('T')[0];
  connection.query(`SELECT *, DATE_FORMAT(datum, '%m-%d') as formattedDate, DATE_FORMAT(datum, '%d.%m') as formatted FROM stunden WHERE Arbeitername = ? AND Datum >= ? AND Kontrolliert = ?  ORDER BY Datum DESC`, [arbeitername, formattedLastWeek, "nein"], (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    let removedStunden = req.query.removed;
    const stundenMap = new Map();
    let currentDatum = null;
    rows.forEach(row => {
      // Füge den aktuellen Eintrag zum Stunden-Map hinzu
      const datum = row.formattedDate;
      if (!stundenMap.has(datum)) {
        stundenMap.set(datum, []);
      }
      stundenMap.get(datum).push(row);

      // Wenn das Datum wechselt, gib die Summe für das vorherige Datum aus, wenn noch keine Summenzeile vorhanden ist
      if (currentDatum !== datum) {
        if (currentDatum && !stundenMap.get(currentDatum).some(row => row.showSumRow)) {
          const summe = stundenMap.get(currentDatum).reduce((acc, val) => acc + val.Stunden, 0);
          const wochentage = ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
          const wochentag = wochentage[new Date(currentDatum).getDay()];
          stundenMap.get(currentDatum).push({ showSumRow: true, totalHours: summe, wochentag });
        }
        currentDatum = datum;
      }
    }); 

    // Gib die Summe für das letzte Datum aus, wenn noch keine Summenzeile vorhanden ist
    if (currentDatum && !stundenMap.get(currentDatum).some(row => row.showSumRow)) {
      const summe = stundenMap.get(currentDatum).reduce((acc, val) => acc + val.Stunden, 0);
      const wochentage = ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
      const wochentag = wochentage[new Date(currentDatum).getDay()];
      stundenMap.get(currentDatum).push({ showSumRow: true, totalHours: summe, wochentag });
    }

    // Konvertiere den Stunden-Map zurück in eine flache Array-Struktur
    const flatRows = [];
    stundenMap.forEach(datumRows => {
      flatRows.push(...datumRows);
    });

    res.render('stunden', { rows: flatRows, removedStunden });
  });
};
exports.editStunden = (req, res) => {
  // Stunden the connection
  connection.query(`SELECT *, DATE_FORMAT(datum, '%Y-%m-%d') as formattedDate From stunden WHERE id = ?`, [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-stunden', { rows: rows[0] });
    } else {
      console.log(err);
    }
    console.log('The data from Stunden table: \n', rows);
  });
}
exports.saveStunden = (req, res) => {
  
  const stundenId = req.params.id; // ID des zu bearbeitenden Stundeneintrags
  const kunde = req.body.kunde;
  const stunden = req.body.stunden;
  const erledigteArbeit = req.body.arbeit;
  const arbeiter = req.session.user.username;
  const datum = req.body.datum;
  const kontrolliert = 'Nein';

  const query1 = `SELECT Stundenansatz FROM users WHERE username = ?`;
  connection.query(query1, [arbeiter], (err, result) => {
    if (err) throw err;
    const stundenansatz = result[0].Stundenansatz;
    const verrechnet = stundenansatz * stunden;

  const sql = 'UPDATE stunden SET Kundenname = ?, Stunden = ?, Erledigte_Arbeit = ?,  Arbeitername = ?, Datum = ?, Kontrolliert = ?, Verrechnet = ? WHERE Id = ?';
  const sqldelete = 'DELETE FROM stunden WHERE Id = ?';
  if (req.body.action === 'Speichern') {
  connection.query(sql, [kunde, stunden, erledigteArbeit,  arbeiter, datum, kontrolliert, verrechnet, stundenId], (error, results) => {
    if (error) throw error;
    console.log('Stunden erfolgreich gespeichert!');
    res.redirect('/stunden'); // Zurück zur Übersichtsseite
  }); } else if (req.body.action === 'Löschen') {
    connection.query(sqldelete, [stundenId], (error, results) => {
      if (error) throw error;
      console.log('Stunden erfolgreich gelöscht!');
      res.redirect('/stunden'); // Zurück zur Übersichtsseite
    });
  }
}); 
}