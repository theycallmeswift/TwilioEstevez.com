var express = require('express')
  , config = require('./config.json')
  , db = require('./lib/db')
  , app = express()
  , Twilio = require('twilio-js')
  , SendGrid = require('sendgrid').SendGrid
  , sg = new SendGrid(process.env.SENDGRID_USER, process.env.SENDGRID_PASS)
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

app.post('/email', function(req, res) {
  var email = req.body.email;

  db.findRandomJoke(function(err, joke) {
    if(err) return next(err);
    if(!joke) res.statusCode = 404;

    sg.send({
      to: email,
      from: 'emilio@twilioestevez.com',
      subject: joke.question,
      text: joke.answer
    }, function(suc, message) {
      if(!suc) {
        console.log(message);
        res.statusCode = 500;
        return res.end();
      }

      res.send({ status: "OK" });
    });
  });
});

db.connect(config.mongodb, function(err) {
  if(err) throw err;

  app.listen(port);
});
