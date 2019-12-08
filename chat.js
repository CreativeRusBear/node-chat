/**
 * @version v1.0.1
 * @file Chat, that working on Mode.js
 * @author Artem Gusev <gusev2014russia@mail.ru> (CreativeRusBear)
 * @copyright Artem Gusev 2019
 * @licence
 * MIT License
 *
 * Copyright (c) 2019 Artem Gusev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io').listen(server);
const chalk = require('chalk');

/**
 * @description set port for server
 */
server.listen(8000);
console.info(chalk.cyan(`

      __                __                      
     /\\ \\              /\\ \\__      __           
  ___\\ \\ \\___      __  \\ \\ ,_\\    /\\_\\    ___   
 /'___\\ \\  _ \`\\  /'__\`\\ \\ \\ \\/    \\/\\ \\  / __\`\\ 
/\\ \\__/\\ \\ \\ \\ \\/\\ \\L\\.\\_\\ \\ \\_  __\\ \\ \\/\\ \\L\\ \\
\\ \\____\\\\ \\_\\ \\_\\ \\__/.\\_\\\\ \\__\\/\\_\\\\ \\_\\ \\____/
 \\/____/ \\/_/\\/_/\\/__/\\/_/ \\/__/\\/_/ \\/_/\\/___/


Server running at: http://localhost:8000
    		   http://127.0.0.1:8000`));

/**
 * @description send static files
 */
app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => res.sendFile(`${__dirname}/chat.html`));


const connections = [];
/**
 * @description work with web sockets
 */
socketio.sockets.on('connection', socket => {
	socketio.sockets.emit('connect_user', socket.handshake.query.name);

	connections.push(socket);

	socket.on('disconnect', () => {
		connections.splice(connections.indexOf(socket), 1);
		socketio.sockets.emit('disconnect_user', socket.handshake.query.name);
	});

	socket.on('send', msg => socketio.sockets.emit('get_msg', {msg}));
});
