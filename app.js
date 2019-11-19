var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config = require('./config');

var numb = 1;

users = [];
strangers = [];
stranger = 'dddd';

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
})


io.on('connection', function (socket) {

    console.log('a user connect with socket id=' + socket.id + "!");
    // store the room in a var for convenience
    var room = "room" + numb;
    //store two user in single room
    var user = [];
    // join socket to the next open room
    socket.join(room);

    // store room on socket obj for use later - IMPORTANT
    socket.current_room = room;
    // console.log('current room =',socket.current_room);

    // log some stuff for testing
    console.log("Joined room: ", socket.current_room, "users=", socket.id);

    // Check room occupancy, increment if 2 or more
    io.in(room).clients(function (err, clients) {

        console.log('user room no=', room);
        console.log('clients', clients);
        user.push(clients);
        console.log(clients.length);
        //   console.log(user.length);

        if (clients.length == 1) {
            //  var msg1 = "waiting for user for chat";
            // var obj1 = JSON.parse(msg1);
            console.log('current room no:', room, ',waiting for user for chat and current user=', clients[0]);
            io.in(socket.current_room).emit('waiting', clients);
        }
        if (clients.length == 2) {
            console.log('current room no:', room, ',connected with stranger:', clients[1]);
            io.in(socket.current_room).emit('connected', clients)
        }
        if (clients.length >= 2) {
            numb++;
        }
        console.log('----------')
    });

    /*    if (strangers.indexOf(socket.id) == -1) {
            strangers.push(socket.id);
            console.log('login strangers 1', strangers);
        }
        if (strangers[strangers.length - 1]) {
            users.push(socket.id);
            console.log('login users 2', users);
            stranger = strangers[strangers.length - 2]
            console.log('login stranger 1', stranger)
            socket.emit('loginSuccess', socket.id, stranger);
            io.sockets.emit('system', socket.id, users.length, 'login');
        } else {
            socket.emit('wait', socket.id)
        }
    };*/


    socket.on('sender', function (msg) {
        // emit to that sockets room, now we use that current_room
        console.log(msg);
       
        io.in(socket.current_room).emit('chat message',msg);

    });


    socket.on('disconnect', function () {
        console.log('socket disconnected');
        console.log(room);
        var id = socket.id;

        console.log('deleted room no =', socket.current_room, 'deleted user', id);
        console.log('dleted current room no=', socket.current_room, 'remaining user in room', user[0])
        io.in(room).emit('logout');
    });
});

http.listen(config.port, () => {
    console.log('server is started @', config.port);
});

/*var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config = require('./config');

var numb = 1;

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
})

io.on('connection', function (socket) {
    console.log('a user connect with socket id=' + socket.id + "!");

    // store the room in a var for convenience
    var room = "room" + numb;
    // join socket to the next open room
    socket.join(room);

    // store room on socket obj for use later - IMPORTANT
    socket.current_room = room;
    console.log(socket.current_room);

    // log some stuff for testing
    console.log('made socket connection', socket.id);
    console.log("Joined room: ", socket.current_room, "users=", socket.id);

    // Check room occupancy, increment if 2 or more
    io.in(room).clients(function (err, clients) {
        console.log(clients);
        if (clients.length >= 2) {
            numb++;
        }
    });

    socket.on('sender', function (data) {
        // emit to that sockets room, now we use that current_room
        console.log(data);
        io.in(socket.current_room).emit('chat message', data);
    });

    socket.on('disconnect', function () {
        console.log('socket disconnected');
        //       if (socket.nickname != null) {
        //          //users.splice(socket.userIndex, 1);
        //        users.splice(users.indexOf(socket.nickname), 1);
        //      strangers.splice(users.indexOf(socket.nickname), 1);
        //    socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        //}
    });
    //new message get
    socket.on('postMsg', function (msg, color, stranger) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color, stranger);
    });
});



http.listen(config.port, () => {
    console.log('server is started @', config.port);
});
*/




