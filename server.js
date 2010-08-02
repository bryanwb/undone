//require.paths.push("./lib");
//require.paths.unshift('express');

require.paths.unshift("vendor/lib");

	//test paths to make sure they work
var connect = require('connect');
var express = require('express');



// require express and others to make sure
var port = process.env.PORT || 8001;
var app = require("express").createServer();

app.get('/', function(req, res) { 
	res.send("Hello heroku");
});
/*
app.get('/login', function(req, res) { 
	res.sendfile("./public/login.html");
});


app.get('/newproject', function(req, res) { 
	res.sendfile("./public/newproject.html");
});

*/
app.listen(port);
