var express = require('express');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var User = require('../../models/user');

var config = require('../../../config');

app.set('secret', config.secret);
app.set('tokenDuration', config.tokenDuration);


router.post('/', function(req, res){

    var username = ((req.body.username) ? req.body.username : null);
    var password = ((req.body.password) ? req.body.password : null);
    var email = ((req.body.email) ? req.body.email : null);

    if(!username || !password || !email){
        res.status(400);
        res.json({
            success: false,
            message: 'missing parameters: `email`, `username`, and `password` are required'
        });
        return;
    }

    var newUser = new User({
        username: username,
        password: password,
        email: email
    });

    newUser.save(function(err){

        if(err){

            res.status(500);
            res.json({success: false, message: 'There was an error while creating user', error: err.message});
            return;

        }

        var token = jwt.sign({userid: newUser._id}, app.get('secret'), {
            expiresIn: app.get('tokenDuration')
        });

        res.json({
            success: true,
            message: 'account created. enjoy your token',
            token: token
        });

    });

});

module.exports = router;
