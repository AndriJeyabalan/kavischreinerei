const mysql = require('mysql');
const moment = require('moment');
const Json2csvParser = require('json2csv').Parser;
// Connection Pool
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
exports.viewAdminBackup = (req, res) => {
    res.render('adminbackup');
  }
exports.backupstunden = (req, res) => {
    let query = `SELECT * FROM stunden`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'KundenId', 'Kundenname', 'Stunden', 'Verrechnet', 'Erledigte_Arbeit', 'Arbeitername', 'Datum', 'Kontrolliert', 'AuftragsId'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `stunden_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupkunden = (req, res) => {
    let query = `SELECT * FROM kunden`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['id', 'Vorname', 'Nachname', 'Strasse', 'Hausnummer', 'Haus', 'PLZ', 'Ort', 'Telefonnummer', 'Ende', 'Status'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `kunden_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backuparbeiten = (req, res) => {
    let query = `SELECT * FROM kundenaufträge`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'KundenId', 'Kurzbezeichcnung', 'Beschrieb', 'Status', 'Offertensumme'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `auftraege_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupwerkzeug = (req, res) => {
    let query = `SELECT * FROM werkzeug`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'Bezeichnung', 'Name', 'AnzahlMitarbeiter', 'AnzahlArosa', 'AnzahlPeist', 'AnzahlKunden', 'Artikelnummer', 'Lieferant'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `werkzeug_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupwerkzeugarosa = (req, res) => {
    let query = `SELECT * FROM werkzeugarosa`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'WerkzeugId', 'Werkzeugarosa', 'Werkzeugkunde', 'Werkzeugpeist', 'Werkzeugmitarbeiter', 'Notiz', 'Bearbeiten'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `werkzeugarosa${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupwerkzeugpeist = (req, res) => {
    let query = `SELECT * FROM werkzeugpeist`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'WerkzeugId', 'Werkzeugarosa', 'Werkzeugkunde', 'Werkzeugpeist', 'Werkzeugmitarbeiter', 'Notiz', 'Bearbeiten'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `werkzeugpeist_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupwerkzeugmitarbeiter = (req, res) => {
    let query = `SELECT * FROM werkzeugmitarbeiter`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'WerkzeugId', 'Werkzeugarosa', 'Werkzeugkunde', 'Werkzeugpeist', 'Werkzeugmitarbeiter', 'Notiz', 'Bearbeiten'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `werkzeugmitarbeiter_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupwerkzeugkunde = (req, res) => {
    let query = `SELECT * FROM werkzeugkunde`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'WerkzeugId', 'Werkzeugarosa', 'Werkzeugkunde', 'Werkzeugpeist', 'Werkzeugmitarbeiter', 'Notiz', 'Bearbeiten'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `werkzeugkunde_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupmaterial = (req, res) => {
    let query = `SELECT * FROM material`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'Name', 'Bezeichnung', 'AnzahlPeist', 'AnzahlArosa', 'Artikelnummer', 'Lieferant', 'Einkaufspreis', 'Verkaufspreis'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `material_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupmaterialarosa = (req, res) => {
    let query = `SELECT * FROM materialarosa`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'MaterialId', 'Aufenthaltsort', 'Notiz', 'Bearbeiter', 'Datum'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `materialarosa_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupmaterial = (req, res) => {
    let query = `SELECT * FROM materialpeist`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'MaterialId', 'Aufenthaltsort', 'Notiz', 'Bearbeiter', 'Datum'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `materialpeist_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupfahrzeuge = (req, res) => {
    let query = `SELECT * FROM fahrzeuge`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'Name', 'Autonummer', 'Marke', 'Kraftstoff', 'LetzteInspektion', 'NaechsteInspektion'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `fahrzeug_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backuptanken = (req, res) => {
    let query = `SELECT * FROM tanken`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'FahrzeugId', 'Menge', 'Preis', 'Arbeiter', 'Datum'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `tanken_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};
exports.backupschluessel = (req, res) => {
    let query = `SELECT * FROM schluessel`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'Vorname', 'Nachname', 'Code', 'Notiz', 'Entgegengenommen', 'Zurueckgegeben', 'Datum', 'DatumZurueckgegeben'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `schluessel_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        } 
    });
};
exports.backupschule = (req, res) => {
    let query = `SELECT * FROM schule`;

    connection.query(query, (err, rows) => {
        if (!err) {
            const fields = ['Id', 'Kurzbezeichnung', 'Bezeichnung', 'Beschrieb', 'Material_Werkzeug'];
            const json2csvParser = new Json2csvParser({ fields });
            const csvData = json2csvParser.parse(rows);

            const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            const filename = `schule_${timestamp}.csv`;

            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csvData);
        } else {
            console.log(err);
        }
    });
};