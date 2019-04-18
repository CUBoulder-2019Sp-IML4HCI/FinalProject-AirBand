# requires the following python libraries:
#  python-osc
#  pyserial

import serial
from pythonosc import udp_client

# change this string depending upon where your computer makes a device for the micro:bit
serialport = "/dev/cu.usbmodem1412"

ser = serial.Serial(serialport, 115200)
client = udp_client.SimpleUDPClient("localhost", 8999)

## initialize right and left
right = 0
left = 0
kick = 0

while(True):
    line = ser.readline().decode('utf8').strip()

    try:
        if line[0] == "R":
            right = line[2:]
        elif line[0] == "L":
            left = line[2:]
        elif line[0] == "K":
            kick = line[2:]

        # lef = map(float, left)
        # rig = map(float, right)
        # kick = map(float, kick)
        left = float(left)
        right = float(right)
        kick = float(kick)

        print(f"({left}, {right}, {kick}")
#        print(x, y, z)
       # print(line)



        # client.send_message("/wek/inputs", [lef, rig, kick] )
    except:
        pass
