require.paths.push("./lib");

var port = process.env.PORT || 8001;
var app = require("./lib/express").createServer();

app.get('/', function(req, res) { 
	    res.send("hello heroku");
});

app.listen(port);
