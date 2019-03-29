var GuitarView = function (model) {
    this.model = model;
    this.addTaskEvent = new Event(this);

    this.init();
};

GuitarView.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable();
    },

    createChildren: function () {
        // cache the document object
        this.$container = $('.js-container');
        // this.$addTaskButton = this.$container.find('.js-add-task-button');

        return this;
    },

    setupHandlers: function () {

        // this.addTaskButtonHandler = this.addTaskButton.bind(this);

        /**
        Handlers from Event Dispatcher
        */
        // this.addTaskHandler = this.addTask.bind(this);

        return this;
    },

    enable: function () {

        // this.$addTaskButton.click(this.addTaskButtonHandler);

        /**
         * Event Dispatcher
         */
        // this.model.addTaskEvent.attach(this.addTaskHandler);

        return this;
    },

    addTaskButton: function () {
        this.addTaskEvent.notify({
            task: this.$taskTextBox.val()
        });
    },

    show: function () {
        // stuff
    },



    /* -------------------- Handlers From Event Dispatcher ----------------- */

    clearTaskTextBox: function () {
        this.$taskTextBox.val('');
    },

    addTask: function () {
        this.show();
    },

    setTasksAsCompleted: function () {
        this.show();

    },

    deleteTasks: function () {
        this.show();

    }

    /* -------------------- End Handlers From Event Dispatcher ----------------- */


};