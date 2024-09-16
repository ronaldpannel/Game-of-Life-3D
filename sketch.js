let num = 20;
let size = 10;
let grid = [];
let hue = 0;
let angle = 0;
let sA, sC
let pA, pC
function setup() {
  createCanvas(400, 400, WEBGL);
  colorMode(HSB, 255);
  angleMode(DEGREES);

  sA = createSlider(0, 10, 1, 0.5).position(120, 420)
  sA.parent('container')
  pA = createP('Index A').position(270, 405)
  pA.parent("container");

  sC = createSlider(0, 10, 1, 0.5).position(120, 450);
  sC.parent("container");
  pC = createP("Index A").position(270, 435);
   pC.parent("container");
  for (let i = 0; i < num; i++) {
    grid[i] = [];
    for (let j = 0; j < num; j++) {
      grid[i][j] = [];
      for (let k = 0; k < num; k++) {
        let mid = num / 2;
        let margin = 2;
        let min = mid - margin;
        let max = mid + margin;
        if (
          i >= min &&
          i <= max &&
          j >= min &&
          j <= max &&
          k >= min &&
          k <= max
        ) {
          grid[i][j][k] = 1;
        } else {
          grid[i][j][k] = 0;
        }
      }
    }
  }
}

function draw() {
  background(0);
  orbitControl();
  rotateX(-25);
  rotateY(angle);
  // rotateZ(angle);
  // aSlider = createSlider()

  translate(
    (-size * num) / 2 + size / 2,
    (-size * num) / 2 + size / 2,
    (-size * num) / 2 + size / 2
  );
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      for (let k = 0; k < num; k++) {
        if (grid[i][j][k] == 1) {
          fill(hue, 255, 255);
        } else {
          noFill();
          stroke(255, 100);
        }

        push();
        // box(size);
        translate(size * i, size * j, size * k);
        box(size - size / 4);
        pop();
      }
    }
  }
  if (keyIsPressed) {
    update();
    if (hue < 255) {
      hue += 5;
    } else {
      hue = 0;
    }
  }
  angle += 1;
}
setInterval(() => {
  update();
  if (hue < 255) {
    hue += 5;
  } else {
    hue = 0;
  }
}, 250);
function update() {
  let nextGen = [];
  for (let i = 0; i < num; i++) {
    nextGen[i] = [];
    for (let j = 0; j < num; j++) {
      nextGen[i][j] = [];
      for (let k = 0; k < num; k++) {
        let n = neighboringStates(grid, i, j, k);
        let a = sA.value()
        let b = 10;
        let c = sC.value();
        let d = 10;

        if (grid[i][j][k] == 1) {
          if (n >= a && n <= b) {
            nextGen[i][j][k] = 1;
          } else {
            nextGen[i][j][k] = 0;
          }
        } else {
          if (n >= c && n <= d) {
            nextGen[i][j][k] = 1;
          } else {
            nextGen[i][j][k] = 0;
          }
        }
      }
    }
  }
  grid = nextGen;
}

function neighboringStates(i = grid, x, y, z) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        let xIndex = (x + i + num) % num;
        let yIndex = (y + j + num) % num;
        let zIndex = (z + k + num) % num;

        sum += grid[xIndex][yIndex][zIndex];
      }
    }
  }
  sum -= grid[x][y][z];
  return sum;
}

function windowResized() {
  resizeCanvas(400, 400);
}
