require('rootpath')();
var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config/db.json');



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.secret }).unless(
    {
        path: ['/users/authenticate',
               '/users/register',
               '/users/count',
               '/users/username',
               '/users/validate',
               '/users/forgot',
               '/users/reset',
               '/ideas/count',
               '/ideas/search',
               '/ideas',
               '/ideas/latest',
               '/ideas/upload',
               '/ideas/addShare',
               '/ideas/byId',
      '/ideas/hashtags', '/tags/reset',
            'assets/images'
        ] }));

app.use(express.static(path.join(__dirname, 'assets/images')));
// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/ideas', require('./controllers/ideas.controller'));
app.use('/notif', require('./controllers/notifications.controller'));
app.use('/tags', require('./controllers/tags.controller'));



// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});