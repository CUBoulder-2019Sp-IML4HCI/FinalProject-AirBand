var OSC_DATA_PORT = 8999
var OSC_RECIEVE_PORT = 12000
var OSC_SEND_PORT = 6448
var WS_PORT=4243

// Update the serial port based on your computer
var SERIAL_PORT = "/dev/cu.usbmodem1422"
var INSTRUMENT = "keyboard" 

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
var model = new instruments.Keyboard();

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
    address = msg["address"];
    output = null;
    if (msg["output"] != undefined){
      outputs = formulateTestOutputs(12);
      toTrain = msg["output"];
      for (var i = 0; i < toTrain.length; i++) {
        var index = toTrain[i] - 1;
        outputs[index]["value"] = msg["payload"][i];
      }

      console.log(outputs);
    }

    if (address === "/wekinator/control/startRecording" && toTrain != null) {
      oscClient.send('/wekinator/control/outputs', outputs);
      for (var i = 0; i < toTrain.length; i++) {
        oscClient.send('/wekinator/control/enableModelRecording', toTrain[i]);
      }
    } else if (address === "/wekinator/control/stopRecording" && toTrain != null) {
      for (var i = 0; i < toTrain.length; i++) {
        oscClient.send('/wekinator/control/disableModelRecording', toTrain[i]);
      }
    }
    oscClient.send(msg["address"], msg["payload"]);
  });

  // for delete event sent by socket
  socket.on('delete', function(msg) {
    oscClient.send('/wekinator/control/deleteExamplesForOutput', 1);
    oscClient.send('/wekinator/control/deleteExamplesForOutput', 2);
    oscClient.send('/wekinator/control/deleteExamplesForOutput', 7);
    oscClient.send('/wekinator/control/deleteExamplesForOutput', 8);
  });

  // for run message sent by socket
  socket.on('run', function(msg) {
    oscClient.send(msg["address"], msg["payload"]);
  });

  // for run message sent by socket
  socket.on('webcam', function(msg) {
    data = msg["data"]
    setTimeout(() => model.updateVideoInput(data), 0);
    setTimeout(sendData, 0);
  });
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
oscClient.send('/wekinator/control/deleteExamplesForOutput', 1);
oscClient.send('/wekinator/control/deleteExamplesForOutput', 2);
oscClient.send('/wekinator/control/deleteExamplesForOutput', 7);
oscClient.send('/wekinator/control/deleteExamplesForOutput', 8);



// set up serial port to read micro:bit serial lines
var serialPort = new SerialPort(SERIAL_PORT, {
  baudRate: 115200,
});

// set up the parser to readlines
var parser = serialPort.pipe(new Readline({ delimiter: '\n' }));
parser.on('data', function(line) {
  // console.log(line);
  // All Drum start with #
  // #k is 3g
  // #l is left drum hit)
  // #r is right drum hit)
  var first_two = line.slice(0,2);
  var first_one = line.slice(0,1);
  if (first_two == "#k") { // kick drum
    setTimeout(() => model.updateKick(line.slice(2)), 0);
    setTimeout(sendData, 0);
  } else if (first_two == "#l") { // left drum hit
    setTimeout(() => model.updateLeftHand(line.slice(2)), 0);
    setTimeout(sendData, 0);
  } else if (first_two == "#r") { // right drum hit
    setTimeout(() => model.updateRightHand(line.slice(2)), 0);
    setTimeout(sendData, 0);
  }

  // Flex sensor hands "R" and "L" (but we put micro:bits on the wrong one)
  else if (first_one == "L") {
    // console.log(line);
    var right = line.slice(2)
    var fingers = right.split('^').map(parseFloat);
    // console.log(fingers);
    model.updateRightHand(fingers);
    sendData();
  } else if (first_one == "R") {
    // console.log(line);
    var left = line.slice(2)
    var fingers = left.split('^').map(parseFloat);
    // console.log(fingers);
    model.updateLeftHand(fingers);
    sendData();
  }
});

console.log('listening for serial packets on *:'+SERIAL_PORT);


// function to send data to wekinator
var sendData = function() {
  // console.log("sending data", model.getInput());
  // console.log(model.getInput())
  oscClient.send('/air_band/'+INSTRUMENT+'/inputs', model.getInput());
}

var formulateTestOutputs = function(n) {
  var wekOutputs = []

  for (var i = 0; i < n; i++) {
    wekOutputs.push({type: "float", value: 1})
  }

  return wekOutputs
}

