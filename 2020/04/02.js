const { readFileSync } = require("fs");
const { join } = require("path");

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

const checkByr = (byr) => {
  const parsed = parseInt(byr);
  return parsed >= 1920 && parsed <= 2002;
};

const checkIyr = (iyr) => {
  const parsed = parseInt(iyr);
  return parsed >= 2010 && parsed <= 2020;
};

const checkEyr = (eyr) => {
  const parsed = parseInt(eyr);
  return parsed >= 2020 && parsed <= 2030;
};

const checkHgt = (hgtString) => {
  try {
    const [_, rawHgt, unit] = [...hgtString.match(/([0-9]+)([A-z]{2})/)];
    const hgt = parseInt(rawHgt);

    if (unit === "in") {
      return hgt >= 59 && hgt <= 76;
    } else if (unit === "cm") {
      return hgt >= 150 && hgt <= 193;
    }
    return false;
  } catch (e) {
    return false;
  }
};

const checkHcl = (hclString) => /^#[0-9|a-f]{6}$/.test(hclString);

const checkEcl = (ecl) =>
  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);

const checkPid = (pid) => /^[0-9]{9}$/.test(pid);

const validPassports = passports
  .filter((passport) => {
    const keys = Object.keys(passport);
    return (
      keys.length === 8 || (keys.length === 7 && passport.cid === undefined)
    );
  })
  .filter(({ byr }) => byr && checkByr(byr))
  .filter(({ iyr }) => iyr && checkIyr(iyr))
  .filter(({ eyr }) => eyr && checkEyr(eyr))
  .filter(({ hgt }) => hgt && checkHgt(hgt))
  .filter(({ hcl }) => hcl && checkHcl(hcl))
  .filter(({ ecl }) => ecl && checkEcl(ecl))
  .filter(({ pid }) => pid && checkPid(pid));

console.log(validPassports.length);
