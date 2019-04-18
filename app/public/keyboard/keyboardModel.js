var KeyboardModel = function () {
    
    this.keyBoardOutputs = [0,0,0,0,0,0,0,0,0,0,0,0]

    this.updateModelEvent = new Event(this);
    this.playSound = new Event(this);

    this.leftHand = {position: 0, hit: 1, fingers: [1,1,1,1]};
    this.rightHand = {position: 0, hit: 1, fingers: [1,1,1,1]};

 };

 KeyboardModel.prototype = {

    updateModel: function (msg) {
        var osc_address = msg["address"];
        var osc_values = msg["payload"];
        this.keyBoardOutputs = osc_values;
        this.updateModelEvent.notify({output: this.keyBoardOutputs});
        
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