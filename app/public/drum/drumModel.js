var DrumModel = function () {
    this.drumOutputs = [0,0,0,0,0]
    this.updateModelEvent = new Event(this);

 };

 DrumModel.prototype = {

    updateModel: function (msg) {
        var osc_address = msg["address"];
        var osc_values = msg["payload"];
        this.drumOutputs = osc_values;
        this.updateModelEvent.notify({output: this.drumOutputs});
        
    },

    // mostFreqClass: function() {
    //     var arr = this.drumClasses.slice().sort();
    //     var n = arr.length;

    //     // Find most frequent class in the last 10
    //     var max_count = 1, res = arr[0], curr_count = 1; 
    //     for (var i = 1; i < n; i++) { 
    //         if (arr[i] == arr[i - 1]) 
    //             curr_count++; 
    //         else { 
    //             if (curr_count > max_count) { 
    //                 max_count = curr_count; 
    //                 res = arr[i - 1]; 
    //             } 
    //             curr_count = 1; 
    //         } 
    //     } 
      
    //     // If last element is most frequent 
    //     if (curr_count > max_count) 
    //     { 
    //         max_count = curr_count; 
    //         res = arr[n - 1]; 
    //     } 
      
    //     return res; 
    // }


 };