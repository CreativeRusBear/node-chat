const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io').listen(server);

server.listen(8000);

app.use(express.static(__dirname + '/'));
app.get('/', (req, res)=> res.sendFile(`${__dirname}/chat.html`));

let connections = [];

socketio.sockets.on('connection', (socket)=>{
  socketio.sockets.emit('connect_user', socket.handshake.query.name);

  connections.push(socket);

  socket.on('disconnect', (data)=>{
    connections.splice(connections.indexOf(socket), 1);
    socketio.sockets.emit('disconnect_user', socket.handshake.query.name);
  });

  socket.on('send', (msg)=>socketio.sockets.emit('add_msg', {msg}));
});
