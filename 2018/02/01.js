const puzzleInput = require('../getInput')(__dirname + '/input.txt');

const generateChecksum = (i = 0, two = 0, three = 0, input = puzzleInput) => {
  if (i >= input.length) {
    return two * three;
  }

  const letterCount = {};
  let hasTwo = false;
  let hasThree = false;

  for (const letter of input[i]) {
    letterCount[letter] = !!letterCount[letter] ? letterCount[letter] + 1 : 1;
  }

  if (Object.values(letterCount).filter(letter => letter === 2).length > 0) hasTwo = true;
  if (Object.values(letterCount).filter(letter => letter === 3).length > 0) hasThree = true;

  return generateChecksum(i + 1, hasTwo ? two + 1 : two, hasThree ? three + 1 : three);

};

console.log(generateChecksum());
