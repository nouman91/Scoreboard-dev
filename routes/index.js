var express = require('express');
var router = express.Router();
var contextPath = process.cwd();
var ctrl = require(contextPath + "/controllers/index.js");

/* GET home page. */
/*router.get('/', function(req, res, next) {
 res.sendFile(contextPath + '/public/main.html');
});

router.get('/admin-login', function(req, res, next) {
 res.sendFile(contextPath + '/public/login.html');
});

router.post('/sign-in', function(req, res, next) {
 res.sendFile(contextPath + '/public/admin_main.html');
});*/


/*******************************************************************************************
-- Configuring GET routes
*******************************************************************************************/
router.get('/user',ctrl.get)
router.get('/teams',ctrl.get);
router.get('/courts',ctrl.get);
router.get('/match_title',ctrl.get);

/*******************************************************************************************
-- Configuring POST routes
*******************************************************************************************/
router.post('/teams',ctrl.create);
router.post('/courts',ctrl.create);
router.post('/match_title',ctrl.create);
router.post('/user',ctrl.create);


/*******************************************************************************************
-- Configuring GET routes
*******************************************************************************************/
router.delete('/teams',ctrl.delete);
router.delete('/courts',ctrl.delete);
router.delete('/match_title',ctrl.delete);
router.delete('/user',ctrl.delete);


/*******************************************************************************************
-- Configuring GET routes
*******************************************************************************************/
router.put('/teams',ctrl.update);
router.put('/courts',ctrl.update);
router.put('/match_title',ctrl.update);
router.put('/user',ctrl.update);


module.exports = router;
