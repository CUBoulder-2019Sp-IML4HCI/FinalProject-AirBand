var KeyboardModel = function () {
    
    this.keyBoardOutputs = [0,0,0,0,0,0,0,0,0,0,0,0]

    this.updateModelEvent = new Event(this);
    this.playSound = new Event(this);

    this.leftHand = {position: 0, playing: false, hit: 2, fingers: [1,1,1,1]};
    this.rightHand = {position: 0, playing: false, hit: 2, fingers: [1,1,1,1]};

 };

 KeyboardModel.prototype = {

    updateModel: function (msg) {
        var osc_address = msg["address"];
        var osc_values = msg["payload"];
        this.keyBoardOutputs = osc_values;
        
        this.leftHand.playing = this.leftHand.hit == osc_values[0];
        this.leftHand.hit = osc_values[0]
        this.leftHand.position = osc_values[1];
        this.leftHand.fingers = osc_values.slice(2,6);


        this.rightHand.playing = this.rightHand.hit == osc_values[6];
        this.rightHand.hit = osc_values[6]
        this.rightHand.position = osc_values[7];
        this.rightHand.fingers = osc_values.slice(8);


        this.updateModelEvent.notify({right: this.rightHand, left:this.leftHand});
        
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