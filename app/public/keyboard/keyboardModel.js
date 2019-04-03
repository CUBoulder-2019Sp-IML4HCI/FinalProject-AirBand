var KeyboardModel = function () {
    this.keyboardClasses = []
    this.keyboardClass = -1;
    this.updateCurrentEvent = new Event(this);

 };

 KeyboardModel.prototype = {

    updateCurrent: function (msg) {
        var osc_address = msg["address"];
        var osc_values = msg["payload"];
        if (this.keyboardClasses.length === 7) {
            this.keyboardClasses = this.keyboardClasses.slice(1);
        }
        this.keyboardClasses.push(osc_values[0]);
        // var mostFreq = this.mostFreqClass();
        // if (this.keyboardClass != mostFreq) {
        //     this.keyboardClass = mostFreq;
        //     this.updateCurrentEvent.notify({keyboardClass: this.keyboardClass});
        // }
        var newCls = osc_values[0];
        if (this.keyboardClass != newCls) {
           this.keyboardClass = newCls;
            this.updateCurrentEvent.notify({keyboardClass: this.keyboardClass}); 
        }
        
    },

    mostFreqClass: function() {
        var arr = this.keyboardClasses.slice().sort();
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