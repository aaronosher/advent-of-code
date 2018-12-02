const { readFileSync } = require('fs');

const getInput = (puzzleInput) => {
  const buffer = readFileSync(puzzleInput);
  const file = buffer.toString();
  const input = file.split("\n");
  return input;
};

module.exports = getInput;