var sys = require('sys');
require.paths.unshift("./vendor/lib");
var connect = require('connect');
var express = require('express');
var auth =  require('connect-auth');

var MyFirstFormStrategy= require('./myFirstFormStrategy');
function routes(app) {
  app.get('/', function(req, res, params) {
        req.authenticate(['someName'], function(error, authenticated) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Hello World');
        });
  });
}
var server = connect.createServer(
      connect.cookieDecoder(),
      connect.session(),
      connect.bodyDecoder(),
      auth( MyFirstFormStrategy() ),
     connect.router(routes)
);
server.listen(3000);