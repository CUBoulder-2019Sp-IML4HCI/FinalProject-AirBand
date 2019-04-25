var KeyboardController = function (model, view) {
    this.model = model;
    this.view = view;
    this.socket = io();

    this.init();
};

KeyboardController.prototype = {

    init: function () {
        this.setupHandlers()
            .enable();

        // Do something with it
        this.socket.on('osc', function(msg){
          
          // Do stuff
          // console.log("messaged received");
          // needs to be controller because (a) I am hacking 
          // and (b) it is the name of the controller
          controller.updateCurrent(msg); 

        });
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

    wekinatorMessage: function (sender, args) {
        this.socket.emit(args["task"], args["msg"]);
    },
    
    updateCurrent: function (args) {
        // console.log(args);
        this.model.updateModel(args);
    },

};