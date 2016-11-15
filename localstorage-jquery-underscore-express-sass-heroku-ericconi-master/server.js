var http = require('http');
var csv = require('./csv.js')



var express = require('express')
var app = express()

// https://nodejs.org/api/path.html
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs'); // http://expressjs.com/api.html#app.set

var expressLayouts = require('express-ejs-layouts');
app.set('layout', 'layout'); // defaults to 'layout'  '

// Serve static files
app.use(express.static('.')); // http://expressjs.com/api.html#app.use#
app.use(expressLayouts);

// Luego la consultamos con app.get('port')
app.set('port', (process.env.PORT || 8080)); 

/*
 * body-parser is a piece of express middleware that 
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body` 
*/


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
  res.render('index', { title: "LocalStorage"});
});

app.post('/csv', function(req, res){
  var original = req.body.original;
  var data = csv.calculate(original);
  res.render('greet', {originals: data, title: 'greet'});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


