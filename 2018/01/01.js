const { readFileSync } = require('fs');

const buffer = readFileSync('./input.txt');
const file = buffer.toString();
const input = file.split("\n");

const updateFrequency = (input, i=0, frequency=0) => {
  if (i === input.length) {
    return frequency;
  } else {
    const updater = parseInt(input[i], 10);
    return updateFrequency(input, i + 1, frequency + updater);
  }
}

const frequency = updateFrequency(input);

console.log(frequency);