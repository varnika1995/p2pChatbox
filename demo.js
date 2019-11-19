//------------personal chat----------
const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config = require('./config');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

var people = {};
io.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);

    socket.on('user name', function (data) {
        console.log('users', data);
        socket.username=data;
        people[data] = socket.id;
        console.log('peoples', people[data]);

        io.emit('onlineUsers', people[data]);
    });

    
    socket.on('sender', function (data) {
     //   let room=sender+""+reciever;
        console.log(data.room);
        socket.join(data.room);
        console.log(data.sender);
        console.log(data.reciever);
        console.log(data.msg)
      //  io.in(people[reciever]).emit('receiverPeer', msg);
       // io.in(people[sender]).emit('sendPeer', msg);
       io.in(data.room).emit('sendPeer',data.msg);
    })
})

http.listen(config.port, () => {
    console.log('server is started @', config.port);
})




