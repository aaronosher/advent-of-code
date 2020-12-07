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
    .map((rule) => rule.replace(/bag.*/, "").trim())
    .map((rule) => {
      const [count, ...bag] = rule.split(" ");
      return [+count, bag.join(" ")];
    });

  if (innerBags.length === 0) continue;
  const outerBag = ruleParts[0].trim();
  rules[outerBag] = innerBags;
}

const count = (bag) => {
  if (!rules[bag]) return 0;

  return rules[bag].reduce(
    (total, [innerBagCount, innerBag]) =>
      total + innerBagCount + innerBagCount * count(innerBag),
    0
  );
};

console.log(count("shiny gold"));
