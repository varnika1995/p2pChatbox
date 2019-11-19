/*const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
})
http.listen(5000,()=>{
    console.log('server is running @5000')
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];

io.sockets.on('connection', function (socket) {

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = 'room1';
		// add the client's username to the global list
		usernames[username] = username;
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to room1');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});
*/

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
})

let numb = 1;

let people = {};
let users = [];
io.on('connection', function (socket) {
    console.log("a user connected with socket Id:", socket.id);

    socket.on('user name', function (username) {
        console.log('1', username);
        socket.username = username;
        console.log('2', socket.username);
        people[username] = username;
        console.log('3', people[username]);
        io.emit('onlineUsers', people);
    });

    //   let socketsOfRoom1 = io.sockets.clients(room);
    // console.log(socketsOfRoom1);
    /*
        io.in(room).clients(function (err, clients) {
            console.log(clients)
            if (clients.length >= 2) {
                numb++;
            }
        })
    */

    socket.on('chatting', function (data) {
        let room = "room" + numb;
        console.log(room);
        socket.current_room = room;
        socket.join(room);
        //console.log(data);
        users.push(data.from);
        users.push(data.to);

        io.sockets.in(room).emit('chat message', data,room);

    })


    /*   socket.on('getAllRooms', (usersByRoom) => {
           Object.keys(usersByRoom.from).forEach(roomName =>
               console.log(roomName, usersByRoom[roomName]))
       });
   
       const updateCount = roomName => {
           const userCount = io.sockets.clients(roomName).length
           // we do not update if the count did not change
           if (userCount === usersByRoom[roomName]) { return }
           usersByRoom[roomName] = userCount
           io.emit('updateCount', { roomName, userCount })
       }
   
       socket.join(roomName, () => {
           updateCount(roomName)
       })
   
       let socketsOfRoom1 = io.sockets.clients('chatroom1');
       let numberOfClientsInRoom1 = socketsOfRoom1.length;
   
       console.log(numberOfClientsInRoom1);
       socketsOfRoom1.forEach((socket) => {
           console.log(socket)
       });
   */
   /* socket.on('sender', function (data) {
        console.log(data);
        // io.sockets.in("room name").emit('chat message', data);
        io.sockets.in(current_room).emit('chat message', data);
    });*/

})


http.listen(3000, () => {
    console.log('server started @ 3000');
})

