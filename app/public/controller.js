var socket = io();
var s = new p5(sketch, 'canvas');

// Do something with it
socket.on('osc', function(msg){
  var osc_address = msg["address"];
  var osc_values = msg["payload"];
  
  // Do stuff

});

