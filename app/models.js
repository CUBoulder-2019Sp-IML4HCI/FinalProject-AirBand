module.exports = {
// Training Model
Drum: class {
  // webcam input plus 3 microbit flags (2 for hand hit and 1 for kick)
  constructor () {
    this.input = [0.0, 0.0, 0.0, 0.0, 0.0]
  }

  updateVideoInput() {
    
  }

  updateLeftHand(num) {
    this.input[2] = parseFloat(num);
  }

  updateRightHand(num) {
    this.input[3] = parseFloat(num);
  }

  updateKick(num) {
    this.input[4] = parseFloat(num);
  }

  getInput() {
    var wekInputs = []

    for (var i = 0; i < this.input.length; i++) {
      wekInputs.push({type: "float", value: this.input[i]})
    }

    return wekInputs
  }

 },

// Training Model
Keyboard: class {
  // webcam input plus 8 microbit flags (4 fingers each hand)
  constructor () {
    this.input = []
  }
  updateVideoInput() {
    
  }

  updateLeftHand() {
    
  }

  updateRightHand() {

  }

 },


// Training Model
Guitar: class {
  // webcam input plus 5 microbit flags (4 fingers, 1 strum)
  constructor() {
    this.input = []
  }

  updateVideoInput() {
    
  }

  updateFingers() {
    
  }

  updateStrum() {
    
  }

 },
}