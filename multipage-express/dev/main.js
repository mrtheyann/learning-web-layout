var express = require('express');
  app = express();

var store = {
  home: {
    page: 'Our Super Awesome App',
    content: 'Home, sweet home'
  },
  about: {
    page: 'About',
    content: 'It\'s an express framework project'
  },
  downloads: {
    page: 'Downloads Page',
    content: 'Download all stuff here'
  },
  profile: {
    page: 'Profile Page',
    content: 'This is your profile, dawg'
  }
};

app.disable('x-powered-by');
app.set('view engine', 'jade');
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/:page?', function(req, res) {
  var page = req.params.page, data;
  console.log(page);
  if (!page) page = 'home';
  data = store[page];
  if (!data) {
    res.redirect('/');
    return;
  }
  data.links = Object.keys(store);
  res.render('main.jade', data);
});

server = app.listen(3000, function() {
  console.log("Listening on port 3000");
});
