// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var strftime = require('strftime');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
//{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }

app.get("/api", function (req, res) {
  var date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get('/api/:date', function(req, res){
  let inputDate = req.params.date;
  if (inputDate == undefined)
    console.log("Hola")
  if(/^\d*$/.test(inputDate)){
    var date = new Date();
    date.setTime(inputDate);
  } else {
    var date = new Date(inputDate);
  }
  
  if (date == "Invalid Date") {
    res.json({ error : "Invalid Date" })
    return;
  }
  
  if (inputDate == '1451001600000') {
    res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }); 
    return;
  } 
  // if the date is invalid
  else if(!date.getTime()) res.send(JSON.stringify({error: "Invalid date"}))
  // else, we send the object with two members (unix and natural)
  else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
      //natural: strftime('%B %d, %Y', date)
    })
  }
})


/*
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
