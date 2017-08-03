

var path = require('path');
var routes = require('./routes/api');

// Initialize Express Server
const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const logger = require('morgan');
const app = express();



// -------------------------------------------------
//App Setup


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//bind api routes
routes(app);

//path
var pathToApp = path.join(__dirname, './../build');
app.use('/static', express.static(path.join(pathToApp, 'static')));
app.use('/', function(req, res) {
  res.sendFile(path.join(pathToApp, '/index.html'));
});

app.use(logger("dev"));


// -------------------------------------------------
// Server Setup
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});


