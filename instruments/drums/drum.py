# requires the following python libraries:
#  python-osc
#  pyserial

import serial
import math
from pythonosc import udp_client 

# change this string depending upon where your computer makes a device for the micro:bit
serialport = "/dev/cu.usbmodem1412"

ser = serial.Serial(serialport, 115200)
client = udp_client.SimpleUDPClient("localhost", 6448)

while(True):
    line = ser.readline().decode('utf8').strip()
    
    try:

      direction = float(line)
      
      print(f"({direction})")
      
      client.send_message("/air_band/drum", [direction] )
    except:
      # print(line)
      # print('here')
      pass
