# FinalProject-AirBand
This project provides all of the software components for playing an air keyboard, an instrument that allows the player to generate piano sounds by moving his or her hands and fingers. 

## Requirements
*Node<br>
*Wekinator<br>
*Web Camera<br>
*3 Micro:bits<br>
*2 Micro:bit Breakout Boards<br>
*2 AAA Battery Packs<br>
*8 Flex Sensors<br>
*8 Knitted Finger Sweaters<br>
*2 Gloves<br>

### Node
To run the web application you will need `node`
You may download node from the [nodejs website](https://nodejs.org/en/download/). 

If you are on Mac, you may use `homebrew`:
```
brew install node
```

For more details on Windows download, you may look to [this walkthrough](https://www.guru99.com/download-install-node-js.html).

### Wekinator
To install Wekinator, download if from the [Wekinator website](http://www.wekinator.org/downloads/) and to use the keyboard project, open the Keyboard_808Inputs.wekproj file.

### Flex Sensor Gloves
The gloves were constructed each with four flex sensors in voltage divider circuits, as shown on the [Sparkfun setup guide](https://learn.sparkfun.com/tutorials/flex-sensor-hookup-guide). After connecting the Micro:bits to their breakout boards, the flex sensors are connected to the analog pins on the Micro:bit, as shown in the [Micro:bit pinout diagram](https://microbit-micropython.readthedocs.io/en/latest/pin.html). The finger sweaters should be wrapped around each finger, holding the flex sensors in place.

### Micro:bit
To ensure that you are using the correct Micro:bit code, install the following hex files to their corresponding devices:
microbit-Flex-Sensor-Read.hex -> Computer Micro:bit
microbit-Left-Flex-Sensor-Write.hex -> Left Glove Micro:bit
microbit-Right-Flex-Sensor-Write.hex -> Right Glove Micro:bit

## Running the Program.
The first time run:
```
npm install
```

To run web application use:
```
node .
```

Once the project is running, open the Wekinator project and navigate to [localhost:4243/training](http://localhost:4243/training) in your browser to begin training your hand motions for the keyboard. After following the training instructions in the web app, it will direct you to the keyboard at [localhost:4243/keyboard/](http://localhost:4243/keyboard/), where you can start playing.

## Using the gloves
After putting on the gloves, make sure that all of the finger sweaters are embracing the flex sensors and that the Micro:bits are all plugged in. Connect the glove Micro:bits to the battery packs and the other to the computer.

## Modification Information
This web application contains modified code of a MVC using javascript from an [awwwards tutorial](https://www.awwwards.com/build-a-simple-javascript-app-the-mvc-way.html) along with code from [Github Repository OSCtoSocketIO](https://github.com/rustynymph/OSCtoSocketIO).

## YouTube
Demo Video: https://www.youtube.com/watch?v=8AhQiFyuwNc&feature=youtu.be

