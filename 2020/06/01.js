const { readFileSync } = require("fs");

const input = readFileSync("./input.txt");

const groups = input
  .toString()
  .split("\n\n")
  .map((group) => group.split("\n"));

const calculateGroup = (group) => {
  let answered = "";

  for (const person of group) {
    for (const char of person) {
      if (answered.indexOf(char) === -1) {
        answered += char;
      }
    }
  }

  return answered.length;
};

const sum = groups.reduce(
  (runningTotal, group) => runningTotal + calculateGroup(group),
  0
);

console.log(sum);
