var five = require("johnny-five");
var board = new five.Board({port: process.argv[2]});

board.on("ready", function() {
    console.log("Ready event. Repl instance auto-initialized!");

    var led = new five.Led(13);

    this.repl.inject({
        // Allow limited on/off control access to the
        // Led instance from the REPL.
        on: function() {
            console.log("on!");
            led.on();
        },
        off: function() {
            console.log("off!");
            led.off();
        }
    });
});