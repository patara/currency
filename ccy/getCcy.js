var application_root = __dirname,
    express = require("express"), // Initialisation of Express.js module for Node.js REST Calling
    path = require("path");

var app = express();              // Express variable
//http://api.fixer.io/latest?base=USD
var http = require('http');
var d = '';
// GET Request options configuration
var optionsget = {
    host : 'localhost',
    port : 8080,
    path : 'http://api.fixer.io/latest?base=USD', // url with parameters
    method : 'GET' // GET Method
};

// Express Configuration

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Preparing Express REST API 
app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    // HTTP GET request
    var reqGet = http.request(optionsget, function(response) {
        response.on('data', function(data) {
            res.end(data); // Writing the Remote REST Call response to the Express REST API "getRemoteData"
        });
    });

    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
});
app.listen(1212); // Node.js server is running in port 1212.