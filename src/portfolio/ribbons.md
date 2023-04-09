---
title: Ribbons
tags:
  - portfolio
  - showButton
  - showLive
description: Animated generated art for your viewing pleasure
link: https://openprocessing.org/sketch/1255461
image: /static/img/ribbons/ribbons-1.png
galleryImages:
  - /static/img/ribbons/ribbons-1.png
  - /static/img/ribbons/ribbons-2.png
  - /static/img/ribbons/ribbons-3.png
  - /static/img/ribbons/ribbons-4.png
layout: projects
---

Click anywhere to generate a new set of ribbons!

This is a generative art experiment, working towards building a system I can use to automate asset generation. Every set of ribbons is created with javascript, [p5.js](https://p5js.org/), and great affection.

<script crossorigin="anonymous" language="javascript" type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5@vv1.4.0/lib/p5.js">
</script>

<script>
  // By Clara Bower
// https://twitter.com/clarabellum

// Made for @sableRaph's weekly creative challenge on Twitch (#WCCChallenge)
// https://www.twitch.tv/sableraph
// "Ribbons"
const utilities = {
	standardCanvas: function() {
		// let smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
    let smallerDimension = Math.min(document.getElementById('livePreview').offsetWidth, windowHeight);
		return createCanvas(smallerDimension, smallerDimension);
	},
	random_num: function(a, b) {
		return a+(b-a)*Math.random()
	},
	random_int: function(a, b) {
		return Math.floor(this.random_num(a, b+1))
	},
	random_from_array: function(arr) {
		let i = this.random_int(0, arr.length - 1);
		return arr[i];
	},
	relSize: function(pixelsIsh) { // this assumes square. sorry.
		return width * (pixelsIsh / 1000);
	}
};

class P5Canvas {
  constructor(w, h, padding, paddingY = false) {
    this.width = w;
    this.height = h;

    this.paddingX = padding;
    if (paddingY) {
      this.paddingY = paddingY
    } else {
      this.paddingY = padding;
    }
  }

  effectiveWidth() {
    return this.width - (2*this.paddingX);
  }
  effectiveHeight() {
    return this.height - (2*this.paddingY);
  }
}

// By Clara Bower
// https://twitter.com/clarabellum

// Made for @sableRaph's weekly creative challenge on Twitch (#WCCChallenge)
// https://www.twitch.tv/sableraph
// "Ribbons"


function coolorToHex(string) {
  const colorsArray = string.split("-").map((el) => {
    return color("#" + el);
  });

  return colorsArray;
}

// let colors = ['white'];
let colors = [];
let rows = [];
let gapBetweenRows;

const colorOptions = [
  '0fa3b1-b5e2fa-eae4d6-eddea4-f7a072',
  'bcc4db-c0a9b0-7880b5-6987c9-6bbaec',
  '4b7d95-c5ccd3-ac9aa6-d8b4a0-d77a61',
  'e2dbbe-d5d6aa-9dbbae-769fb6-188fa7',
  'd4afb9-d1cfe2-9cadce-7ec4cf-52b2cf',
  'cd6d80-d08bbd-ae5baa-beacc7-dcdee1'
]
let backgrounds = [];

let bg;
let blend;

function setup() {
  const c = utilities.standardCanvas();
  c.parent('livePreview');
  canvas = new P5Canvas(width, height, utilities.relSize(100), utilities.relSize(150));
  colors = coolorToHex(utilities.random_from_array(colorOptions));
  backgrounds = [
    {
      color: 'rgba(250, 250, 250, 1)',
      blendMode: MULTIPLY
    },
    {
      color: '#222222',
      blendMode: HARD_LIGHT
    }
  ];

  setColorSettings();
  createRows();
}

function createRows() {
  rows = [];

  const rowCount = utilities.random_int(3, 7)
  for (let index = 0; index < rowCount; index++) {
    rows.push(generatePoints(utilities.random_int(5, 10))) 
  }

  const totalRowHeight = rows.reduce((a, b) => {
    return a + b.height
  }, 0);

  // console.log(gapBetweenRows);
  gapBetweenRows = utilities.relSize(totalRowHeight);
  gapBetweenRows = canvas.effectiveHeight() - gapBetweenRows;
  gapBetweenRows /= rowCount-1;

  background(bg);
}

function setColorSettings() {
  const bgSettings = Math.random() > 0.1 ? backgrounds[0] : backgrounds[1];
  blend = bgSettings.blendMode;
  bg = bgSettings.color;
}

function mouseClicked() {
  colors = coolorToHex(utilities.random_from_array(colorOptions));
  setColorSettings();

  createRows();
}

function generatePoints(n) {
  let points = [{
    x: 0,
    y: 0
  }];

  const delta = canvas.effectiveWidth() / (n);
  const h = utilities.random_int(80, 200);
  const rowMagnitude = utilities.relSize(h/4);


  for (let x = 0; x <= canvas.effectiveWidth() + 1; x += delta) {
    points.push({x: x, y: utilities.random_int(-rowMagnitude, rowMagnitude)});
  }

  points.push({x: canvas.effectiveWidth(), y: 0});

  const tDistortX = utilities.random_int(10, 30);
  const tDistortY = utilities.random_int(10, 30);  

  const tLoopX = utilities.random_int(40, 90);
  const tLoopY = utilities.random_int(40, 90);

  const tOffsetX = utilities.random_int(40, 90);
  const tOffsetY = utilities.random_int(40, 90);

  const w = utilities.relSize(utilities.random_int(3, 15))

  let cap = (Math.random() > 0.3 ? SQUARE : ROUND);
  let dashPattern = [];

  if (Math.random() > 0.85 && w <= utilities.relSize(12)) {
    dashPattern = [w, 2.5*w];
    if (cap == SQUARE) {
      cap = PROJECT;
    }
  }

  return {
    points: points,
    color: utilities.random_from_array(colors),
    distance: utilities.random_int(15, 25),
    weight: w,
    height: h,
    lineDash: dashPattern,
    cap: cap,
    tDistort: function(time, yIndex) {
      return {
        x: Math.cos((time+tOffsetX + yIndex) / tLoopX) * tDistortX,
        y: 
          (noise((time+tOffsetY) / (tLoopY * 3), yIndex) - 0.5) * 2 * (tDistortY)
      }
    }
  };

}


function draw() {
  blendMode(BLEND);
  background(bg)
  blendMode(blend);
  translate(canvas.paddingX, canvas.paddingY);
  noFill();

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    let row = rows[rowIndex];
    strokeWeight(row.weight);
    stroke(row.color);
    strokeCap(row.cap);
    let ct = 0;
    let h0s = row.height;
    // rect(0, 0, canvas.effectiveWidth(), h0s);


    drawingContext.setLineDash(row.lineDash);


    for (let index = 0; index < h0s; index += row.distance) {

      drawingContext.lineDashOffset = index;
      ct -= 0.1;
      curveTightness(ct);
      beginShape();      

      for (let j = 0; j < row.points.length; j++) {
        const t = row.tDistort(frameCount, j);
        const element = row.points[j];
        let howDistorted;
        if (j < 2 || j > (row.points.length - 3)) {
          howDistorted = 0;
        } else {
          howDistorted = ((row.points.length / 2) - Math.abs(j - (row.points.length / 2))) / row.points.length;
        }
        howDistorted *= 4;
        const distortY =  (t.y * howDistorted);
        // console.log(distortY);

        curveVertex(
          element.x + t.x * howDistorted, 
          element.y + utilities.relSize(index) + distortY
        );        
      }
      endShape();
    }
    translate(0, gapBetweenRows + utilities.relSize(h0s));
  }

}

</script>