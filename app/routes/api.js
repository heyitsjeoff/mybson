var express = require('express');
var app = express();
var router = express.Router();
var jwt = require('jsonwebtoken');
var authenticate = require('./api/authenticate');
var signup = require('./api/signup');
var config = require('../../config');

app.set('secret', config.secret);
app.set('tokenDuration', config.tokenDuration);

router.use('/signup', signup);

router.use('/authenticate', authenticate);

router.get('/', function(req, res){
    res.json({message: 'welcome to the bson API'});
});

var users = require('./api/users');

router.use('/users', users);

var bson = require('./api/bson');

router.use('/bson', bson);

module.exports = router;
