
/**
 * Module dependencies.
 */

// var express = require('express')
//   , routes = require('./routes')
//   , UUID = require('node-uuid')
//   , http = require('http');

// var app = express();
// var server = http.createServer(app);
// var io = require('socket.io').listen(server);

var express = require('express')
    , http = require('http')
    , UUID = require('node-uuid');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var routes = require('./routes')
var room = require('./routes/room.js')
server.listen(8081);
// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    //app.use(express.bodyParser());
    //app.use(express.methodOverride());
    //app.use(express.cookieParser());
    //app.use(express.session({ secret: 'thesuperpassword' }));
    app.use(require('stylus').middleware({ src: __dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/javascripts'));
    app.set('view options', {layout: false});
    app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
});

// Routes

app.get('/', routes.index);
app.get('/room1', room.room1);


//app.listen(process.env.PORT);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


io.configure(function(){
    io.set('log level', 1);
    io.set('authorization', function (handshakeData, callback) {
        callback(null, true); // error first callback style
    });
});

io.sockets.on('connection', function (client) {
    client.userid = UUID();
    console.log('\t socket.io:: player ' + client.userid + ' connected');
    client.emit('uid', client.userid);

    client.join('room1');

    client.on('message', function(m) {
        console.log(m);
    });

    client.on('disconnect', function () {
        console.log('\t socket.io:: client disconnected ' + client.userid);
    })

    client.on('button', function(m) {
        console.log(m + ' clicked by ' + client.userid);
        client.broadcast.to('room1').emit('msg', m);
        client.emit('msg', m);
    });

    client.on('input', function(m) {
        console.log('recieved input ' + m + ' from ' +client.userid);
        io.sockets.in('room1').emit('nickname', m);

    });
});
