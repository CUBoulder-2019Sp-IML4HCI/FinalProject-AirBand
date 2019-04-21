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

        this.socket.emit("delete", 2);
    },

    setupHandlers: function () {
        // These would happen if the event is coming from the view
        this.wekinatorMessageHandler = this.wekinatorMessage.bind(this);

        return this;
    },

    enable: function () {
        // This is for when event is coming from the view
        this.view.wekinatorMessage.attach(this.wekinatorMessageHandler);

        return this;
    },


    updateCurrent: function (args) {
        // console.log(args);
        this.model.updateCurrent(args);
    },

    wekinatorMessage: function (sender, args) {
        this.socket.emit(args["task"], args["msg"]);
    },

};