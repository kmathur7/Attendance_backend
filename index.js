/** 
	* Declaring the required modules for the application.
*/
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connected!!");
});

// -- Defining Schemas 
var Schema = mongoose.Schema;

// -- Schema for Course Details
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

// -- Schema for Participant Details
var participantSchema = new Schema({
  coursecode: String,
  empid: Number,
  name: String,
  desgn: String,
  project: String,
  email: String,
  mobile: Number,
  day1: Boolean,
  day2: Boolean,
  day3: Boolean,
  day4: Boolean,
  day5: Boolean
});


var Course = mongoose.model('Course', courseSchema);
var Participant = mongoose.model('Participant', participantSchema);

// -- declaring the folder to serve static assets
app.use(express.static('public'));

/**
	* ----------------------------- API End Points ---------------------------------
*/

/** Course ID is posted and the API responds with course details 
  * which is shown to the user on the attandance page.
*/ 
app.post('/courseid', function (req, res) {
  Course.findOne({ code: req.body.id },function(err,coursedata){
    res.send({content:true,data:coursedata});
  });
});


/** New course details are posted and the API stores them in 
  * the DB.
*/ 
app.post('/newcourse', function (req, res) {
  //console.log(req.body.code);
  var newcourse = new Course(req.body);
  newcourse.save(function (err) {
    if (err) return console.log(err);
  // saved!
  });
});

/** The participant will post attendance everyday using this API to the DB.
  * 
*/
app.post('/registerattendance', function (req, res) {
  var associate = new Participant(req.body);
  associate.save(function (err) {
    if (err) return console.log(err);
  // saved!
  });
});


/**
  * ----------------------------- End of API End Points ---------------------------------
*/

// -- code to start the server -- 
var server = app.listen(3000, function () {
	var host = server.address().address
  	var port = server.address().port
	console.log('Backend server listening at http://%s:%s', host, port)
});
