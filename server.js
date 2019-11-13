//personal chat

const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config=require('./config');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


io.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);

    socket.on('sender', function (data) {
            console.log('data',data);
//            var json=JSONObject()
         //   var data1 =new Object(data).toString()
          //  console.log('data1',data1)
            var data2=JSON.stringify(new Object(data))
            console.log('data2',data2);
           var data3= JSON.stringify(data)
            console.log('data3',data3);
            console.log(data.message);
      
        socket.emit('chat message',data2);
    })
})

/*
io.on('connection', function (socket) {
    console.log('user connection with socketid=', socket.id);

    socket.on('sender', function (message, sender, receiver) {
        console.log(message);
        console.log(sender);
        console.log(receiver);

        socket.to(receiver).emit('receiverPeer', message, socket.id, receiver);
        console.log('sendPeer');
        socket.emit('sendPeer', message, socket.id, receiver);
    })
})
*/

http.listen(config.port, () => {
    console.log('server is started @',config.port);
})