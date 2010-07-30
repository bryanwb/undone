require.paths.push("./lib");

var port = process.env.PORT || 8001;
var app = require("./lib/express").createServer();

app.get('/', function(req, res) { 
	res.sendfile("./public/index.html");
});

app.get('/login', function(req, res) { 
	res.sendfile("./public/login.html");
});


app.get('/newproject', function(req, res) { 
	res.sendfile("./public/newproject.html");
});


app.listen(port);
