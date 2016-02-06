var express = require('express');
var router = express.Router();
var contextPath = process.cwd();
console.log(contextPath);
/* GET home page. */
router.get('/', function(req, res, next) {
 res.sendFile(contextPath + '/public/main.html');
});

router.get('/admin-login', function(req, res, next) {
 res.sendFile(contextPath + '/public/login.html');
});

router.post('/sign-in', function(req, res, next) {
 res.sendFile(contextPath + '/public/admin_main.html');
});

module.exports = router;
