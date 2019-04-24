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

      if (x === 0 && y == 0){
        console.log((red-blue)+green, red, green, blue);
      }

      if (70<green-blue && 190 > green-blue) {
        fill(0,green,0);
      } else if (ifWithin(red, 160) && ifWithin(green, 60) && ifWithin(blue,120)) {
        fill(0,0,blue);
      } else {
        var avg = (red + green + blue) / 3
        fill(avg,avg,avg);
      }
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
