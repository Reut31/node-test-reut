import {
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  getDayOfYear,
  getQuarter,
  getDaysInMonth,
  getISOWeek,
  format,
  isValid,
} from "date-fns";

export function dateInfo(date) {
  const d = new Date(date);

  if (!isValid(d)) {
    throw new Error("Invalid date input");
  }

  return {
    year: getYear(d),
    month: getMonth(d) + 1,
    monthText: format(d, "LLLL"),
    day: getDate(d),
    dayOfWeekText: format(d, "EEEE"),
    hour: getHours(d),
    minute: getMinutes(d),
    second: getSeconds(d),
    millisecond: getMilliseconds(d),
    iso: d.toISOString(),
    weekOfYear: getISOWeek(d),
    dayOfYear: getDayOfYear(d),
    quarter: getQuarter(d),
    isWeekend: d.getDay() >= 4,
    daysInMonth: getDaysInMonth(d),
    timestamp: d.getTime(),
  };
}
