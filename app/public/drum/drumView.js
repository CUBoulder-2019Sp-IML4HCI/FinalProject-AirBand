var DrumView = function (model) {
    this.model = model;
    this.kick = new Tone.MembraneSynth().toMaster();

    this.tom = new Tone.MembraneSynth({
                         pitchDecay: 0.008,
                         envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                       }).toMaster();

    this.crash = new Tone.MetalSynth({
                        frequency: 300,
                        envelope: {attack: 0.001, decay: 1, release: 3},
                        harmonicity: 5.1,
                        modulationIndex: 64,
                        resonance: 4000,
                        octaves: 1.5
                      }).toMaster();
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
          width: 320,
          height: 240,
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
        this.$startRecButton = this.$container.find('.js-startRec');
        this.$stopRecButton = this.$container.find('.js-stopRec');
        this.$clearExamplesButton = this.$container.find('.js-clear');
        this.$startRunningButton = this.$container.find('.js-run');
        this.$trainButton = this.$container.find('.js-train');

        return this;
    },

    setupHandlers: function () {

        // If the event is handled by a button or an element event on the page
        this.startRecButtonHandler = this.startRecButton.bind(this);
        this.stopRecButtonHandler = this.stopRecButton.bind(this);
        this.clearExamplesButtonHander = this.clearExamplesButton.bind(this);
        this.startRunningButtonHandler = this.startRunningButton.bind(this);
        this.trainButtonHandler = this.trainButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.updateModelHandler = this.updateModel.bind(this);

        return this;
    },

    enable: function () {

        this.$startRecButton.click(this.startRecButtonHandler);
        this.$stopRecButton.click(this.stopRecButtonHandler);
        this.$clearExamplesButton.click(this.clearExamplesButtonHander);
        this.$startRunningButton.click(this.startRunningButtonHandler);
        this.$trainButton.click(this.trainButtonHandler);

        /**
         * Event Dispatcher
         */
        this.model.updateModelEvent.attach(this.updateModelHandler);

        return this;
    },
    
    take_snapshot: function() {
      // take snapshot and get image data
      Webcam.snap( function(data_uri, canvas, context) {
        // display results in page
        var w = 32;
        var h = 60;
        var total = w * h;
        var data = context.getImageData(0,0,320,240).data;
        var lowRes = [];

        // times width by 4 because 4 points of data per pixel
        for (var x = 0; x < (320*4); x += (w*4)) { 
          for (var y = 0; y < (240); y += (h)) {
            var red = 0, green = 0, blue = 0;
        
            for (var i = 0; i < (w*4); i+=4) {
              for (var j = 0; j < (h); j+=1) {
                var index = (x + i) + (y + j) * (320*4);
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
        console.log(lowRes);
        view.wekinatorMessage.notify({
            task: "webcam",
            msg: {data: lowRes}
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
    

    show: function (outputs) {
        // stuff to update the view
        // console.log(this.$currentEvent)
        // this.$currentEvent.innerHTML = drumClass
        if (outputs[6] === 2) {
            this.kick.triggerAttackRelease('C2', '8n');
        }

        if (outputs[3] === 2) {
            this.crash.triggerAttack()
        }

        if (outputs[0] === 2) {
            this.tom.triggerAttackRelease("G3");
        }
    },

    /* events */

    startRecButton: function () {
        this.start_snapping();
        this.wekinatorMessage.notify({
            task: "training",
            msg: {address:"/wekinator/control/startRecording", payload: 1}
        });
    },

    stopRecButton: function () {
        this.stop_snapping();
        this.wekinatorMessage.notify({
            task: "training",
            msg: {address:"/wekinator/control/stopRecording", payload: 1}
        });
    },

    trainButton: function () {
        this.wekinatorMessage.notify({
            task: "training",
            msg: {address:"/wekinator/control/train", payload: 1}
        });
    },

    clearExamplesButton: function () {
        this.stop_snapping();
        // this.wekinatorMessage.notify({
        //     task: "delete",
        //     msg: {address:"/wekinator/control/deleteExamplesForOutput", payload: 1}
        // });
    },

    startRunningButton: function () {
        this.start_snapping();
        this.wekinatorMessage.notify({
            task: "run",
            msg: {address:"/wekinator/control/startRunning", payload: 1}
        });
    },



    /* -------------------- Handlers From Event Dispatcher ----------------- */

    updateModel: function (sender, args) {
        console.log(args);
        this.show(args["output"]);
    },

    /* -------------------- End Handlers From Event Dispatcher ----------------- */


};