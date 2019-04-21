var DrumView = function (model) {
    this.model = model;
    this.kick = new Tone.MembraneSynth().toMaster();
    this.tomLow = new Tone
                       .MembraneSynth({
                         pitchDecay: 0.008,
                         envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                       })
                       .toMaster();
    this.tomMid = new Tone
                       .MembraneSynth({
                         pitchDecay: 0.008,
                         envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                       })
                       .toMaster();
    this.tomHigh = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                        })
                        .toMaster();
    this.closedHihat =
      new Tone
          .MetalSynth({
            frequency: 400,
            envelope: {attack: 0.001, decay: 0.1, release: 0.8},
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1
          })
          .toMaster();
    this.ride = new Tone.MetalSynth().toMaster();
    this.crash = new Tone
                      .MetalSynth({
                        frequency: 300,
                        envelope: {attack: 0.001, decay: 1, release: 3},
                        harmonicity: 5.1,
                        modulationIndex: 64,
                        resonance: 4000,
                        octaves: 1.5
                      })
                      .toMaster();
    this.snare =
      new Tone
          .NoiseSynth({
            noise: {type: 'white'},
            envelope: {attack: 0.005, decay: 0.05, sustain: 0.1, release: 0.4}
          })
          .toMaster();

    this.updateModelEvent = new Event(this);

    this.wekinatorMessage = new Event(this);

    this.timer = null;

    this.init();
};

DrumView.prototype = {

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
        console.log(e.code);
        if (e.code === "Space") {
            e.preventDefault;
            view.startRunningButton();
        }
    },
    
    take_snapshot: function() {
      // take snapshot and get image data
      Webcam.snap( function(data_uri, canvas, context) {
        // display results in page
        var w = 10;
        var h = 15;
        var total = w * h;
        var data = context.getImageData(0,0,400,300).data;
        var lowRes = [];

        // times width by 4 because 4 points of data per pixel
        for (var x = 0; x < (400*4); x += (w*4)) { 
          for (var y = 0; y < (300); y += (h)) {
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
            var color = (red*65536)+(green*256)+blue;
            lowRes.push(color);
          }
        }
        // Make sure it is 800 inputs
        // console.log(lowRes.length);
        view.wekinatorMessage.notify({
            task: "webcam",
            msg: {data: lowRes},
            instrument: "drum",
        });
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
        // what it gonna do
    },

    /* events */

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
        console.log(args);
        // something with play sounds here prob
    },

    /* -------------------- End Handlers From Event Dispatcher ----------------- */


};