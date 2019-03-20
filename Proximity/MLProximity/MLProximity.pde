import processing.serial.*;
import oscP5.*;
import netP5.*;


Serial myPort;
OscP5 oscP5;
NetAddress dest;

String val;

void setup() { 
  //printArray(Serial.list());
  String portName = Serial.list()[2];
  myPort = new Serial(this, portName, 115200);
  
  /* start oscP5, listening for incoming messages at port 12000 */
  oscP5 = new OscP5(this,9000);
  dest = new NetAddress("127.0.0.1",6448);
}

void draw() {
    //printArray(Serial.list());
 //println(myPort);   
 if (myPort.available() > 0) {
    //printArray(Serial.list());
    
    val = myPort.readStringUntil('-');
        
    if (val != null) {
       val = trim(val.substring(0, val.length()-1));
       sendOsc(Integer.parseInt(val));
      }
    }
}

void sendOsc(int prox) {
  OscMessage msg = new OscMessage("/wek/inputs");
  msg.add((float)prox); 
  oscP5.send(msg, dest);
}
