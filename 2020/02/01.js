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
  let requiredCharCount = 0;

  for (const character of passwordCharacters) {
    if (character === value.character) {
      requiredCharCount++;
    }
  }

  if (requiredCharCount >= value.min && requiredCharCount <= value.max) {
    valid++;
  }
}

console.log(valid);
