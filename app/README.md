# (H)Air Band Web Application
## Requirements
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
## Modification Information
This web application contains modified code of a MVC using javascript from an [awwwards tutorial](https://www.awwwards.com/build-a-simple-javascript-app-the-mvc-way.html) along with code from [Github Repository OSCtoSocketIO](https://github.com/rustynymph/OSCtoSocketIO).
