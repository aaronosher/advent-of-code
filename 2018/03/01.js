const puzzleInput = require('../getInput')(__dirname + '/input.txt');
const colors = require('./colors').colors;

const initMatrix = () => {
  const matrix = [];

  for(let i = 0; i < 1000; i++) {
    matrix[i] = [];
    for (let j = 0; j < 1000; j++) {
      matrix[i][j] = '.';
    }
  }

  return matrix;
  
}

const render = (matrix=initMatrix()) => {
  let renderString = '';
  for (const line of matrix) {
    for (const col of line) {
      renderString += col === '.' ? '#' : '.';
    }
    renderString += '\n';
  }
  console.log(renderString);
}

const parse = (line) => {
  const regex = /#(\d*)\s\@\s(\d*),(\d*):\s(\d*)x(\d*)/g
  const [
    raw,
    id,
    leftMargin,
    topMargin,
    width,
    height,
  ] = regex.exec(line);

  const idInt = parseInt(id);
  const leftMarginInt = parseInt(leftMargin);
  const topMarginInt = parseInt(topMargin);
  const widthInt = parseInt(width);
  const heightInt = parseInt(height);

  return { id: idInt, leftMargin: leftMarginInt, topMargin: topMarginInt, width: widthInt, height: heightInt };
}


const interpert = (input=puzzleInput, matrix=initMatrix()) => {
  let shared = 0;

  for (const line of input) {
    const { id, leftMargin, topMargin, width, height } = parse(line);

    let minRow = topMargin;
    let maxRow = topMargin + height - 2;

    let minCol = leftMargin;
    let maxCol = leftMargin + width - 2;
    // console.log('minRow', minRow, 'maxRow', maxRow, 'minCol', minCol, 'maxCol', maxCol);

    for (let i = minRow; i < maxRow; i++) {
      for (let j = minCol; j < maxCol; j++) {
        if (matrix[i][j] === '.') {
          matrix[i][j] = id;
        } else {
          matrix[i][j] = 'X';
          shared++;
        }
      }
    } 
  }
  // render(matrix);
  return shared;
}

console.log(interpert(puzzleInput, initMatrix()));
