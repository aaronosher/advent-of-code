const { readFileSync } = require("fs");

const input = readFileSync("./input.txt");

const calculateRow = (ticket) => {
  let min = 0;
  let max = 127;

  const parts = ticket.split("");

  for (const part of parts) {
    if (part === "F") {
      max = max - Math.floor((max - min) / 2);
      continue;
    }

    if (part === "B") {
      min = min + Math.ceil((max - min) / 2);
      continue;
    }
  }

  return min;
};

const calculateSeat = (ticket) => {
  let min = 0;
  let max = 7;

  const parts = ticket.split("");

  for (const part of parts) {
    if (part === "L") {
      max = max - Math.floor((max - min) / 2);
      continue;
    }

    if (part === "R") {
      min = min + Math.ceil((max - min) / 2);
      continue;
    }
  }

  return min;
};

const seats = input
  .toString()
  .split("\n")
  .map((ticket) => [
    calculateRow(ticket.substring(0, 7)),
    calculateSeat(ticket.substring(7, 10)),
  ])
  .map(([row, seat]) => row * 8 + seat);

console.log(Math.max(...seats));
