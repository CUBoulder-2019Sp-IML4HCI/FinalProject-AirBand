module.exports = {
// Training Model
Drum: class {
  // webcam input plus 3 microbit flags (2 for hand hit and 1 for kick)
  constructor () {
    this.input = [];
    for (var i =0; i < 803; i++) {
      this.input.push(0.0)
    }
  }

  updateVideoInput(webcamInputs) {
    for (var i = 0; i < 800; i++) {
      this.input[3+i] = webcamInputs[i];
    }
  }

  updateLeftHand(num) {
    this.input[0] = parseFloat(num);
  }

  updateRightHand(num) {
    this.input[1] = parseFloat(num);
  }

  updateKick(num) {
    this.input[2] = parseFloat(num);
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
    this.input = [];
    for (var i =0; i < 408; i++) {
      this.input.push(0.0)
    }
  }

  updateVideoInput(webcamInputs) {
    for (var i = 0; i < 400; i++) {
      this.input[8+i] = webcamInputs[i];
    }
  }

  updateLeftHand(fingers) {
    for (var i = 0; i < 4; i++) {
      this.input[i] = fingers[i];
    }
  }

  updateRightHand(fingers) {
    for (var i = 0; i < 4; i++) {
      this.input[4+i] = fingers[i];
    }
  }

  getInput() {
    var wekInputs = []

    for (var i = 0; i < this.input.length; i++) {
      wekInputs.push({type: "float", value: this.input[i]})
    }

    return wekInputs
  }

 },
 
}