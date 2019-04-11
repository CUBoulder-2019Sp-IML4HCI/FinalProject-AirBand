# requires the following python libraries:
#  python-osc
#  pyserial

import serial
from pythonosc import udp_client

# change this string depending upon where your computer makes a device for the micro:bit
serialport = "/dev/cu.usbmodem1422"

ser = serial.Serial(serialport, 115200)
client = udp_client.SimpleUDPClient("localhost", 8999)

while(True):
    line = ser.readline().decode('utf8').strip()
    
    try:
        finger1, finger2, finger3, finger4 = map(float, line.split("^"))

        print(f"({finger1}, {finger2}, {finger3}, {finger4})")
#        print(x, y, z)
#        print(line)



        client.send_message("/wek/inputs", [finger1, finger2, finger3, finger4] )
    except:
        pass