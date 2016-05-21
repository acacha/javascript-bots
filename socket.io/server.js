// server.js
var express = require('express');
var app = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var io=require('socket.io')(httpServer);

var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);
console.log('Server available at http://localhost:' + port);

var max_speed_l = 255;
var max_speed_r = 255;

var led;
var l_motor = r_motor = null;

//Arduino board connection

var board = new five.Board();
board.on("ready", function() {
    console.log('Arduino connected');
    led = new five.Led(13);
    l_motor = new five.Motor({pins: {pwm: 6, dir: 7}});
    r_motor = new five.Motor({pins: {pwm: 5, dir: 4}});

});

//Socket connection handler
io.on('connection', function (socket) {
    console.log(socket.id);

    socket.on('led:on', function (data) {
        led.on();
        console.log('LED ON RECEIVED');
    });

    socket.on('led:off', function (data) {
        led.off();
        console.log('LED OFF RECEIVED');
    });

    socket.on('go:on', function (data) {
        l_motor.reverse(max_speed_l);
        r_motor.forward(max_speed_r);
        console.log('GO ON RECEIVED');
    });

    socket.on('go:off', function (data) {
        l_motor.stop();
        r_motor.stop();
        console.log('GO OFF RECEIVED');
    });
});

console.log('Waiting for connection');
