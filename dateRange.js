import { format, isValid } from "date-fns";

function toDate(input) {
  if (input instanceof Date) return input;

  const s = String(input).trim();

  const m = s.match(/^(\d{4}),(\d{1,2}),(\d{1,2})$/);
  if (m) {
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]); 
    return new Date(Date.UTC(year, month - 1, day));
  }

  return new Date(s);
}

export function dateRange(dateA, dateB) {
  const a = toDate(dateA);
  const b = toDate(dateB);

  if (!isValid(a) || !isValid(b)) {
    throw new Error("Invalid date input");
  }

  return `${format(a, "dd/MM/yyyy")}-${format(b, "dd/MM/yyyy")}`;
}
