var root = {
  wavecolor: {  
    r: 255,
    g: 255,
    b: 255
  },
  rainbowSpeed: 0.5,
  rainbow: false, // Turned off rainbow effect
  matrixspeed: 50
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// List of headlines to stream vertically
var headlines = [
  "          Saif I'm Fucked!",
  "   Saif I can't code.  ",
  "      Saif I'm Fucked!",
  "        Saif I can't code.  ",
  "   Saif I'm Fucked!",
  "      Saif I can't code.  ",
  "    Saif I'm Fucked!",
  "     Saif I can't code.  "
];

var font_size = 14;
var columns = c.width / font_size; // number of columns for the rain

var drops = [];
var columnHeadlines = [];

// Initialize drops with scattered initial positions and assign headlines
for (var x = 0; x < columns; x++) {
  drops[x] = Math.floor(Math.random() * -20);
  columnHeadlines[x] = headlines[Math.floor(Math.random() * headlines.length)];
}

// drawing the characters
function draw() {
  // translucent BG to show trail
  ctx.fillStyle = "rgba(0,0,0, 0.08)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.font = font_size + "px monospace";

  // looping over drops
  for (var i = 0; i < drops.length; i++) {
    var currentHeadline = columnHeadlines[i];
    
    // Pick character sequentially based on vertical position
    var charIndex = Math.max(0, drops[i]) % currentHeadline.length;
    var text = currentHeadline[charIndex];

    // Clear background cell behind character
    ctx.fillStyle = "rgba(10,10,10, 1)";
    ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);

    // Hardcoded white or pulled from root.wavecolor
    if (root.rainbow) {
      hue += (hueFw) ? 0.01 : -0.01;
      var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
      var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
      var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
      ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
    } else {
      ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
    }

    if (drops[i] >= 0) {
      ctx.fillText(text, i * font_size, drops[i] * font_size);
    }

    // Increment Y coordinate
    drops[i]++;

    // Reset drop and pick a new headline once it crosses the bottom
    if (drops[i] * font_size > c.height && Math.random() > 0.975) {
      drops[i] = 0;
      columnHeadlines[i] = headlines[Math.floor(Math.random() * headlines.length)];
    }
  }
}

window.onresize = () => {
  location.reload();
}

setInterval(draw, root.matrixspeed);

function livelyPropertyListener(name, val) {
  switch(name) {
    case "matrixColor":
      root.wavecolor = hexToRgb(val);
      break;
    case "rainBow":
      root.rainbow = val;
      break;   
    case "rainbowSpeed":
      root.rainbowSpeed = val / 100;
      break;    
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}