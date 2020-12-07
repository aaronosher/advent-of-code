const { readFileSync } = require("fs");

const input = readFileSync("./input.txt");

const groups = input
  .toString()
  .split("\n\n")
  .map((group) => group.split("\n"));

const calculateGroup = (group) => {
  let answered = {};

  for (const person of group) {
    for (const char of person) {
      if (!answered[char]) {
        answered[char] = 1;
        continue;
      }

      answered[char]++;
    }
  }

  let validCount = 0;

  for (const question in answered) {
    if (answered[question] === group.length) {
      validCount++;
    }
  }

  return validCount;
};

const sum = groups.reduce(
  (runningTotal, group) => runningTotal + calculateGroup(group),
  0
);

console.log(sum);
