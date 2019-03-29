var DrumModel = function () {
    this.drumClasses = []
    this.drumClass = -1;
    this.updateCurrentEvent = new Event(this);

 };

 DrumModel.prototype = {

    updateCurrent: function (msg) {
        var osc_address = msg["address"];
        var osc_values = msg["payload"];
        if (this.drumClasses.length === 10) {
            this.drumClasses = this.drumClasses.slice(1);
        }
        this.drumClasses.push(osc_values[0]);
        var mostFreq = this.mostFreqClass();
        if (this.drumClass != mostFreq) {
            this.drumClass = mostFreq;
            this.updateCurrentEvent.notify({drumClass: this.drumClass});
        }
    },

    mostFreqClass: function() {
        var arr = this.drumClasses.slice().sort();
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