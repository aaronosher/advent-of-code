let lineReader = require('@klortho/line-reader');
let checksum = 0;
let lineNumber = 1;
lineReader("input", (line) => {
    let lineArray = line.split("\t");
    let parent = { i: 0, val: parseInt(lineArray[0]) };
    let lineChecksum = 0;
    console.log("Line %i", lineNumber);
    lineArray.forEach((val, i) => {
        if (lineChecksum) return;
        let parent = { i: i, val: parseInt(val) };
        console.log("\tParent is %i", parent.val);
        lineArray.forEach((val, i) => {
            if (lineChecksum) return;
            if (i === parent.i) return;
            val = parseInt(val);
            console.log("\t\t%i \% %i = %i", parent.val, val, (parent.val % val));
            if((parent.val % val) === 0) {
                lineChecksum = parent.val / val;
                console.log("\t\tSUCCESS! line %i checksum is %i", lineNumber, lineChecksum);
                checksum += lineChecksum;
                lineNumber ++;
                return;
            }
        });
    });
}).then(() => {
    console.log(checksum);
});