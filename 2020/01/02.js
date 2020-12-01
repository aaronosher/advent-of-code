const { readFileSync } = require("fs");
const bs = require("binary-search");

const input = readFileSync("./input.txt");

const values = input
  .toString()
  .split("\n")
  .map((val) => parseInt(val))
  .sort((a, b) => a - b);

for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < values.length; j++) {
    if (j === i || values[i] + values[j] > 2020) continue;

    const toFind = 2020 - values[i] - values[j];
    const k = bs(values, toFind, (el, needle) => el - needle);

    if (k > -1) {
      console.log(values[i] * values[j] * values[k]);
      process.exit(0);
    }
  }
}
