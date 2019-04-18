var TrainingView = function (model) {
    this.model = model;
    this.updateCurrentEvent = new Event(this);
    this.wekinatorMessage = new Event(this);

    // steps for training keyboard. To update when multiple instruments
    this.steps = [{output: 1, val: 1}, {output: 1, val: 2}, {output: 2, val: 0}, {output: 2, val: 1}, {output: 7, val: 1}, {output: 7, val: 2}, {output: 8, val: 0}, {output: 8, val: 1}]

    this.timer = null;
    this.counter = null;
    this.currentTab = 0;
    this.count = -1;
    this.recording = false;

    this.init();
};

TrainingView.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable();

        this.showTab(this.currentTab);

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
        this.$tabs = this.$container.find('.tab');
        this.$steps = this.$container.find('.step');

        this.$prevButton = this.$container.find('.prevBtn');
        this.$nextButton = this.$container.find('.nextBtn');
        this.$recButton = this.$container.find('.recBtn');

        // Update inner value
        this.$currentEvent = this.$container.find('#currentEvent')[0];
        this.$countdown = this.$container.find('.countdown')[0];


        console.log(this.$prevButton);

        return this;
    },

    setupHandlers: function () {

        // If the event is handled by a button or an element event on the page
        this.prevButtonHandler = this.prevButton.bind(this);
        this.nextButtonHandler = this.nextButton.bind(this);
        this.recButtonHandler = this.recButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.updateCurrentHandler = this.updateCurrent.bind(this);

        return this;
    },

    enable: function () {

        this.$prevButton.click(this.prevButtonHandler);
        this.$nextButton.click(this.nextButtonHandler);
        this.$recButton.click(this.recButtonHandler);

        /**
         * Event Dispatcher
         */
        this.model.updateCurrentEvent.attach(this.updateCurrentHandler);

        return this;
    },

    // addTaskButton: function () {
    //     this.addTaskEvent.notify({
    //         task: "Some Event"
    //     });
    // },

    nextButton: function () {
        console.log('here');
        this.nextPrev(1);
    },

    prevButton: function() {
        this.nextPrev(-1);
    },

    recButton: function() {
        if (!this.recording) {
            this.recording = true;
            this.count = 5;

            this.counter = setInterval(this.countdown, 1000);

            this.$recButton[0].innerHTML = "Stop";
        } else {
            this.recording = false;
            // stop recording
            this.stopRecording();
            this.$recButton[0].innerHTML = "Record";
        }
    },

    countdown: function() {
        view.$countdown.innerHTML = view.count;
        view.count--;

        if (view.count < 0) {
            // start recording
            view.startRecording();
            clearInterval(view.counter);
            view.$countdown.innerHTML = "";

        }
    },

    show: function (trainingClass) {
        // stuff to update the view
        // console.log(this.$currentEvent)
        this.$currentEvent.innerHTML = trainingClass
        if (trainingClass === 2) {
            this.synth.triggerAttackRelease("C2", "8n");
        }
    },

    train: function () {
        this.start_snapping();
        this.wekinatorMessage.notify({
            task: "training",
            msg: {address:"/wekinator/control/train", payload: this.steps[this.currentTab].val, output: this.steps[this.currentTab].output}
        });
    },

    startRecording: function () {
        this.start_snapping();
        this.wekinatorMessage.notify({
            task: "training",
            msg: {address:"/wekinator/control/startRecording", payload: this.steps[this.currentTab].val, output: this.steps[this.currentTab].output}
        });
    },

    stopRecording: function () {
        this.stop_snapping();
        this.wekinatorMessage.notify({
            task: "training",
            msg: {address:"/wekinator/control/stopRecording", payload: 1, output: this.steps[this.currentTab].output}
        });
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
        console.log(lowRes.length);
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
        console.log('stopping');
        clearTimeout( this.timer );
        this.timer = null;
      }
    },

    showTab: function (n) {
      // This function will display the specified tab of the form ...
      this.$tabs[n].style.display = "block";
      // ... and fix the Previous/Next buttons:
      if (n == 0) {
        this.$prevButton[0].style.display = "none";
      } else {
        this.$prevButton[0].style.display = "inline";
      }
      if (n == (this.$tabs.length - 1)) {
        this.$nextButton[0].innerHTML = "Submit";
        cls = this.$nextButton[0].className.replace(" secondary", " primary");
        this.$nextButton[0].className = cls;
      } else {
        this.$nextButton[0].innerHTML = "Next";
        cls = this.$nextButton[0].className.replace(" primary", " secondary");
        this.$nextButton[0].className = cls;
      }
      // ... and run a function that displays the correct step indicator:
      this.fixStepIndicator(n)
    },

    nextPrev: function(n) {
      // Hide the current tab:
      this.$tabs[this.currentTab].style.display = "none";
      // Increase or decrease the current tab by 1:
      this.currentTab = this.currentTab + n;
      // if you have reached the end of the form... :
      if (this.currentTab >= this.$tabs.length) {
        //...the form gets submitted:
        this.train();
        window.location.href = "http://localhost:4243/keyboard";
        return false;
      }
      // Otherwise, display the correct tab:
      this.showTab(this.currentTab);
    },

    fixStepIndicator: function (n) {
      // This function removes the "active" class of all steps...
      var i;
      for (i = 0; i < this.$steps.length; i++) {
        this.$steps[i].className = this.$steps[i].className.replace(" active", "");
      }
      //... and adds the "active" class to the current step:
      this.$steps[n].className += " active";
    },

    /* -------------------- Handlers From Event Dispatcher ----------------- */

    updateCurrent: function (sender, args) {
        console.log(args);
        this.show(args["trainingClass"]);
    },

    /* -------------------- End Handlers From Event Dispatcher ----------------- */


};