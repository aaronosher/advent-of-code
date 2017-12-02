let lineReader = require('@klortho/line-reader');
let checksum = 0;
lineReader("input", (line) => {
    let lineArray = line.split("\t");
    let min = max = parseInt(lineArray[0], 10);
    lineArray.forEach((val) => {
        val = parseInt(val);
        if(val > max) max = val;
        if(val < min) min = val;
    });
    let diff = max - min;
    console.log("Max: %i | Min: %i | Difference: %i", max, min, diff);
    checksum += diff;
}).then(() => {
    console.log(checksum);
});