let lineReader = require('@klortho/line-reader');

function checkAnagrams(haystack) {

    for ( var i = 0; i < haystack.length; i++) {

        var word = haystack[i];
        var alphabetical = word.split("").sort().join("");

        for (var j = 0; j < haystack.length; j++) {

            if (i === j) {
                continue;
            }

            var other = haystack[j];
            if(alphabetical === other.split("").sort().join("")){
                return true;
            }
        }
    }
}

function occurences(haystack, needle) {
    let count = 0;
    for(var i=0;i<haystack.length;i++){
        if(haystack[i] === needle)
           count++;
    }
    return count;
}
let invalidCount = 0;
let validCount = 0;
lineReader("input", (line) => {
    console.log("\x1b[34m%s%s\x1b[0m", "Checking: ", line);

    let passwordArray = line.split(" ");
    let invalid = false;

    passwordArray.forEach((word) => {
        if(invalid === true) {
            return;
        }
        if(occurences(passwordArray, word) > 1) {
            console.log("\t\x1b[31m%s\x1b[0m occurs more than once", word);
            invalid = true;
        } else if(checkAnagrams(passwordArray)) {
            console.log("\t\x1b[33m%s\x1b[0m", "anagrams found");
            invalid = true;
        }
    });
    if (invalid === true) {
        invalidCount++;
    } else {
        validCount++;
    }
}).then(() => {
    console.log("\x1b[35m%s%s\x1b[0m%s\x1b[36m%s%s\x1b[0m%s", invalidCount, " invalid passwords", " and ", validCount, " valid passwords", ".");
}).catch((err) => {
    console.log(err);
});