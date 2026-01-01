import {
  addYears,
  addMonths,
  addWeeks,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
} from "date-fns";

export function datesBetween(startDate, endDate, interval = "day") {
  let start;
  if (startDate instanceof Date) {
    start = startDate;
  } else {
    start = new Date(startDate);
  }

  let end;
  if (endDate instanceof Date) {
    end = endDate;
  } else {
    end = new Date(endDate);
  }

  if (start.getTime() > end.getTime()) {
    const tmp = start;
    start = end;
    end = tmp;
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

  while (current.getTime() <= end.getTime()) {
    out.push(current);
    current = addFn(current);
  }

  const last = out[out.length - 1];
  if (!last || last.getTime() !== end.getTime()) {
    out.push(end);
  }

  return out;
}
