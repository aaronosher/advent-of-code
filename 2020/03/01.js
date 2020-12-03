const { readFileSync } = require("fs");

const input = readFileSync("./input.txt");

const rows = input
  .toString()
  .split("\n")
  .map((line) => line.split(""));

let x = 0;
let trees = 0;
const maxX = rows[0].length - 1;

for (let i = 0; i < rows.length; i++) {
  if (i === 0) {
    x += 3;
    continue;
  }

  if (rows[i][x] === "#") {
    trees++;
  }

  x += 3;
  if (x >= maxX) {
    console.log("max of", maxX, "exceed. Resetting x:", x, "to", x - maxX);
    x = x - maxX;
  }
}

console.log(trees);
