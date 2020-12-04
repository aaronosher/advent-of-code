const { readFileSync } = require("fs");

const input = readFileSync("./input.txt");

const pattern = /((byr|iyr|eyr|hgt|hcl|ecl|pid|cid):(\#?[0-z]+[in|cm]?))/g;

const passports = input
  .toString()
  .split("\n\n")
  .map((entry) => [...entry.matchAll(pattern)])
  .map((entry) => entry.map(([_1, _2, key, val]) => ({ key, val })))
  .map((fields) =>
    fields.reduce(
      (passport, field) => ({ ...passport, [field.key]: field.val }),
      {}
    )
  );

const valid = passports.reduce((count, passport) => {
  const keys = Object.keys(passport);
  if (keys.length === 8 || (keys.length === 7 && passport.cid === undefined)) {
    return count + 1;
  }
  return count;
}, 0);

console.log(valid);
