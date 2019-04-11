var OSC_DATA_PORT = 8999
var OSC_RECIEVE_PORT = 12000
var OSC_SEND_PORT = 6448
var WS_PORT=4243

// Update the serial port based on your computer
var SERIAL_PORT = "/dev/cu.usbmodem1422"
var INSTRUMENT = "drum" 

// require osc and serial port
var osc = require('node-osc');
var SerialPort = require("serialport");
var Readline = require('@serialport/parser-readline')

// set up app
var express = require('express');
var app = express();

// set up sockets
var http = require('http').Server(app);
var io = require('socket.io')(http);

// load the instrument classes and create model
var instruments = require('./models.js');
var model = new instruments.Drum();

// initialized the sockets
var open_sockets = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

// when socket is connected
io.on('connection', function(socket){
  console.log('a user connected');
  open_sockets.push(socket);
  socket.on('disconnect', function(){
        //remove this socket from our list of open sockets
        open_sockets = open_sockets.filter(function(item){
              return item != socket;
        });
  });

  // for training event sent by socket
  socket.on('training', function(msg) {
    console.log(msg);
  });

  // for delete event sent by socket
  socket.on('delete', function(msg) {
    console.log(msg);
  });

  // for run message sent by socket
  socket.on('run', function(msg) {
    console.log(msg);
  })
});


http.listen(WS_PORT, function(){
  console.log('listening for WEBSOCKET connections on *:'+WS_PORT);
});

// Set up osc output messages from wekinator
// send messages over sockets
var oscServer = new osc.Server(OSC_RECIEVE_PORT, '0.0.0.0');
console.log('listening for OSC packets on *:'+OSC_RECIEVE_PORT);
oscServer.on("message", function (msg, rinfo) {
      console.log("OSC message received:");
      console.log(msg);
      open_sockets.forEach(function(socket){
            socket.emit("osc", {'address':msg[0], 'payload':msg.slice(1)});
      })
});

// set up client to communicate to wekinator
var oscClient = new osc.Client('127.0.0.1', OSC_SEND_PORT);
console.log('sending OSC packets on *:'+OSC_SEND_PORT);
// oscClient.send('/wekinator/control/startRecording', '1');

// set up serial port to read micro:bit serial lines
var serialPort = new SerialPort(SERIAL_PORT, {
  baudRate: 115200,
});

// set up the parser to readlines
var parser = serialPort.pipe(new Readline({ delimiter: '\n' }));
parser.on('data', function(line) {
  // console.log(line);
  // this is current testing function
  // #k is 3g
  // #l is A button (though could eventually be left hand hit)
  // #r is B button (though could eventually be right hand hit)
  if (line.slice(0,2) == "#k") { // kick drum
    setTimeout(() => model.updateKick(line.slice(2)), 0);
    setTimeout(sendData, 0);
  } else if (line.slice(0,2) == "#l") { // left drum hit
    setTimeout(() => model.updateLeftHand(line.slice(2)), 0);
    setTimeout(sendData, 0);
  } else if (line.slice(0,2) == "#r") { // right drum hit
    setTimeout(() => model.updateRightHand(line.slice(2)), 0);
    setTimeout(sendData, 0);
  }
});

console.log('listening for serial packets on *:'+SERIAL_PORT);


// function to send data to wekinator
var sendData = function() {
  // console.log("sending data", model.getInput());
  oscClient.send('/air_band/drum/inputs', model.getInput());
}

