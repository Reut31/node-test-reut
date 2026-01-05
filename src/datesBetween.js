import {
  addYears,
  addMonths,
  addWeeks,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  isValid,
} from "date-fns";

export function datesBetween(startDate, endDate, interval = "day") {
  let start =new Date(startDate);
  let end =new Date(endDate);

  if (!isValid(start) || !isValid(end)) {
    throw new Error("Invalid startDate/endDate");
  }

  if (start.getTime() > end.getTime()) {
    throw new Error("start is bigger then end");
  }

  const addMap = {
    year: (d) => addYears(d, 1),
    month: (d) => addMonths(d, 1),
    week: (d) => addWeeks(d, 1),
    day: (d) => addDays(d, 1),
    halfDay: (d) => addHours(d, 12),
    hour: (d) => addHours(d, 1),
    minute: (d) => addMinutes(d, 1),
    second: (d) => addSeconds(d, 1),
  };

  const addFn = addMap[interval];
  if (!addFn) {
    throw new Error("interval לא חוקי");
  }

  const out = [];
  let current = start;

  while (current.getTime() < end.getTime()) {
    out.push(current);
    current = addFn(current);
  }
  out.push(end);
  
  return out;
}
