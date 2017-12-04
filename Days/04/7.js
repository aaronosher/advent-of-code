function occurences(haystack, needle) {
    let count = 0;
    for(var i=0;i<haystack.length;i++){
        if(haystack[i] === needle)
           count++;
    }
    return count;
}

let lineReader = require('@klortho/line-reader');
let invalidCount = 0;
let validCount = 0;
lineReader("input", (line) => {
    console.log("\x1b[34m%s%s\x1b[0m", "Checking: ", line);

    let passwordArray = line.split(" ");
    let invalid = false;

    passwordArray.forEach((word) => {
        if(occurences(passwordArray, word) > 1) {
            invalid = true;
        }
    });
    if (invalid === true) {
        invalidCount++;
        console.log("\t\x1b[41m\x1b[30m%s\x1b[0m", "Invalid");
    } else {
        console.log("\t\x1b[42m\x1b[30m%s\x1b[0m", "OK");
        validCount++;
    }
}).then(() => {
    console.log("\x1b[35m%s%s\x1b[0m%s\x1b[36m%s%s\x1b[0m%s", invalidCount, " invalid passwords", " and ", validCount, " valid passwords", ".");
})
