var express = require('express');
var router = express.Router();
var app = express();
var User = require('../../models/user');
var jwt = require('jsonwebtoken');

var config = require('../../../config');

app.set('secret', config.secret);
app.set('tokenDuration', config.tokenDuration);

router.post('/', function(req, res){

    var username = req.body.username;

    // find User where User.username is username
    User.findOne({
        username: username
    }, function(err, user){

        if(err) {

            res.status(400);
            res.json({success: false, message: 'There was an error looking for the username', error: err});

        } else if(!user){

            res.status(400);
            res.json({success: false, message: 'Authentication failed. User not found'});

        } else {

            var password = req.body.password;

            user.comparePassword(password, function(err, isMatch) {

                if(err) {

                    res.status(400);
                    res.json({success: false, message: 'There was an error', error: err.message});
                    return;

                }

                if(isMatch){

                    var token = jwt.sign({userid: user._id}, app.get('secret'), {
                        expiresIn: app.get('tokenDuration')
                    });

                    res.json({
                        success: true,
                        message: 'enjoy your token',
                        token: token
                    });

                } else {
                    res.status(400);
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                }

            });

        }

    });
});

module.exports = router;
