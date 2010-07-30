var sys = require('sys');
var nstore = require('./lib/nstore');

var users = nstore('./data/users.db');


// Insert a new document with key "creationix"
users.save("creationix", {name: "Tim Caswell", age: 28}, function (err) {
    if (err) { throw err; }
    // The save is finished and written to disk safely
});

// Or insert with auto key
users.save(null, {name: "Bob"}, function (err, meta) {
    if (err) { throw err; }
    // You now have the insert id
});


// Load the document with the key "creationix"
users.get("creationix", function (err, doc, meta) {
    if (err) { throw err; }
    // You now have the document
    sys.print(doc.name);
});

var foobar = { name: 'bryan'};

sys.print(foobar.name);


users.all(function (doc, meta) {
    return true;
}, function (err, docs, metas) {
  if (err) throw err;
  // Do something with the results
});

