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
  var rand = Math.random();
  collection.findOne({ random: { $gte: rand }}, function(err, doc) {
    if(err) return cb(err);
    console.log(err, doc);
    if(doc) return cb(null, doc);

    collection.findOne({ random: { $lte : rand }}, cb);
  });
}

module.exports = {
  connect: connect,
  insertJoke: insertJoke,
  findRandomJoke: findRandomJoke
};
