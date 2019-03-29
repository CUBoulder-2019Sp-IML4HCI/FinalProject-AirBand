var GuitarController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

GuitarController.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable();
    },

    createChildren: function () {
        // no need to create children inside the controller
        // this is a job for the view
        // you could all as well leave this function out
        return this;
    },

    setupHandlers: function () {

        this.addTaskHandler = this.addTask.bind(this);
        return this;
    },

    enable: function () {

        this.view.addTaskEvent.attach(this.addTaskHandler);

        return this;
    },


    addTask: function (sender, args) {
        this.model.addTask(args.task);
    },

};