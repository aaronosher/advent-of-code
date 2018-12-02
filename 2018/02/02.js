const puzzleInput = require('../getInput')(__dirname + '/input.txt');

const matches = (base, id) => {
  const baseChars =  base.split("");
  const idChars = id.split("");

  let diff = 0;

  for (let i = 0; i < baseChars.length; i++) {
    if (baseChars[i] !== idChars[i]) diff++;
    if (diff > 1) return false;
  }

  if (diff === 1) return true;
  return false;
};

const findSame = (i = 0, input = puzzleInput) => {
  if (i >= input.length) throw Error("No matches");

  const base = input[i];

  for (const id of input) {
    if (!matches(base, id)) continue;
    const baseChars =  base.split("");
    const idChars = id.split("");

    const matchChars = baseChars.filter((char, i) => char === idChars[i]);
    return matchChars.join("");
  }

  return findSame(i + 1);
};

console.log(findSame());
