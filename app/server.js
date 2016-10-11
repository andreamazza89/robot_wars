var express = require('express');
var app  = express(); 
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var players = {}

io.on('connection', function (socket) {

  players[socket.id] =  { x: 100, y: 100 }
  io.emit('players locations update', players)

  socket.on('player moves', function(data) {
    if(data.direction === 'R') { 
      currentPosition = players[socket.id]
      players[socket.id] = { x: currentPosition.x + 4 , y: currentPosition.y }
    } else if(data.direction === 'L') { 
      currentPosition = players[socket.id]
      players[socket.id] = { x: currentPosition.x - 4 , y: currentPosition.y }
    } else if(data.direction === 'D') { 
      currentPosition = players[socket.id]
      players[socket.id] = { x: currentPosition.x , y: currentPosition.y + 4 }
    } else if(data.direction === 'U') { 
      currentPosition = players[socket.id]
      players[socket.id] = { x: currentPosition.x , y: currentPosition.y - 4 }
    }

    io.emit('players locations update', players)
  })

  socket.on('disconnect', function() {
  })
});

http.listen(3000);
console.log('listening on port 3000');
