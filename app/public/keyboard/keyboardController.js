var KeyboardController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

KeyboardController.prototype = {

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

};