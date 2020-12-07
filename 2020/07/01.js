const { readFileSync } = require("fs");

const input = readFileSync("./input.txt");

const rawRules = input.toString().split("\n");

const rules = {};

for (const rule of rawRules) {
  const ruleParts = rule.split("bags contain");
  const innerBags = ruleParts[1]
    .trim()
    .split(",")
    .filter((bag) => bag !== "no other bags.")
    .map((rule) => rule.replace(/\d/, "").replace(/bag.*/, "").trim());

  if (innerBags.length === 0) continue;
  const outerBag = ruleParts[0].trim();
  rules[outerBag] = innerBags;
}

const containsGold = (bag) => {
  if (!rules[bag]) return false;

  if (rules[bag].includes("shiny gold")) return true;

  const innerBagContainsGold = rules[bag].reduce(
    (acc, val) => acc || containsGold(val),
    false
  );

  return innerBagContainsGold;
};

let count = 0;

for (const bag in rules) {
  count += containsGold(bag) ? 1 : 0;
}

console.log(count);
