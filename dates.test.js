import { describe, it, expect } from "vitest";

import { datesBetween } from "./datesBetween.js";
import { dateInfo } from "./dateInfo.js";
import { dateRange } from "./dateRange.js";

const isoDate = (d) => d.toISOString().slice(0, 10);

describe("datesBetween", () => {
  it("week: returns weekly points and always includes the end date", () => {
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

  it("default interval is day", () => {
    const arr = datesBetween(
      "2025-01-01T00:00:00.000Z",
      "2025-01-03T00:00:00.000Z"
    );
    expect(arr.map(isoDate)).toEqual(["2025-01-01", "2025-01-02", "2025-01-03"]);
  });

  it("halfDay: returns every 12 hours and adds end if it doesn't land exactly", () => {
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

  it("throws an error for an invalid interval", () => {
    expect(() =>
      datesBetween("2025-01-01T00:00:00.000Z", "2025-01-02T00:00:00.000Z", "bad")
    ).toThrow();
  });
});

describe("dateInfo", () => {
  it("returns expected fields", () => {
    const info = dateInfo("2025-12-22T14:30:45.123Z");
    expect(info.year).toBe(2025);
    expect(info.month).toBe(12);
    expect(info.day).toBe(22);
    expect(info.hour).toBe(14);
    expect(info.minute).toBe(30);
    expect(info.second).toBe(45);
    expect(info.millisecond).toBe(123);
  });

  it("throws an error for an invalid date", () => {
    expect(() => dateInfo("not-a-date")).toThrow();
  });
});

describe("dateRange", () => {
  it("formats a date range (ISO input)", () => {
    expect(dateRange("2012-11-11", "2010-12-12")).toBe("11/11/2012-12/12/2010");
  });

  it("formats a date range (comma-separated input)", () => {
    expect(dateRange("2012,11,11", "2010,12,12")).toBe("11/11/2012-12/12/2010");
  });
});
