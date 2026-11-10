import assert from "node:assert/strict";
import { test } from "node:test";
import { dailyWishes } from "../src/data/dailyWishes.ts";
import {
  claimWelcomeDate,
  DAILY_WELCOME_KEY,
  localDayKey,
  millisecondsUntilNextLocalDay,
  wishForDate,
} from "../src/lib/dailyWelcome.ts";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
}

test("at least 30 distinct, bilingual wishes are available", () => {
  assert.ok(dailyWishes.length >= 30);
  assert.equal(
    new Set(dailyWishes.map((wish) => wish.vi)).size,
    dailyWishes.length,
  );
  assert.ok(
    dailyWishes.every((wish) => wish.vi.length > 0 && wish.en.length > 0),
  );
});

test("day keys use local calendar fields at the beginning and end of the day", () => {
  assert.equal(localDayKey(new Date(2026, 0, 1, 0, 1)), "2026-01-01");
  assert.equal(localDayKey(new Date(2026, 0, 1, 23, 59)), "2026-01-01");
  assert.equal(localDayKey(new Date(2026, 10, 10)), "2026-11-10");
});

test("a day chooses a stable wish and adjacent calendar days do not repeat", () => {
  for (let i = 0; i < 800; i++) {
    const early = new Date(2024, 0, i + 1, 0, 1);
    const late = new Date(2024, 0, i + 1, 23, 59);
    const tomorrow = new Date(2024, 0, i + 2, 0, 1);
    assert.equal(wishForDate(early), wishForDate(late));
    assert.notEqual(wishForDate(early), wishForDate(tomorrow));
  }
});

test("first visit claims the date; reloads, tabs and routes cannot claim it again", () => {
  const storage = memoryStorage();
  assert.equal(claimWelcomeDate(storage, "2026-11-10"), true);
  for (let visit = 0; visit < 5; visit++)
    assert.equal(claimWelcomeDate(storage, "2026-11-10"), false);
  assert.equal(storage.getItem(DAILY_WELCOME_KEY), "2026-11-10");
  assert.equal(claimWelcomeDate(storage, "2026-11-11"), true);
  assert.equal(claimWelcomeDate(storage, "2026-11-11"), false);
});

test("unavailable, full or non-persistent storage never yields an untracked welcome", () => {
  const storage = memoryStorage();
  const denied = () => {
    throw new Error("Storage denied");
  };
  assert.equal(
    claimWelcomeDate({ ...storage, getItem: denied }, "2026-11-10"),
    false,
  );
  assert.equal(
    claimWelcomeDate({ ...storage, setItem: denied }, "2026-11-10"),
    false,
  );
  assert.equal(
    claimWelcomeDate({ ...storage, setItem: () => {} }, "2026-11-10"),
    false,
  );
});

test("next local midnight works across month, year, leap-day and DST boundaries", () => {
  for (const date of [
    new Date(2026, 11, 31, 23, 59, 59),
    new Date(2024, 1, 28, 12),
    new Date(2026, 2, 8, 0),
    new Date(2026, 10, 1, 0),
  ]) {
    const delay = millisecondsUntilNextLocalDay(date);
    assert.ok(delay > 0 && delay <= 25 * 3600000);
    const midnight = new Date(date.getTime() + delay);
    assert.equal(midnight.getHours(), 0);
    assert.equal(midnight.getMinutes(), 0);
    assert.notEqual(localDayKey(midnight), localDayKey(date));
  }
});
