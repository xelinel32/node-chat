const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);
console.log('Listening server 3000');

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
}); // listening head page

// array users
users = [];
// array connection users
connections = [];
io.sockets.on('connection', function(socket) {
  console.log('Connect is successfull');
  connections.push(socket);

  // delete users of array
  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnect is successfull');
  });
  socket.on('send mess', function(data) {
    io.sockets.emit('add mess', {
      mess: data.mess,
      name: data.name
    });
  });
});
