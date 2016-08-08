var express = require('express');
var config = require('./config');
var router = require('./router/router');
var bodyParser = require('body-parser');
require('./model/db.js');

const appServer = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

appServer.use(allowCrossDomain);
appServer.use(bodyParser.urlencoded({ extended: false }));
appServer.use(bodyParser.json());

router.config(appServer);
appServer.listen(config.port, function () {
    console.log('Server is running!');
});