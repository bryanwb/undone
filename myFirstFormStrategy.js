// myFirstFormStrategy.js
module.exports= function(options) {
  options= options || {};
  var store = options.store;
  var sys = require('sys');
  var that= {};
  var my= {}; 
  that.name = options.name || "someName";

  function validateCredentials(executionScope, req, res, callback){
	    store.all(function(doc, meta){
			  return doc.name === req.body.username &&
			      doc.password === req.body.password;
		      },
		      function (err, docs, meta){
			  if(docs.length === 0){
			      executionScope.fail(callback);
			   } else {
			       executionScope.success({name: req.body.username}, callback);
			   }
		       }
		     );
  };
  
  function failedValidation(req, res){
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end("You Must supply a username and password");
  };

  that.authenticate = function(req, res, callback){
      if( req.body && req.body.username && req.body.password ) { 
	  validateCredentials(this, req, res, callback );
      }
      else {
	  failedValidation( req, res );
      }
  };
	    

  
  return that;
};  