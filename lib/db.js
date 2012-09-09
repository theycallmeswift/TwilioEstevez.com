var mongodb = require('mongodb')
  , db
  , server
  , collection;

function connect(config, cb) {
  server = new mongodb.Server(config.server, config.port, { auto_reconnect: true });
  db = new mongodb.Db(config.database, server, {});

  db.open(function(err, p_client) {
    if(err) return cb(err);

    if(config.username && config.password) {
      db.authenticate(config.username, config.password, function(err) {
        if(err) return cb(err);

        collection = new mongodb.Collection(db, "jokes");
        return cb();
      });
    } else {
      collection = new mongodb.Collection(db, "jokes");
      return cb();
    }
  });
}

function insertJoke(question, answer, cb) {
  collection.update(
    { question: question },
    { $set: { answer: answer, random: Math.random() }},
    { safe: true, upsert: true },
    function(err) {
      if (err) return cb(err);
      cb();
    }
  );
}

function findRandomJoke(cb) {
  var cursor = collection.find({ });
  cursor.toArray(function(err, docs) {
    if(err) return cb(err);
    var randno = Math.floor( Math.random() * docs.length)
      , doc = docs[randno];

    console.log(doc);

    return cb(null, doc);
  });
}

module.exports = {
  connect: connect,
  insertJoke: insertJoke,
  findRandomJoke: findRandomJoke
};
