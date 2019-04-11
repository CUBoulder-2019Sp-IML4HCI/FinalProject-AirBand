var TrainingController = function (model, view) {
    this.model = model;
    this.view = view;
    this.socket = io();

    this.init();
};

TrainingController.prototype = {

    init: function () {
        this.setupHandlers()
            .enable();
    },

    setupHandlers: function () {
        // These would happen if the event is coming from the view
        // this.updateCurrentHandler = this.updateCurrent.bind(this);

        return this;
    },

    enable: function () {
        // This is for when event is coming from the view
        // this.view.updateCurrentEvent.attach(this.updateCurrentHandler);

        return this;
    },


    updateCurrent: function (args) {
        // console.log(args);
        this.model.updateCurrent(args);
    },

    startRecording: function () {
        this.socket.emit("training", {'address':"/wekinator/control/startRecording", 'payload':1});
    },

    stopRecording: function () {
        this.socket.emit("training", {'address':"/wekinator/control/stopRecording", 'payload':1});
    }

};