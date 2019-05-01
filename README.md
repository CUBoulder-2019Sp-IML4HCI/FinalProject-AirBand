# Air Band
To run the application you will need:

1. The receiver micro:bit to be plugged into the computer.
2. The gloves with the flex sensors sending to the receiver.
3. The node web application running in a terminal
4. A Wekinator project opened with the keyboard 808 inputs project.

## Web Application
When running the application, you may need to update the serial port in `index.js` that the application listens to from `/dev/cu.usbmodem1422` to whatever you have the micro:bit plugged into.

### Requirements
To run this web application you will need `node`.

You may download node from the [nodejs website](https://nodejs.org/en/download/). 

If you are on Mac, you may use `homebrew`:
```
brew install node
```

For more details on Windows download, you may look to [this walkthrough](https://www.guru99.com/download-install-node-js.html).

## Running the Program
When you run the program, you will need to run 3 commands at the same time (the application, myo to osc, and Micro:bit glove to osc).

Once the project is running you can navigate to [localhost:4243](http://localhost:4243) to explore the OSC log. To start playing the keyboard please first travel to the training page at [localhost:4243/training/](http://localhost:4243/training/).

The first time run:
```
npm install
```

To run web application use:
```
node .
```
### Modification Information
This web application contains modified code of a MVC using javascript from an [awwwards tutorial](https://www.awwwards.com/build-a-simple-javascript-app-the-mvc-way.html) along with code from [Github Repository OSCtoSocketIO](https://github.com/rustynymph/OSCtoSocketIO).

## Instruments
This folder contains the micro:bit code for the keyboard as well as a wekinator project. Documentation on how the gloves are implemented can be found in the [final_writeup.md](https://github.com/CUBoulder-2019Sp-IML4HCI/FinalProject-AirBand/blob/keyboard_expo/final_writeup.md).
