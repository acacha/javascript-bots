var five = require("johnny-five");

var max_speed_l = 150;
var max_speed_r = 140;

// set up the input
var stdin = process.openStdin();
require('tty').setRawMode(true);

var board = new five.Board({port: process.argv[2]});

var l_motor = r_motor = null;

var up = function() {
    l_motor.reverse(max_speed_l);
    r_motor.forward(max_speed_r);
}

var down = function() {
    r_motor.reverse(max_speed_r);
    l_motor.forward(max_speed_l);
}

var left = function() {
    l_motor.forward(max_speed_l);
    r_motor.forward(max_speed_r);
}

var right = function() {
    r_motor.reverse(max_speed_r);
    l_motor.reverse(max_speed_l);
}

var stop = function() {
    l_motor.stop();
    r_motor.stop();
}

board.on("ready", function(err) {

    if (err){
        console.log(err);
        return;
    }
    l_motor = new five.Motor({pins: {pwm: 6, dir: 7}});
    r_motor = new five.Motor({pins: {pwm: 5, dir: 4}});

    console.info("Board connected. Robot set up. LRUD to control");

    this.repl.inject({
        // Allow limited on/off control access to the
        // Led instance from the REPL.
        up: up,
        down: down()
    });
});



stdin.on('keypress', function(chunk, key) {
	// process the keypresses

	if (key) {
		switch (key.name) {
			case "up":
                up();
				break;
			case "down":
                down();
				break;
			case "left":
                left();
				break;
			case "right":
                right();
				break;
			case "space":
                stop();
				break;
		}
	}
});

