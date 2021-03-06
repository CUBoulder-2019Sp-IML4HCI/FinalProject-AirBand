function setup() {
  createCanvas(400,150);
}

function draw() {
  var video = view.model.video
  if (video) {
    for (var i = 0; i < video.length; i++) {
      var color = video[i];
      var red = Math.floor(color / 65536);
      var green = Math.floor(color / 256) % 256;
      var blue = color % 256;

      // console.log((i%40), Math.floor(i/40));
      var x = (i%80) * 5;
      var y = Math.floor(i/80)*15;
      
      fill(red,green,blue);
      rect(x,y, 5, 15);
    }
  }
}

function ifWithin(color, number) {
  if (color > number-30 && color < number+30) {
    return true
  } else {
    return false
  }
}
