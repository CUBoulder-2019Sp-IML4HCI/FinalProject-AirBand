var DrumView = function (model) {
    this.model = model;
    this.synth = new Tone.MembraneSynth().toMaster();
    this.updateCurrentEvent = new Event(this);

    this.init();
};

DrumView.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable();
    },

    createChildren: function () {
        // cache the document object
        this.$container = $('.body-container');
        this.$currentEvent = this.$container.find('#currentEvent')[0];

        return this;
    },

    setupHandlers: function () {

        // If the event is handled by a button or an element event on the page
        // this.addTaskButtonHandler = this.addTaskButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        this.updateCurrentHandler = this.updateCurrent.bind(this);

        return this;
    },

    enable: function () {

        // this.$addTaskButton.click(this.addTaskButtonHandler);

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

    show: function (drumClass) {
        // stuff to update the view
        // console.log(this.$currentEvent)
        this.$currentEvent.innerHTML = drumClass
        if (drumClass === 2) {
            this.synth.triggerAttackRelease("C2", "8n");
        }
    },



    /* -------------------- Handlers From Event Dispatcher ----------------- */

    updateCurrent: function (sender, args) {
        console.log(args);
        this.show(args["drumClass"]);
    },

    /* -------------------- End Handlers From Event Dispatcher ----------------- */


};