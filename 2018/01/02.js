const { readFileSync } = require('fs');

const buffer = readFileSync('./input.txt');
const file = buffer.toString();
const input = file.split("\n").map(line => parseInt(line));

const updateFrequency = (input, i=0, frequency=0, frequencies=new Set([0])) => {
  if (i === input.length) {
    return updateFrequency(input, 0, frequency, frequencies)
  } else {
    if (frequencies.has(frequency + input[i])) {
      return frequency + input[i];
    }
    frequencies.add(frequency + input[i]);
    return updateFrequency(input, i + 1, frequency + input[i], frequencies);
  }
}

// const frequency = updateFrequency(input);

const calibration = (input) => {
  const frequencies = new Set([0]);

  const changes = input
    .split('\n')
    .map((x) => parseInt(x));

  let frequency = 0;
  let i = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (i === changes.length) {
      i = 0;

      continue;
    }

    frequency += changes[i];

    if (frequencies.has(frequency)) {
      break;
    }

    frequencies.add(frequency);

    i++;
  }

  return frequency;
};


console.log(calibration(file));
