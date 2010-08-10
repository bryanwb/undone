
require.paths.unshift("vendor/lib");

//test paths to make sure they work
var connect = require('connect');
var express = require('express');
var nstore = require('nstore');
var users = nstore('./data/users.db');
var sys = require('sys');


//require express and others to make sure
var port = process.env.PORT || 3000;
var app = express.createServer(
	      connect.cookieDecoder(),
	      connect.bodyDecoder(),
	      connect.session()
	      );


app.get('/', function(req, res) { 

	res.render("index.ejs", 
	{locals : { body: "<p>hello world</p>", user: req.session.user}, 			layout: false
		       });
});

app.get('/login', function (req, res) {

	function authenticate (username, password, callback) {
	    users.get("bwb",
		       function (err, doc, meta){
			   if(!err){
			       ; //do something
				       }
			   sys.print(sys.inspect(doc));
			   req.session.user = doc.name;    
			   req.session.authenticated = true;	   
			   req.redirect('/', 301);
		       } 
		     );
	};
	

	if (req.query && req.query.username && req.query.password){
	    var username = req.query.username,
	    password = req.query.password;
	    authenticate(username, password);
	} else {
	    res.writeHead(200, { 'Content-Type': 'text/plain' });
	    res.end("You Must supply a username and password");
	}       

});

app.get('/signup', function(req, res) { 
	res.sendfile("./public/signup");
});


app.get('/newproject', function(req, res) { 
	res.sendfile("./public/newproject.html");
});

app.listen(parseInt(port));
