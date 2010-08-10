
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
	      connect.staticProvider(__dirname + '/public'),
	      connect.session()
	      );


app.get('/', function(req, res) { 
	var user;
	if (req.sessionStore.cookie && req.sessionStore.cookie.user){
	    user = req.sessionStore.cookie.user;
	}

	res.render("index.ejs", 
	{locals : { body: "<p>hello world</p>", user: user}, layout: false
		       });
});

app.get('/login?', function (req, res) {

	function authenticate (username, password, callback) {
	    users.all(function(doc, meta){
			return doc.name === username &&
			      doc.password === password;
		      },
		      function (err, docs, meta){
			  if(docs.length === 0){
			       res.writeHead(200, { 'Content-Type': 'text/plain' });
			       res.end("Invalid credentials supplied");
			   } else {
			       req.sessionStore.cookie.user = docs[0]['name'];    
			       // sys.puts(req.session.user.name);
			       req.session.authenticated = true;	   
			       res.redirect('/', 302);
			   }
		       } 
		     );
	};
	

	if (req.query.username && req.query.password){
	    var username = req.query.username,
	    password = req.query.password;
	    authenticate(username, password);
	} else {
	    res.writeHead(200, { 'Content-Type': 'text/plain' });
	    res.end("You Must supply a username and password");
	}       

});

app.get('/signout', function(req, res) {
	req.sessionStore.cookie.user = undefined;
	res.redirect("/", 302);
});

app.get('/users/:user', function(req, res) { 
	var user;
	if (req.sessionStore.cookie && req.sessionStore.cookie.user){
	    user = req.sessionStore.cookie.user;
	} 

	if (user === req.params.user){
	    users.get(user, function(err, doc, meta){
		    sys.puts(sys.inspect(doc));
		    res.render("./user.ejs",
			  {locals : 
			       {user: user, firstName: doc['firstName'],
				lastName: doc['lastName'],
			        username: doc['name']},
			        layout: false});
		    });
	} else {
	    res.writeHead(200, { 'Content-Type': 'text/plain' });
	    res.end("You can only access your own user account");	    
	}

});

app.get('/signup', function(req, res) { 
	var user;
	if (req.sessionStore.cookie && req.sessionStore.cookie.user){
	    user = req.sessionStore.cookie.user;
	}

	res.render("./signup.ejs",{locals : {user: user}, layout: false});
});


app.get('/newproject', function(req, res) { 
	res.sendfile("./public/newproject.html");
});

app.listen(parseInt(port));
