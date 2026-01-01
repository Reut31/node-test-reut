import { describe, it, expect } from "vitest";
import { datesBetween } from "./dates.js";

const isoDate = (d) => d.toISOString().slice(0, 10);

describe("datesBetween", () => {
  it("week: מחזיר נקודות שבועיות ותמיד כולל end", () => {
    const arr = datesBetween(
      "2025-01-01T00:00:00.000Z",
      "2025-01-25T00:00:00.000Z",
      "week"
    );

    expect(arr.map(isoDate)).toEqual([
      "2025-01-01",
      "2025-01-08",
      "2025-01-15",
      "2025-01-22",
      "2025-01-25",
    ]);
  });

  it("ברירת מחדל interval=day", () => {
    const arr = datesBetween(
      "2025-01-01T00:00:00.000Z",
      "2025-01-03T00:00:00.000Z"
    );
    expect(arr.map(isoDate)).toEqual(["2025-01-01", "2025-01-02", "2025-01-03"]);
  });

  it("halfDay: כל 12 שעות ותמיד מוסיף end אם לא יצא בדיוק", () => {
    const arr = datesBetween(
      "2025-01-01T00:00:00.000Z",
      "2025-01-01T23:00:00.000Z",
      "halfDay"
    );

    expect(arr.map((d) => d.toISOString())).toEqual([
      "2025-01-01T00:00:00.000Z",
      "2025-01-01T12:00:00.000Z",
      "2025-01-01T23:00:00.000Z",
    ]);
  });

  it("זורק שגיאה על interval לא חוקי", () => {
    expect(() =>
      datesBetween("2025-01-01T00:00:00.000Z", "2025-01-02T00:00:00.000Z", "bad")
    ).toThrow();
  });
});
