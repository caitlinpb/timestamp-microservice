
var express = require('express');
var app = express();

var bodyParser = require('body-parser')

// --> 7)  Mount the Logger middleware here

app.use('/', function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})
// --> 11)  Mount the body-parser middleware  here

app.use(bodyParser.urlencoded({ extended: false }))


/** 1) Meet the node console. */
console.log("Hello World")


/** 2) A first working Express Server */

// app.get('/', function(req, res) {
//   res.send('Hello Express');
// })

/** 3) Serve an HTML file */

app.get('/', function(req, res) {
  var absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
})
/** 4) Serve static assets  */

var publicPath = __dirname + '/public';
app.use('/', express.static(publicPath));


/** 5) serve JSON on a specific route */

// app.get('/json', function(req, res) {
//   res.json({"message": "Hello json"});
// })

/** 6) Use the .env file to configure the app */
 app.get('/json', function(req, res) {
  var message = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();  
  }
  res.json({"message": message});
})

 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !



/** 8) Chaining middleware. A Time server */

app.get('/now', function(req, res, next) {
  req['time'] = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.time})

})

/** 9)  Get input from client - Route parameters */

app.get('/:word/echo', function(req, res) {
  res.json({"echo": req.params.word});
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.route('/name/').get(function(req, res) {
  var name = req.query.first + " " + req.query.last;
  res.json({"name": name});
}).post(function(req, res) {
  var name = req.body.first + " " + req.body.last;
  res.json({"name": name});
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */


app.get('/api/timestamp/:date_string?', function(req, res) {
  console.log(req.params.date_string);
  var dateString = req.params.date_string;
  var date;
  if (dateString.length === 0) {
    date = new Date()
  }
  date = new Date(dateString);
  if (date) {
    return {"unix": date.getTime(), "utc" : date.toUTCString() }  
  }
  
  return res.json({"error": "Invalid Date"})
})


app.get('/api/whoami', function(req,res) {
  console.log(req.headers)
  var ip = req.headers['x-forwarded-for'].split(',')[0]
  res.json({
    "ipaddress": ip,
    "language": req.headers['accept-language'],
    "software": req.headers['user-agent'],
    
  });
})
//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
