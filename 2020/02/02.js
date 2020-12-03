const { readFileSync } = require("fs");

const input = readFileSync("./input.txt");

const pattern = /(\d*)\-(\d*)\s([A-z])\:\s(\w*)/g;

const values = input
  .toString()
  .split("\n")
  .map((line) => [...line.matchAll(pattern)][0])
  .map(([_, min, max, character, password]) => ({
    min: parseInt(min),
    max: parseInt(max),
    character,
    password,
  }));

let valid = 0;

for (const value of values) {
  const passwordCharacters = value.password.split("");

  if (
    (passwordCharacters[value.min - 1] === value.character &&
      passwordCharacters[value.max - 1] !== value.character) ||
    (passwordCharacters[value.min - 1] !== value.character &&
      passwordCharacters[value.max - 1] === value.character)
  ) {
    valid++;
  }
}

console.log(valid);
