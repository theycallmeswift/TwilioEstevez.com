## Twilio Estevez

Hundreds of monkeys at keyboards spend their days pouring over the countless Emilio Estevez jokes that we receive to find the best content for you. Appreciate that shit and enjoy it as Emilio would want you to.

![http://d1tp7nx49eepfb.cloudfront.net/wp-content/uploads/2011/05/emilio_estevez.jpg](http://d1tp7nx49eepfb.cloudfront.net/wp-content/uploads/2011/05/emilio_estevez.jpg)

__Q:__ What do you call Emilio Estevez when he's working on an API?  
__A:__ Emilio REST-evez

## The API

Although the Twilio Estevez API is relatively simple on the outside, some incredibly complex calculations and analysis happening in the background.

### GET a random joke (/api/v1/jokes/random)

Use this endpoint to get a random Emilio Estevez joke. Really, it's that simple. By default, the API responds with JSON, but if you specify a .xml ending you can get the response in Twiml format.

#### URL:

 > http://twilioestevez.com/api/v1/jokes/random

#### Response: (JSON)

```
{
  "id": "504bbdb1c085772517f6db47",
  "question": "What do you call Emilio Estevez when he's naked?",
  "answer": "Emilio Undressed-evez"
}
```

#### Response: (XML)

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>What do you call Emilio Estevez when he's naked?</Say>
  <Pause />
  <Say>Emilio Undressed-evez</Say>
</Response>
```
