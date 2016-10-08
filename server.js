var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

http.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
socket.broadcast.emit('news', 'someone else is here');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
