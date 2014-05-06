var express = require('express');

var env = process.env.NODE_ENV  =  process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env];

console.log('express...');
require('./server/config/express')(app, config);

console.log('mongoose...');
require('./server/config/mongoose')(config);

console.log('passport...');
require('./server/config/passport')(config);

console.log('routes...');
require('./server/config/routes')(app);

app.listen(config.port);
console.log('(' + process.env.NODE_ENV + ') Listening on PORT ' + config.port + '...');

//git status
//git add -A
//git commit -m "notes"
//git remote -v
//git push heroku master (prompts for passphrase)
//
//heroku log #In case something goes wrong with the push
//
//heroku ps:scale web=1 #tells heroku to give the app some juice
//heroku open #opens the app in a browser
