//------------personal chat----------
const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config = require('./config');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//const history = []
//const client = []
var people = {};
io.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);

  /*  client.push({ id: socket.client.id })
    console.log(client)

    var getClientID = client.find(e => (e.id === socket.client.id))
    console.log("the Client", getClientID)
    if (getClientID) {
        //io.sockets.emit("msg",history);
        socket.emit("msg", history);

    }*/

    socket.on('user name', function (data) {
        console.log('users', data);

        people[data] = socket.id;
        console.log('peoples', people[data]);

        io.emit('onlineUsers', people[data]);
    });

    socket.on('sender', function (sender, reciever, msg) {
        console.log(sender);
        console.log(reciever);
        console.log(msg)
        history.push(data)
        console.log(history)
        io.in(people[reciever]).emit('receiverPeer', msg);
        io.emit('sendPeer', msg);
    })
})

http.listen(config.port, () => {
    console.log('server is started @', config.port);
})




