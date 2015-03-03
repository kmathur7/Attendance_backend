/** 
	* Declaring the required modules for the application.
*/
var express = require('express');
var app = express();

// -- declaring the folder to serve static assets
app.use(express.static('public'));

// -- code to start the server -- 
var server = app.listen(3000, function () {
	var host = server.address().address
  	var port = server.address().port
	console.log('Backend server listening at http://%s:%s', host, port)
});