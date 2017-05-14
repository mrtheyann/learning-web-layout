var express = require('express');
  app = express();

app.disable('x-powered-by');

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('\
    <h1>My page</h1>\
    This is <mark>html</mark>\
  ');
})

server = app.listen(3000, function(){
  console.log("Listening on port 3000");
})
