var GuitarModel = function () {
     this.tasks = [];
     this.selectedTasks = [];
     this.addTaskEvent = new EventEmitter(this);

 };

 GuitarModel.prototype = {

     addTask: function (task) {
         this.tasks.push({
             taskName: task,
             taskStatus: 'uncompleted'
         });
         this.addTaskEvent.notify();
     },


 };