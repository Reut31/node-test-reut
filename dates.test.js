import { describe, it, expect } from "vitest";

import { datesBetween } from "./datesBetween.js";
import { dateInfo } from "./dateInfo.js";
import { dateRange } from "./dateRange.js";

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

describe("dateInfo", () => {
  it("מחזיר שדות צפויים", () => {
    const info = dateInfo("2025-12-22T14:30:45.123Z");
    expect(info.year).toBe(2025);
    expect(info.month).toBe(12);
    expect(info.day).toBe(22);
    expect(info.hour).toBe(14);
    expect(info.minute).toBe(30);
    expect(info.second).toBe(45);
    expect(info.millisecond).toBe(123);
  });

  it("זורק שגיאה על תאריך לא תקין", () => {
    expect(() => dateInfo("not-a-date")).toThrow();
  });
});

describe("dateRange", () => {
  it("פורמט טווח תאריכים (ISO)", () => {
    expect(dateRange("2012-11-11", "2010-12-12")).toBe("11/11/2012-12/12/2010");
  });

  it("פורמט טווח תאריכים (עם פסיקים)", () => {
    expect(dateRange("2012,11,11", "2010,12,12")).toBe("11/11/2012-12/12/2010");
  });
});
