const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io').listen(server);

server.listen(8000);

app.use(express.static(__dirname + '/'));
app.get('/', (req, res)=> res.sendFile(`${__dirname}/chat.html`));

let connections = [];

socketio.sockets.on('connection', (socket)=>{
  console.info('connect');
  connections.push(socket);

  socket.on('disconnect', (data)=>{
    connections.splice(connections.indexOf(socket), 1);
    console.error('disconnect');
  });

  socket.on('send', (msg)=>socketio.sockets.emit('add_msg', {msg}));
});
