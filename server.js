
require.paths.unshift("vendor/lib");

//test paths to make sure they work
var connect = require('connect');
var express = require('express');
var auth = require('connect-auth');
var nstore = require('nstore');
var users = nstore('./data/users.db');
var sys = require('sys');
var authStrategy = require('./myFirstFormStrategy')({store: users});

//require express and others to make sure
var port = process.env.PORT || 3000;
var app = express.createServer(
	      express.cookieDecoder(),
	      express.bodyDecoder(),
	      connect.staticProvider(__dirname + '/public'),
	      express.session()
	      );


app.get('/', function(req, res) { 
	var user;
	if (req.session && req.session.user){
	    user = req.session.user;
	}

	res.render("index.ejs", 
	{locals : { body: "<p>hello world</p>", user: user}, layout: false
		       });
});

app.post('/login?', function (req, res) {
           
	authStrategy.authenticate(req, res, 
		    function(){
			if(req.isAuthenticated())
			    res.redirect('/', 302);
                        else{
			    res.writeHead(200, { 'Content-Type': 'text/plain' });
			    res.end("Invalid credentials supplied");
			}
		    });				       
});


app.get('/signout', function(req, res) {
	    req.session.regenerate(function(err){
		    if(err){
			sys.puts("ERROR: couldn't destroy your session");
		    }else {
			res.redirect("/", 302);
		    }
});
    
	;
});

app.get('/users/:user', function(req, res) { 
	var user;
	if (req.sessionStore.cookie && req.sessionStore.cookie.user){
	    user = req.session.user;
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
	if (req.session.user){
	    user = req.session.user;
	}

	    //generate user id parseInt(Math.random()*5000, 10);
            //remember to check if it first exists
	res.render("./signup.ejs",{locals : {user: user}, layout: false});
});


app.get('/newproject', function(req, res) { 
	res.sendfile("./public/newproject.html");
});

app.listen(parseInt(port));
