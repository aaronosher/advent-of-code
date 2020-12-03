const { readFileSync } = require("fs");

const input = readFileSync("./input.txt");

const rows = input
  .toString()
  .split("\n")
  .map((line) => line.split(""));

const maxX = rows[0].length - 1;

const checkSlope = (right, down) => {
  let x = 0;
  let trees = 0;

  for (let i = 0; i < rows.length; i += down) {
    if (i === 0) {
      x += right;
      continue;
    }

    if (rows[i][x] === "#") {
      trees++;
    }

    x += right;
    if (x >= maxX) {
      console.log("max of", maxX, "exceeded. Resetting x:", x, "to", x - maxX);
      x = x - maxX;
    }
  }

  return trees;
};

const slopes = [
  checkSlope(1, 1),
  checkSlope(3, 1),
  checkSlope(5, 1),
  checkSlope(7, 1),
  checkSlope(1, 2),
];

console.log(...slopes);

console.log(slopes.reduce((acc, val) => val * acc, 1));
