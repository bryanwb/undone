
require.paths.unshift("vendor/lib");

	//test paths to make sure they work
var connect = require('connect');
var express = require('express');
var nstore = require('nstore');
var users = nstore('data/users.db');
var sys = require('sys');


// require express and others to make sure
var port = process.env.PORT || 8001;
var app = require("express").createServer(
	      connect.cookieDecoder(),
	      session = connect.session()
	      );

/*users.get('creationix', function(err, doc) { 
	      req.session.user = doc;
	  });
*/

app.get('/', function(req, res) { 

	res.render("index.ejs", 
		       {locals : { body: "<p>hello world</p>", user: session.user},
			layout: false
		       });
});

app.get('/login', function (req, res) {
	    
	    function authenticate (req, res, callback) {
		var query = req.query;
		if (query && query.username && query.password){
		    users.all(function(doc, meta) {
				  return doc.name === query.username &&
				      doc.password === query.password;
			      }, 
			      function (err, docs, meta){
				  if(!err)
				      //do something
				      ;
			      }
			     );
		}    
	    };
	     
	    sys.puts(sys.inspect(req));

});

app.get('/signup', function(req, res) { 
	res.sendfile("./public/signup");
});


app.get('/newproject', function(req, res) { 
	res.sendfile("./public/newproject.html");
});

app.listen(parseInt(port));
