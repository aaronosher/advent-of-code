var fs = require('fs');
let input = fs.readFileSync('input').toString().split("\n");
let steps = 0;
let i = 0;

while (i < input.length) {
    let action = parseInt(input[i], 10);
    if(action >= 3) {
        input[i] = input[i] - 1;
    } else {
        input[i]++;
    }
    i = i + action;
    steps++;
    // console.log("i = %s", i);
}
console.log("Escaped in %s steps.", (steps));