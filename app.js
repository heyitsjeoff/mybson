var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var cors = require('cors');
var config = require('./config');

// app configuration
var port = process.env.PORT || 8080;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cors());


app.get('/', function(req, res){
    res.send('welcome to mybson');
});

var api  = require('./app/routes/api');

app.use('/api', api);

app.listen(port);
console.log('listening at localhost:' + port);
