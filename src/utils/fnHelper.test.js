import { expect, test } from 'vitest'
import { isDate } from "./fnHelper";

test('Valid date string ("2023-12-4 15:30") should return true', () => {
  const result = isDate('2023-12-4 15:30');
  expect(result).toBe(true);
});

test('Valid date with leading zeros ("2023-1-5 8:9") should return true', () => {
  const result = isDate('2023-1-5 8:9');
  expect(result).toBe(true);
});

test('Normal string ("hello world") with should return false', () => {
  const result = isDate('hello world');
  expect(result).toBe(false);
});

test('Normal number (5566) with should return false', () => {
  const result = isDate(5566);
  expect(result).toBe(false);
});

test('Invalid date string should return false', () => {
  const result = isDate('invalid-date');
  expect(result).toBe(false);
});

test('Empty string should return false', () => {
  const result = isDate('');
  expect(result).toBe(false);
});

test('Null value should return false', () => {
  const result = isDate(null);
  expect(result).toBe(false);
});

test('Undefined value should return false', () => {
  const result = isDate(undefined);
  expect(result).toBe(false);
});

test('Valid date with seconds ("2023-12-04 15:30:45") should return false (format mismatch)', () => {
  const result = isDate('2023-12-04 15:30:45');
  expect(result).toBe(false);
});

test('Array (["2023-12-4 15:30","123"]) should return false', () => {
  const result = isDate(["2023-12-4 15:30", "123"]);
  expect(result).toBe(false);
});

test('Object ({first: "2023-12-4 15:30",second: "123"}) should return false', () => {
  const result = isDate({ first: "2023-12-4 15:30", second: "123" });
  expect(result).toBe(false);
});