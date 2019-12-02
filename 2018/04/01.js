const partOne = (input) => {
  const parsed = convertToDates(input);
  const sorted = sort(parsed);
  const shifts = getShifts(sorted);
  const days = convertToDays(sorted, shifts);
  const guards = guardStats(days);
  const worst = worstGuard(guards);
  const [worstMin] = worstMinute(guards, worst);
  // console.log(days, worst, worstMin);
  return worst * worstMin;
}

const convertToDates = (input) => {
  const expression = /\[(\d{4})-(\d{2})-(\d{2})\s(\d{2})\:(\d{2})\]\s(.*)/i;

  return input.map(entry => {
    const result = expression.exec(entry);
    return {
      year: parseInt(result[1]),
      month: parseInt(result[2]),
      day: parseInt(result[3]),
      hour: parseInt(result[4]),
      minute: parseInt(result[5]),
      message: result[6]
    };
  });
}

const sort = (parsedInput) => {
  return parsedInput.sort((a, b) => {
    const aDate = new Date(a.year, a.month, a.day, a.hour, a.minute);
    const bDate = new Date(b.year, b.month, b.day, b.hour, b.minute);

    return aDate - bDate;
  });
};

const getShifts = (sortedInput) => {
  const beginShift = /Guard \#(\d*) begins shift/i;
  return sortedInput.reduce((acc, input) => {
    if (!beginShift.test(input.message)) return acc;
    const todayId = `${input.year}${input.month}${input.day}`
    const today = new Date(todayId);
    const tomorrow = (new Date(todayId)).setDate(today.getDate() + 1);
    const tomorrowId = `${tomorrow.getFullYear()}${tomorrow.getMonth() + 1}${tomorrow.getDate()}`;
    
    const dateId = (input.hour === 23) ? tomorrowId : todayId;
    
    const newAcc = { ...acc };
    newAcc[dateId] = parseInt(beginShift.exec(input.message)[1]);
    return newAcc;
  }, {});
}

const convertToDays = (sortedInput, shifts ) => {
  const sleep = /falls asleep/i;
  const wake = /wakes up/i;

  const converted = sortedInput.reduce((acc, input) => {
    if (!!!sleep.test(input.message) && !!!wake.test(input.message)) return acc;
    const dateId = `${input.year}${input.month}${input.day}`;
    const guard = (shifts[dateId]) ? shifts[dateId] : shifts[`${input.year}${input.month}${input.day-1}`];
    
    if (guard === undefined) {
      console.log(dateId);
    }

    const today = (!!!acc[dateId]) ? { guard, prev: 0 } : { ...acc[dateId] };

    if (sleep.test(input.message)) {
      today[input.minute] = 0;
      for (let i = today.prev; i < input.minute; i++) {
        today[i] = 1;
      }
      today.prev = input.minute;
      const newAcc =  { ...acc };
      newAcc[dateId] = today;
      return newAcc;
    } else if (wake.test(input.message)) {
      today[input.minute] = 1;
      for (let i = today.prev; i < input.minute; i++) {
        today[i] = 0;
      }
      today.prev = input.minute;
      const newAcc =  { ...acc };
      newAcc[dateId] = today;
      return newAcc;
    } else {
      return acc;
    }
  }, {});
  const entries = Object.entries(converted);

  return entries.map(day => day[1])
    .map(day => {
      if (day.prev === 59) return day;
      const newDay = { ...day };
      for (let i = day.prev; i < 60; i++) {
        newDay[i] = day[day.prev];
      }
      return newDay
    })
    .map(day => {
      const { prev, ... noPrev } = day;
      return noPrev;
    });
}

const guardStats = days => {
  return days.reduce((guards, day) => {
    const guard = (!!!guards[day.guard]) ? { minutes: 0 } : guards[day.guard];

    for (let i = 0; i < 60; i++) {
      if (!day[i]) {
        guard[i] = !!guard[i] ? guard[i] + 1 : 1;
        guard.minutes = guard.minutes + 1;
      }
    }

    const newGuards = { ...guards };
    newGuards[day.guard] = guard;
    return newGuards;
  }, {});
};

const worstGuard = guards => {
  return Object.entries(guards).reduce((worst, guard) => {
    if (worst === null) return guard[0];
    if (guards[worst].minutes < guard[1].minutes) return guard[0];
    return worst;
  }, null);
};

const worstMinute = (guards, guard) => {
  return Object.entries(guards)
    .filter(entry => entry[0] === guard)
    .map(entry => entry[1])
    .map(entry => {
      const { minutes, ...noMinutes} = entry;
      return noMinutes;
    })
    .map(minutes => Object.entries(minutes))[0]
    .reduce((worst, minute) => {
      if (worst === null) return minute;
      if (minute[1] > worst[1]) return minute;
      return worst;
    }, null);
}

module.exports = partOne;
