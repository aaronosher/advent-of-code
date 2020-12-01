const { readFileSync } = require("fs");
const bs = require("binary-search");

const input = readFileSync("./input.txt");

const values = input
  .toString()
  .split("\n")
  .map((val) => parseInt(val))
  .sort((a, b) => a - b);

for (const val of values) {
  const toFind = 2020 - val;
  const i = bs(values, toFind, (el, needle) => el - needle);

  if (i > -1) {
    console.log(val * values[i]);
    break;
  }
}
