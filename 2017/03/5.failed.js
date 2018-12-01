const input = 361527;
const sqrt = Math.sqrt(input);
const sqrtInt = Math.floor(sqrt);
const remainder = sqrt - sqrtInt;
const pos = (sqrtInt * 4) * remainder;
const side = Math.floor(pos / sqrtInt);
let secPos = pos - (sqrtInt * side);
(secPos >= sqrtInt / 2) ? Math.ceil(secPos) : Math.floor(secPos = secPos * -1);
let row = 0;
let col = 0;
if(side === 1) {
    row = Math.ceil(sqrtInt / 2);
    col = secPos;
} else if(side === 3) {
    row = Math.floor((sqrtInt / 2) * -1);
    col = secPos;
} else if(side === 0) {
    col = Math.ceil(sqrtInt/ 2);
    row = secPos;
} else if (side === 1) {
    col = Math.floor((sqrtInt / 2) * -1);
    row = secPos;
}
const steps = Math.abs(row) + Math.abs(col);

console.log("Input: %s\nSquare Root: %s\nSquare Root Int: %s\nRemainder: %s\nPos: %s\nSec Pos: %s\nSide: %s\nRow: %s\nCol: %s\nSteps: %s", input, sqrt, sqrtInt, remainder, pos, secPos, side, row, col, steps);