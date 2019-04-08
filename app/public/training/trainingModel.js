var TrainingModel = function () {
    this.trainingClasses = []
    this.trainingClass = -1;
    this.updateCurrentEvent = new Event(this);

 };

 TrainingModel.prototype = {

    updateCurrent: function (msg) {
        var osc_address = msg["address"];
        var osc_values = msg["payload"];
        if (this.trainingClasses.length === 7) {
            this.trainingClasses = this.trainingClasses.slice(1);
        }
        this.trainingClasses.push(osc_values[0]);
        // var mostFreq = this.mostFreqClass();
        // if (this.trainingClass != mostFreq) {
        //     this.trainingClass = mostFreq;
        //     this.updateCurrentEvent.notify({trainingClass: this.trainingClass});
        // }
        var newCls = osc_values[0];
        if (this.trainingClass != newCls) {
           this.trainingClass = newCls;
            this.updateCurrentEvent.notify({trainingClass: this.trainingClass}); 
        }
        
    },

    mostFreqClass: function() {
        var arr = this.trainingClasses.slice().sort();
        var n = arr.length;

        // Find most frequent class in the last 10
        var max_count = 1, res = arr[0], curr_count = 1; 
        for (var i = 1; i < n; i++) { 
            if (arr[i] == arr[i - 1]) 
                curr_count++; 
            else { 
                if (curr_count > max_count) { 
                    max_count = curr_count; 
                    res = arr[i - 1]; 
                } 
                curr_count = 1; 
            } 
        } 
      
        // If last element is most frequent 
        if (curr_count > max_count) 
        { 
            max_count = curr_count; 
            res = arr[n - 1]; 
        } 
      
        return res; 
    }


 };