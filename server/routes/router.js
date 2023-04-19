const express = require('express');
const router = express.Router();


//Controller
const wechselController = require('../controllers/wechselController'); 
const loginController = require('../controllers/loginController'); 
const registerController = require('../controllers/registerController'); 
const stundenController = require('../controllers/stundenController'); 
const termineController = require('../controllers/termineController'); 
const werkzeugController = require('../controllers/werkzeugController'); 
const materialController = require('../controllers/materialController');
const kundenController = require('../controllers/kundenController');
const fahrzeugController = require('../controllers/fahrzeugController');
const schluesselController = require('../controllers/schluesselController');
const schuleController = require('../controllers/schuleController');
const postController = require('../controllers/postController');
//Admin
const adminController = require('../admincontroller/adminController');
const adminstundenController = require('../admincontroller/adminstundenController');
const adminkundenController = require('../admincontroller/adminkundenController');
const adminmitarbeiterController = require('../admincontroller/adminmitarbeiterController');
const adminwerkzeugController = require('../admincontroller/adminwerkzeugController');
const adminmaterialController = require('../admincontroller/adminmaterialController');
const adminfahrzeugController = require('../admincontroller/adminfahrzeugController');
const adminschluesselController = require('../admincontroller/adminschluesselController');
const adminschuhleController = require('../admincontroller/adminschuhleController'); 
const adminbackupController = require('../admincontroller/adminbackupController'); 
const adminlieferantenController = require('../admincontroller/adminlieferantenController'); 
const admintermineController = require('../admincontroller/admintermineController'); 
const adminpostController = require('../admincontroller/adminpostController'); 
//Require und Sessions
const requireLogin = (req, res, next) => {
    if (req.session.user) {
      next(); // User is logged in, continue to the next middleware
    } else {
      res.redirect('/login'); // User is not logged in, redirect to login page
    } 
  };
  const requireAdmin = (req, res, next) => {
    if (req.session.admin) {
      next(); // User is logged in, continue to the next middleware
    } else {
      res.redirect('/login'); // User is not logged in, redirect to login page
    }
  };   
//Login
router.get('/',requireLogin, loginController.viewLogin);
router.get('/login', loginController.viewLogin);
router.post('/login', loginController.authenticate);
//Arbeiter Home
router.get('/index',requireLogin, wechselController.viewHome);
//Stunden
router.get('/stunden',requireLogin, stundenController.viewStunden);
router.get('/stunden',requireLogin, wechselController.viewallStunden);
router.get('/editstunden/:id',requireLogin, stundenController.editStunden);
router.post('/editstunden/:id',requireLogin, stundenController.saveStunden);
router.get('/api/kunden', requireLogin, stundenController.kundenSuche);
router.post('/addstunden',requireLogin, stundenController.createStunden);
//Termine 
router.get('/termine',requireLogin, termineController.viewTermine);
router.get('/termine',requireLogin, wechselController.viewallTermine);
router.post('/addtermine',requireLogin, termineController.createTermine);
router.post('/edittermine/:id',requireLogin, termineController.erledigtTermine);
router.get('/edittermine/:id',requireLogin, termineController.editTermine);
router.post('/editttermine/:id',requireLogin, termineController.edittTermine);
//Werkzeug
router.get('/werkzeuge',requireLogin, werkzeugController.viewWerkzeuge);
router.get('/werkzeuge',requireLogin, wechselController.viewallWerkzeuge);
router.get('/editwerkzeug/:id',requireLogin, werkzeugController.editWerkzeug);
router.post('/editwerkzeugpeist/:id',requireLogin, werkzeugController.editWerkzeugPeist);
router.post('/editwerkzeugarosa/:id',requireLogin, werkzeugController.editWerkzeugArosa);
router.post('/editwerkzeugmitarbeiter/:id',requireLogin, werkzeugController.editWerkzeugMitarbeiter);
router.post('/editwerkzeugkunde/:id',requireLogin, werkzeugController.editWerkzeugKunde);
router.post('/editwerkzeugpeisteintrag/:id',requireLogin, werkzeugController.editWerkzeugPeistEintrag);
router.post('/editwerkzeugarosaeintrag/:id',requireLogin, werkzeugController.editWerkzeugArosaEintrag);
router.post('/editwerkzeugkundeneintrag/:id',requireLogin, werkzeugController.editWerkzeugKundenEintrag);
router.post('/editwerkzeugmitarbeitereintrag/:id',requireLogin, werkzeugController.editWerkzeugMitarbeiterEintrag); 
//Material
router.get('/material',requireLogin, materialController.viewMaterial);
router.get('/editmaterial/:id',requireLogin, materialController.editMaterial);
router.post('/editmaterialpeist/:id',requireLogin, materialController.editMaterialPeist);
router.post('/editmaterialarosa/:id',requireLogin, materialController.editMaterialArosa);
router.post('/editmaterialpeisteintrag/:id',requireLogin, materialController.editMaterialPeistEintrag);
router.post('/editmaterialarosaeintrag/:id',requireLogin, materialController.editMaterialArosaEintrag);
//Kunden und Aufträge
router.get('/kunden',requireLogin, kundenController.viewKunde);
router.get('/editkunde/:id',requireLogin, kundenController.editKunde);
router.post('/editkunde/:id',requireLogin, kundenController.editKundeErledigt);
//Post
router.get('/post',requireLogin, postController.viewPost);
router.post('/editpost/:id',requireLogin, postController.nehmenPost);
router.post('/editpostrueckstand/:id',requireLogin, postController.nehmenPostrueckstand);
//Fahrzeug
router.get('/fahrzeuge',requireLogin, fahrzeugController.viewFahrzeug);
router.get('/editfahrzeug/:id',requireLogin, fahrzeugController.editFahrzeuge);
router.post('/editfahrzeug/:id',requireLogin, fahrzeugController.fahrzeugeTanken);
//Schlüssel
router.get('/schluessel',requireLogin, schluesselController.viewSchluessel);
router.get('/editschluessel/:id',requireLogin, schluesselController.editSchluessel);
router.post('/schluesselzurueckgeben/:id',requireLogin, schluesselController.zurueckgebenSchluessel);
router.post('/editschluessel/:id',requireLogin, schluesselController.editNotizSchluessel);
router.post('/speicherschluessel',requireLogin, schluesselController.speicherSchluessel);
//Schule  
router.get('/schule',requireLogin, schuleController.viewSchule);
router.get('/viewschule/:id',requireLogin, schuleController.viewSchuleEintrag);
//Admin Home
router.get('/admin',requireAdmin,requireLogin, adminController.viewAdminHome);
//Registrieren 
router.get('/register',requireAdmin,requireLogin, registerController.viewRegister);
router.post('/register',requireAdmin,requireLogin, registerController.registerUser);
//Admin Stunden
router.get('/adminstunden',requireAdmin,requireLogin, adminstundenController.viewAdminStunden);
router.post('/adminstunden/:id',requireAdmin,requireLogin, adminstundenController.updateAdminStunden);
//Admin Kunden
router.get('/adminkunden',requireAdmin,requireLogin, adminkundenController.viewAdminKunden);
router.post('/adminkunden',requireAdmin,requireLogin, adminkundenController.saveAdminKunden);
router.post('/adminkunden/:id',requireAdmin,requireLogin, adminkundenController.updateAdminKunden);
router.post('/deleteadminkunden/:id',requireAdmin,requireLogin, adminkundenController.deleteAdminkunden);
router.post('/kundenauftraege/:id',requireAdmin,requireLogin, adminkundenController.viewAdminKundenauftraege);
router.get('/kundenauftraege/:id',requireAdmin,requireLogin, adminkundenController.viewAdminKundenauftraege);
router.post('/saveadminkundenauftrageintrag',requireAdmin,requireLogin, adminkundenController.saveAdminKundenauftraege);
router.post('/updateadminkundenauftrageintrag',requireAdmin,requireLogin, adminkundenController.updateAdminKundenauftraege);
router.post('/stundezuordnen/:id',requireAdmin,requireLogin, adminkundenController.stundenZuordnen);
router.get('/adminkundenfoto/:id',requireAdmin,requireLogin, adminkundenController.viewAdminKundenFoto);
//Fotos

router.get('/adminkundendruck/:id',requireAdmin,requireLogin, adminkundenController.viewAdminKundenDruck);
// Middleware für Datei-Uploads
const upload = multer({ storage, fileFilter });
// Route für Datei-Uploads
router.post('/upload', requireAdmin, requireLogin, upload.single('photo'), adminkundenController.saveAdminKundenFoto);
router.post('/deleteadminkundenfoto/:id', requireAdmin, requireLogin, adminkundenController.deleteAdminKundenFoto);
//Admin Mitarbeiter
router.get('/adminmitarbeiter',requireAdmin,requireLogin, adminmitarbeiterController.viewAdminMitarbeiter);
//Admin Termine
router.get('/admintermine',requireAdmin,requireLogin, admintermineController.viewAdminTermine);
router.post('/saveadmintermine',requireAdmin,requireLogin, admintermineController.saveAdminTermine);
router.post('/deleteadmintermine/:id',requireAdmin,requireLogin, admintermineController.deleteAdminTermine);
router.post('/alteradminkunden/:id',requireAdmin,requireLogin, admintermineController.alterAdminTermine);
router.get('/admintermineja',requireAdmin,requireLogin, admintermineController.viewAdminTermineja);
router.post('/saveadmintermineja',requireAdmin,requireLogin, admintermineController.saveAdminTermineja);
router.post('/deleteadmintermineja/:id',requireAdmin,requireLogin, admintermineController.deleteAdminTermineja);
router.post('/alteradminkundenja/:id',requireAdmin,requireLogin, admintermineController.alterAdminTermineja);
//Admin Werkzeug
//View
router.get('/adminwerkzeug',requireAdmin,requireLogin, adminwerkzeugController.viewAdminWerkzeug);
//Update
router.post('/adminwerkzeug/:id',requireAdmin,requireLogin, adminwerkzeugController.updateAdminWerkzeug);
router.post('/adminwerkzeugarosa/:id',requireAdmin,requireLogin, adminwerkzeugController.updateAdminWerkzeugArosa);
router.post('/adminwerkzeugpeist/:id',requireAdmin,requireLogin, adminwerkzeugController.updateAdminWerkzeugPeist);
router.post('/adminwerkzeugmitarbeiter/:id',requireAdmin,requireLogin, adminwerkzeugController.updateAdminWerkzeugMitarbeiter);
router.post('/adminwerkzeugkunde/:id',requireAdmin,requireLogin, adminwerkzeugController.updateAdminWerkzeugKunde);
//Update Anzahl 
router.post('/adminanzahlwerkzeugarosa/:id',requireAdmin,requireLogin, adminwerkzeugController.updateAdminWerkzeugAnzahlArosa);
router.post('/adminanzahlwerkzeugpeist/:id',requireAdmin,requireLogin, adminwerkzeugController.updateAdminWerkzeugAnzahlPeist);
router.post('/adminanzahlwerkzeugmitarbeiter/:id',requireAdmin,requireLogin, adminwerkzeugController.adminanzahlwerkzeugmitarbeiter);
router.post('/adminanzahlwerkzeugkunde/:id',requireAdmin,requireLogin, adminwerkzeugController.adminanzahlwerkzeugkunde);
//save
router.post('/adminwerkzeug',requireAdmin,requireLogin, adminwerkzeugController.saveAdminWerkzeug);
router.post('/adminwerkzeugarosa',requireAdmin,requireLogin, adminwerkzeugController.saveAdminWerkzeugArosa); 
router.post('/adminwerkzeugpeist',requireAdmin,requireLogin, adminwerkzeugController.saveAdminWerkzeugPeist); 
router.post('/adminwerkzeugmitarbeiter',requireAdmin,requireLogin, adminwerkzeugController.saveAdminWerkzeugMitarbeiter); 
router.post('/adminwerkzeugkunde',requireAdmin,requireLogin, adminwerkzeugController.saveAdminWerkzeugKunde); 
//Delete
router.post('/deleteadminwerkzeug/:id',requireAdmin,requireLogin, adminwerkzeugController.deleteAdminWerkzeug);
router.post('/deleteadminwerkzeugarosa/:id',requireAdmin,requireLogin, adminwerkzeugController.deleteAdminWerkzeugArosa); 
router.post('/deleteadminwerkzeugpeist/:id',requireAdmin,requireLogin, adminwerkzeugController.deleteAdminWerkzeugPeist); 
router.post('/deleteadminwerkzeugmitarbeiter/:id',requireAdmin,requireLogin, adminwerkzeugController.deleteAdminWerkzeugMitarbeiter); 
router.post('/deleteadminwerkzeugkunde/:id',requireAdmin,requireLogin, adminwerkzeugController.deleteAdminWerkzeugKunde); 
//Change Werkzeugarosa, Werkzeugpeist, Werkzeugmitarbeiter und Werkzeugkunde
router.get('/adminwerkzeugarosa',requireAdmin,requireLogin, adminwerkzeugController.viewAdminWerkzeugArosa);
router.get('/adminwerkzeugpeist',requireAdmin,requireLogin, adminwerkzeugController.viewAdminWerkzeugPeist);
router.get('/adminwerkzeugmitarbeiter',requireAdmin,requireLogin, adminwerkzeugController.viewAdminWerkzeugMitarbeiter);
router.get('/adminwerkzeugkunde',requireAdmin,requireLogin, adminwerkzeugController.viewAdminWerkzeugKunde);
//Admin Material
router.get('/adminmaterial',requireAdmin,requireLogin, adminmaterialController.viewAdminMaterial); 
router.get('/adminmaterialarosa',requireAdmin,requireLogin, adminmaterialController.viewAdminMaterialArosa); 
router.get('/adminmaterialpeist',requireAdmin,requireLogin, adminmaterialController.viewAdminMaterialPeist); 
//Update
router.post('/adminmaterial/:id',requireAdmin,requireLogin, adminmaterialController.updateAdminMaterial);
router.post('/adminmaterialarosa/:id',requireAdmin,requireLogin, adminmaterialController.updateAdminMaterialArosa);
router.post('/adminmaterialpeist/:id',requireAdmin,requireLogin, adminmaterialController.updateAdminMaterialPeist);
//Update Anzahl
router.post('/adminanzahlmaterialarosa/:id',requireAdmin,requireLogin, adminmaterialController.updateAdminMaterialAnzahlArosa);
router.post('/adminanzahlmaterialpeist/:id',requireAdmin,requireLogin, adminmaterialController.updateAdminMaterialAnzahlPeist);
//save
router.post('/adminmaterial',requireAdmin,requireLogin, adminmaterialController.saveAdminMaterial);
router.post('/adminmaterialarosa',requireAdmin,requireLogin, adminmaterialController.saveAdminMaterialArosa);
router.post('/adminmaterialpeist',requireAdmin,requireLogin, adminmaterialController.saveAdminMaterialPeist);
//Delete
router.post('/deleteadminmaterial/:id',requireAdmin,requireLogin, adminmaterialController.deleteAdminMaterial);
router.post('/deleteadminmaterialarosa/:id',requireAdmin,requireLogin, adminmaterialController.deleteAdminMaterialArosa); 
router.post('/deleteadminmaterialpeist/:id',requireAdmin,requireLogin, adminmaterialController.deleteAdminMaterialPeist); 
//Admin Fahrzeuge
router.get('/adminfahrzeuge',requireAdmin,requireLogin, adminfahrzeugController.viewAdminFahrzeug);
//Save
router.post('/adminfahrzeuge',requireAdmin,requireLogin, adminfahrzeugController.saveAdminFahrzeuge);
router.post('/adminfahrzeugetanken',requireAdmin,requireLogin, adminfahrzeugController.saveAdminFahrzeugeTanken);
//Update
router.post('/adminfahrzeuge/:id',requireAdmin,requireLogin, adminfahrzeugController.updateAdminFahrzeuge);
router.post('/adminfahrzeugetanken/:id',requireAdmin,requireLogin, adminfahrzeugController.updateAdminFahrzeugeTanken);
//Delete
router.post('/deleteadminfahrzeuge/:id',requireAdmin,requireLogin, adminfahrzeugController.deleteAdminFahrzeuge);
router.post('/deleteadminfahrzeugetanken/:id',requireAdmin,requireLogin, adminfahrzeugController.deleteAdminFahrzeugeTanken);
//Admin Schlüssel
router.get('/adminschluessel',requireAdmin,requireLogin, adminschluesselController.viewAdminSchluessel);
router.post('/adminschluessel',requireAdmin,requireLogin, adminschluesselController.saveAdminSchluessel);
router.post('/updateadminschluessel/:id',requireAdmin,requireLogin, adminschluesselController.updateAdminSchluessel);
router.post('/deleteadminschluessel/:id',requireAdmin,requireLogin, adminschluesselController.deleteAdminSchluessel);
//Admin Schuhle
router.get('/adminschule',requireAdmin,requireLogin, adminschuhleController.viewAdminSchuhle);
router.post('/adminschuhle',requireAdmin,requireLogin, adminschuhleController.saveAdminSchuhle);
router.post('/updateadminschuhle/:id',requireAdmin,requireLogin, adminschuhleController.updateAdminSchuhle);
router.post('/deleteadminschuhle/:id',requireAdmin,requireLogin, adminschuhleController.deleteAdminSchuhle);
//Admin Backup
router.get('/backup',requireAdmin,requireLogin, adminbackupController.viewAdminBackup);
router.post('/backupstunden',requireAdmin,requireLogin, adminbackupController.backupstunden);
router.post('/backupkunden',requireAdmin,requireLogin, adminbackupController.backupkunden);
router.post('/backuparbeiten',requireAdmin,requireLogin, adminbackupController.backuparbeiten);
router.post('/backupwerkzeug',requireAdmin,requireLogin, adminbackupController.backupwerkzeug);
router.post('/backupwerkzeugarosa',requireAdmin,requireLogin, adminbackupController.backupwerkzeugarosa);
router.post('/backupwerkzeugpeist',requireAdmin,requireLogin, adminbackupController.backupwerkzeugpeist);
router.post('/backupwerkzeugmitarbeiter',requireAdmin,requireLogin, adminbackupController.backupwerkzeugmitarbeiter);
router.post('/backupwerkzeugkunde',requireAdmin,requireLogin, adminbackupController.backupwerkzeugkunde);
router.post('/backupmaterial',requireAdmin,requireLogin, adminbackupController.backupmaterial);
router.post('/backupfahrzeuge',requireAdmin,requireLogin, adminbackupController.backupfahrzeuge);
router.post('/backuptanken',requireAdmin,requireLogin, adminbackupController.backuptanken);
router.post('/backupschluessel',requireAdmin,requireLogin, adminbackupController.backupschluessel);
router.post('/backupschule',requireAdmin,requireLogin, adminbackupController.backupschule);
//Admin Lieferanten
router.get('/lieferanten',requireAdmin,requireLogin, adminlieferantenController.viewAdminLieferanten);
router.post('/adminlieferanten',requireAdmin,requireLogin, adminlieferantenController.saveAdminLieferanten);
router.post('/updateadminlieferanten/:id',requireAdmin,requireLogin, adminlieferantenController.updateAdminLieferanten);
router.post('/deleteadminlieferanten/:id',requireAdmin,requireLogin, adminlieferantenController.deleteAdminLieferanten);
//Admin Verkäufer
router.get('/adminverkaufer',requireAdmin,requireLogin, adminlieferantenController.viewAdminVerkaufer);
router.post('/adminverkaufer',requireAdmin,requireLogin, adminlieferantenController.saveAdminVerkaufer);
router.post('/updateadminverkaufer/:id',requireAdmin,requireLogin, adminlieferantenController.updateAdminVerkaufer);
router.post('/deleteadminverkaufer/:id',requireAdmin,requireLogin, adminlieferantenController.deleteAdminVerkaufer);
//Admin Post
router.get('/adminpost',requireAdmin,requireLogin, adminpostController.viewAdminPost);
router.get('/adminpostja',requireAdmin,requireLogin, adminpostController.viewAdminPostja);
router.get('/adminpostrs',requireAdmin,requireLogin, adminpostController.viewAdminPostrs);
router.post('/alteradminpost/:id',requireAdmin,requireLogin, adminpostController.alterAdminPost);
router.post('/alteradminpostja/:id',requireAdmin,requireLogin, adminpostController.alterAdminPostja);
router.post('/alteradminpostrs/:id',requireAdmin,requireLogin, adminpostController.alterAdminPostrs);
router.post('/saveadminpost',requireAdmin,requireLogin, adminpostController.saveAdminPost);
router.post('/deleteadminpost/:id',requireAdmin,requireLogin, adminpostController.deleteAdminPost);
router.post('/deleteadminpostja/:id',requireAdmin,requireLogin, adminpostController.deleteAdminPostja);
router.post('/deleteadminpostrs/:id',requireAdmin,requireLogin, adminpostController.deleteAdminPostrs);
//Exports   
module.exports = router;
 