var express = require('express')
  , config = require('./config.json')
  , db = require('./lib/db')
  , app = express()
  , Twilio = require('twilio-js')
  , port = process.env.PORT || 3000;

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

app.get(/^\/api\/v1\/jokes\/random(.*)?$/, function(req, res, next) {
  db.findRandomJoke(function(err, joke) {
    if(err) return next(err);
    if(!joke) res.statusCode = 404;

    if(req.params[0] === '.xml') {
      var xml = Twilio.TwiML.build(function(twiml) {
        twiml.say(joke.question);
        twiml.pause(5);
        twiml.say(joke.answer);
      });
      res.send(xml);
    } else {
      res.send({ id: joke._id, question: joke.question, answer: joke.answer });
    }
  });
});

app.post('/api/v1/jokes', function(req, res) {
  if(req.body.question && req.body.answer) {
    db.insertJoke(req.body.question, req.body.answer, function(err) {
      if(err) {
        res.statusCode = 406;
        res.send({ status: "ERROR" });
      } else {
        res.send({ status: "OK" });
      }
    });
  } else {
    res.statusCode = 406;
    res.send({ status: "ERROR" });
  }
});

db.connect(config.mongodb, function(err) {
  if(err) throw err;

  app.listen(port);
});
