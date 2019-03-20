import processing.serial.*;
import oscP5.*;
import netP5.*;


Serial myPort;
OscP5 oscP5;
NetAddress dest;

String val;
color img = color(0,0,0);

void setup() { 
  size(200,200);
  background(img);
  //printArray(Serial.list());
  String portName = Serial.list()[2];
  myPort = new Serial(this, portName, 115200);
  
  /* start oscP5, listening for incoming messages at port 12000 */
  oscP5 = new OscP5(this,9000);
  dest = new NetAddress("127.0.0.1",6448);
}

void draw() {
background(img);  
 if (myPort.available() > 0) {
    //printArray(Serial.list());
    
    val = myPort.readStringUntil('-');
        
    if (val != null) {
       val = trim(val.substring(0, val.length()-1));
       //println(val);
       sendOsc(Integer.parseInt(val));
      }
    }
}

void sendOsc(int prox) {
  OscMessage msg = new OscMessage("/wek/inputs");
  msg.add((float)prox); 
  oscP5.send(msg, dest);
}

//This is called automatically when OSC message is received
void oscEvent(OscMessage theOscMessage) {
  if (theOscMessage.checkAddrPattern("/wek/outputs") == true) {
    println(theOscMessage);
    if(theOscMessage.checkTypetag("fffff")) {
      float result = theOscMessage.get(0).floatValue();
      println(result);
      img = color(0, result*255,0);
    }
  }
}
