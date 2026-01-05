import { format, isValid } from "date-fns";


export function dateRange(dateA, dateB) {
  const a = new Date(dateA);
  const b = new Date(dateB);

  if (!isValid(a) || !isValid(b)) {
    throw new Error("Invalid date input");
  }

  return `${format(a, "dd/MM/yyyy")}-${format(b, "dd/MM/yyyy")}`;
}
