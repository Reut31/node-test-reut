import { getYear, getMonth, getDate, getHours, getMinutes, getSeconds, getMilliseconds, getDayOfYear, getQuarter, getDaysInMonth, getISOWeek, format,isValid,} from "date-fns";

export function dateInfo(dateA) {
  const d = dateA instanceof Date ? dateA : new Date(dateA);

  const dayOfWeekNumber = d.getDay();
  const isWeekend = dayOfWeekNumber >= 4;

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
    isWeekend,
    daysInMonth: getDaysInMonth(d),
    timestamp: d.getTime(),
  };
}
const info = dateInfo("2025-12-22T14:30:45.123");
