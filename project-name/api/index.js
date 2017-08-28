// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var sse = require('./sse');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

var port = 3001;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    return res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/user/:id?', function(req, res) {
    res.json({ id: req.params.id });
});

router.post('/wait5sec', function(req, res) {
    setTimeout(() => res.json({ data: {msg:'done'}, status: 0 }), 5000);
});

router.post('/status2', function(req, res) {
    res.json({ status: 2 });
});

router.post('/wait1min', function(req, res) {

    setTimeout(() => res.json({ msg: 'done' }), 60000);
});

router.post('/err500', function(req, res) {

    setTimeout(() => res.status(500).json({ err: '500' }), 5000);
});

// Подключение роутеров
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api


var server = app.listen(port, '127.0.0.1')
