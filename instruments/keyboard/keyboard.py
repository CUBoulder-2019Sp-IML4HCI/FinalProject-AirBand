# requires the following python libraries:
#  python-osc
#  pyserial

import serial
from pythonosc import udp_client

# change this string depending upon where your computer makes a device for the micro:bit
serialport = "/dev/cu.usbmodem1422"

ser = serial.Serial(serialport, 115200)
client = udp_client.SimpleUDPClient("localhost", 8999)

## initialize right and left
right = [0,0,0,0]
left = [0,0,0,0]

while(True):
    line = ser.readline().decode('utf8').strip()

    try:
        if line[0] == "R":
            right = line[2:]
        elif line[0] == "L":
            left = line[2:]
        finger1, finger2, finger3, finger4 = map(float, left.split("^"))
        finger5, finger6, finger7, finger8 = map(float, right.split("^"))

        print(f"({finger1}, {finger2}, {finger3}, {finger4},{finger5}, {finger6}, {finger7}, {finger8})")
#        print(x, y, z)
#        print(line[0])



        client.send_message("/wek/inputs", [finger1, finger2, finger3, finger4,finger5, finger6, finger7, finger8] )
    except:
        pass
