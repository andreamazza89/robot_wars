var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var socket = io();
document.addEventListener("keydown", keyDownHandler, false);

var players = {}
var thisPlayer;
var thisColour = 'red';
var otherColour = 'green';

setInterval(renderScene, 10);

function renderScene() {
  cleanCanvas();
  drawPlayers();
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayers() {
  for(player in players) {
    playerCoordinates = { x: players[player].x, y: players[player].y }
    drawRectangle(playerCoordinates)
  }
}

function drawRectangle(coordinates) {
  ctx.beginPath();
  ctx.rect(coordinates.x, coordinates.y ,100,100)
  ctx.fillStyle = thisColour;
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(e) {
  switch (e.keyCode) {
    case 38:
      socket.emit('player moves', {direction: 'U'})
      break;
    case 39:
      socket.emit('player moves', {direction: 'R'})
      break;
    case 40:
      socket.emit('player moves', {direction: 'D'})
      break;
    case 37:
      socket.emit('player moves', {direction: 'L'})
      break;
  }
}

socket.on('players locations update', function (data) {
  thisPlayer = socket.id;
  players = data;
});

