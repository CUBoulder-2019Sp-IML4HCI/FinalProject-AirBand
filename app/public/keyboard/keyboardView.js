function ifWithin(color, number) {
  if (color > number-30 && color < number+30) {
    return true
  } else {
    return false
  }
}

var KeyboardView = function (model) {
    this.model = model;
    
    this.updateModelEvent = new Event(this);

    this.wekinatorMessage = new Event(this);

    this.timer = null;
    this.running = false;
    this.lplaying = false;
    this.rplaying = false;

    this.leftNotes = [SampleLibrary.load({instruments: "piano"}).toMaster(),
                     SampleLibrary.load({instruments: "piano"}).toMaster(),
                     SampleLibrary.load({instruments: "piano"}).toMaster(),
                     SampleLibrary.load({instruments: "piano"}).toMaster()
                    ]
    this.rightNotes = [SampleLibrary.load({instruments: "piano"}).toMaster(),
                     SampleLibrary.load({instruments: "piano"}).toMaster(),
                     SampleLibrary.load({instruments: "piano"}).toMaster(),
                     SampleLibrary.load({instruments: "piano"}).toMaster()
                    ]

    this.init();
};

KeyboardView.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable();

        Webcam.set({
          width: 400,
          height: 300,
          image_format: 'jpeg',
          jpeg_quality: 90,
          flip_horiz: true
        });

        Webcam.attach( '#my_camera' );
    },

    createChildren: function () {
        // cache the document object
        this.$container = $('.body-container');
        this.$currentEvent = this.$container.find('#currentEvent')[0];
        this.$startRunningButton = this.$container.find('.js-run');

        return this;
    },

    setupHandlers: function () {

        // If the event is handled by a button or an element event on the page
        // this.addTaskButtonHandler = this.addTaskButton.bind(this);
        this.startRunningButtonHandler = this.startRunningButton.bind(this);
        
        /**
        Handlers from Event Dispatcher
        */
        this.updateModelHandler = this.updateModel.bind(this);

        return this;
    },

    enable: function () {

        // this.$addTaskButton.click(this.addTaskButtonHandler);
        this.$startRunningButton.click(this.startRunningButtonHandler);
        window.onkeydown = this.handleClicks;
        
        /**
         * Event Dispatcher
         */
        this.model.updateModelEvent.attach(this.updateModelHandler);

        return this;
    },

    handleClicks: function(e) {
        // console.log(e.code);
        if (e.code === "Space") {
            e.preventDefault;
            view.startRunningButton();
        }
    },

    // addTaskButton: function () {
    //     this.addTaskEvent.notify({
    //         task: "Some Event"
    //     });
    // },

    take_snapshot: function() {
      // take snapshot and get image data
      Webcam.snap( function(data_uri, canvas, context) {
        // display results in page
        var w = 5;
        var h = 15;
        var total = w * h;
        var data = context.getImageData(0,0,400,300).data;
        var lowRes = [];
        // console.log("taking snapshot....")

        // times width by 4 because 4 points of data per pixel
        for (var y = 150; y < (300); y += (h)) {
            for (var x = 0; x < (400*4); x += (w*4)) { 
            var red = 0, green = 0, blue = 0;
        
            for (var i = 0; i < (w*4); i+=4) {
              for (var j = 0; j < (h); j+=1) {
                var index = (x + i) + (y + j) * (400*4);
                red += data[index];
                green += data[index+1];
                blue += data[index+2];
              }
            }

            // RGB = (R*65536)+(G*256)+B
            blue = Math.round(blue/total);
            green = Math.round(green/total);
            red = Math.round(red/total);

            if (70<green-blue && 190 > green-blue) {
                red = 0;
                blue = 0;
            } else if (ifWithin(red, 160) && ifWithin(green, 60) && ifWithin(blue,120)) {
                red = 0;
                green = 0;
            } else {
                var avg = Math.floor((red + green + blue) / 3)
                // console.log(avg);
                red = avg;
                green = avg;
                blue = avg;
            }
            var color = (red*65536)+(green*256)+(blue);
            lowRes.push(color);

          }
        }
        // Make sure it is 400 inputs
        // console.log(lowRes.length);
        view.wekinatorMessage.notify({
            task: "webcam",
            msg: {data: lowRes, instrument:"keyboard"}
        });
        view.model.updateVideo(lowRes);
      } );
    },
    
    start_snapping: function() {
      if (!this.timer) {
        this.take_snapshot();
        this.timer = setInterval(this.take_snapshot, 250 );
      }
    },
    
    stop_snapping: function() {
      if (this.timer) {
        clearTimeout( this.timer );
        this.timer = null;
      }
    },

    playSound: function (left, right) {
        notes = ['C3','C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A4', 'A#4', 'B4', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A5', 'A#5', 'B5', 'C5']
        // stuff to update the view
        // console.log("show");
        // this.$currentEvent.innerHTML = drumClass
        if (left.hit === 1 && !this.lplaying) {
            this.lplaying = true;
            var index = Math.round(left.position);
            for (var i = 0; i < 4; i++) {
                if (left.fingers[i] === 1) {
                    // console.log(notes[index+i])
                    this.leftNotes[i].triggerAttack(notes[index+i]);
                }
            }
        }

        if (right.hit === 1 && !this.rplaying) {
            this.rplaying = true;
            var index = Math.round(right.position);
            for (var i = 0; i < 4; i++) {
                if (right.fingers[i] === 1) {
                    // console.log(notes[index+i])
                    this.rightNotes[i].triggerAttack(notes[index+i]);
                }
            }
        }

        if (left.hit === 2) {
            this.lplaying = false;
        }

        if (right.hit === 2) {
            this.rplaying = false;
        }
    },


    /* Events */

    startRunningButton: function () {
        if (this.running) {
            this.running = false;
            this.$startRunningButton[0].innerHTML = "Start Running";
            this.stop_snapping();
            this.wekinatorMessage.notify({
                task: "run",
                msg: {address:"/wekinator/control/stopRunning", payload: 1}
            });
        } else {
            this.running = true;
            this.$startRunningButton[0].innerHTML = "Stop Running";
            this.start_snapping();
            this.wekinatorMessage.notify({
                task: "run",
                msg: {address:"/wekinator/control/startRunning", payload: 1}
            });
        }
    },



    /* -------------------- Handlers From Event Dispatcher ----------------- */

    updateModel: function (sender, args) {
        // console.log(args);
        if (this.running) {
            this.playSound(args["left"], args["right"]);
        }
    },

    /* -------------------- End Handlers From Event Dispatcher ----------------- */


};