/** 
	* Declaring the required modules for the application.
*/
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://kunal:kalp1234@ds051831.mongolab.com:51831/attendancedb');
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connected!!");
});

// -- Defining Schemas 
var Schema = mongoose.Schema;
var courseSchema = new Schema({
  code:  String,
  title: String,
  centre: String,
  venue: String,
  startdate: Date,
  enddate: Date,
  faculty:{
    empid: Number,
    name: String,
    desgn: String,
    email: String,
    project: String
  }
});

var Course = mongoose.model('Course', courseSchema);

// -- declaring the folder to serve static assets
app.use(express.static('public'));

/**
	* API End Points
*/
app.post('/courseid', function (req, res) {
  Course.findOne({ code: req.body.id },function(err,coursedata){
    console.log(coursedata);
    res.send({content:true,data:coursedata});
  });
	
  
});

app.post('/newcourse', function (req, res) {
  //console.log(req.body.code);
  var newcourse = new Course(req.body);
  newcourse.save(function (err) {
    if (err) return console.log(err);
  // saved!
  });
});


// -- code to start the server -- 
var server = app.listen(3000, function () {
	var host = server.address().address
  	var port = server.address().port
	console.log('Backend server listening at http://%s:%s', host, port)
});
