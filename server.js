//personal chat

const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config = require('./config');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


/*
io.sockets.on('connection',function(socket){ 
    console.log('1',socket.id);
    io.sockets.sockets['nickname'] = "varni";
    console.log(socket);
    console.log('2',io.sockets.sockets['nickname'])
    socket.on("sender", function(data) {    
        console.log('3',data);  
        var sock_id = io.sockets.sockets['nickname']
        console.log('4',sock_id);
        io.sockets.sockets[sock_id].emit("receiverPeer",data);
     //   io.sockets.sockets['nickname'].emit()
    });    
});
*/

//json form
/*
io.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);

    socket.on('sender', function (data) {
        console.log('data', data);
        var data3 = JSON.parse(data)
        console.log('data3', data3);
        console.log(data3.message);
        console.log(data3.sender);
        console.log(data3.receiver);

        socket.emit(data.receiver, data3.data);
        console.log(socket.rooms)
      //  console.log(socket.emit(data.receiver, data3.data))
    })
})
*/
/*
var onlineUsers = [];


io.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);
    // socket.id = '1'
    //console.log(socket.id)
    socket.on('user name', function (user, callback) {
        console.log(user)
        var temp = 0;
        onlineUsers.push({
            mobileNo: user.mobileNo,
            userId: socket.id,
            counter: temp
        })

        console.log(onlineUsers);

        io.sockets.emit('connectedUsers', onlineUsers);

    });

    socket.on('disconnect', function () {
        var i = 0;
        while (i < onlineUsers.length) {
            if (onlineUsers[i].userId == socket.id) {
                break;
            }
            i++;
        }
        console.log(socket.id + 'disconnect');

        onlineUsers.splice(i, 1);
        io.sockets.emit('connectedUsers', onlineUsers);
        //console.log('user disconnected');
    });

    var room = "abc"
    

    console.log('rooms',socket.rooms);
    socket.on('sender', function (message, sender, receiver) {
        console.log(message);
        console.log(sender);
        console.log(receiver);
        console.log(room);
        socket.join(room);
        io.sockets.in(room).emit('receiverPeer', message, sender, receiver,room)
        
    })
})
*/
//----------------------------//
/*
var onlineUsers = [];


io.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);
    // socket.id = '1'
    //console.log(socket.id)
    socket.on('user name', function (user, callback) {
        console.log(user)
        var temp = 0;
        onlineUsers.push({
            mobileNo: user.mobileNo,
            userId: socket.id,
            counter: temp
        })

        console.log(onlineUsers);

        io.sockets.emit('connectedUsers', onlineUsers);

    });

    socket.on('disconnect', function () {
        var i = 0;
        while (i < onlineUsers.length) {
            if (onlineUsers[i].userId == socket.id) {
                break;
            }
            i++;
        }
        console.log(socket.id + 'disconnect');

        onlineUsers.splice(i, 1);
        io.sockets.emit('connectedUsers', onlineUsers);
        //console.log('user disconnected');
    });

    var room = "abc"
    

    console.log('rooms',socket.rooms);
    socket.on('sender', function (message, sender, receiver) {
        console.log(message);
        console.log(sender);
        console.log(receiver);
        console.log(room);
        socket.join(room);
        io.sockets.in(room).emit('receiverPeer', message, sender, receiver,room)
        
    })
})
*/

//var onlineUsers = [];

/*
io.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);
    socket.on('disconnect', function () {
        var i = 0;
        while (i < onlineUsers.length) {
            if (onlineUsers[i].userId == socket.id) {
                break;
            }
            i++;
        }
        console.log(socket.id + 'disconnect');

        onlineUsers.splice(i, 1);
        io.sockets.emit('connectedUsers', onlineUsers);
        //console.log('user disconnected');
    });

    var num = 1;
    var room = "room" + num;
    var roomusers = [];
    var onlineUsers = [];

    socket.current_room = room;
    socket.join("room1");

    var clients = io.sockets.clients("room1");
    console.log(clients);
    socket.username = username;
    console.log(socket.username);
    // loop through clients in ‘room1′ and add their usernames to the roomusers array
    for (var i = 0; i < clients.length; i++) {
        roomusers[roomusers.length] = clients[i].username;
        console.log(roomusers[roomusers.length]);
        console.log(roomusers)
    }

    io.sockets.in('room1').emit('updateroomusers', roomusers);
    
    socket.on('user name', function (username) {
        // get all the clients in ‘room1′

        console.log(username)
        var temp = 0;
        onlineUsers.push({
            //mobileNo: user.mobileNo,
            name: username.fullName,
            userId: socket.id,
            counter: temp
        })

        console.log(onlineUsers);

        io.sockets.emit('connectedUsers', onlineUsers);

        // broadcast to everyone in room 1 the usernames of the clients connected.
    
    })

    //console.log('rooms', socket.rooms);
    socket.on('sender', function (message) {
        console.log(message);
        // console.log(sender);
        // console.log(receiver);
        // console.log(room);
        //  socket.join(room);
        io.sockets.in(room).emit('receiverPeer', message)

    })
})*/

users={};

io.sockets.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);

    socket.on('new', function (data,callback) {
        console.log('data', data.name);
        if(data in users){
            callback(false);
        }
        else{
            callback(true);
            socket.name=data.name;
            users[socket.name]=socket;
        }
    })
    socket.on('msg',function(data,callback){
        console.log(data);
        callback(data.msg);
        io.in(users[data.to]).emit('priv',data.msg);

    })
})

http.listen(config.port, () => {
    console.log('server is started @', config.port);
})




