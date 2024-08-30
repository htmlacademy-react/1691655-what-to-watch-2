import { SECONDS_IN_100_HOURS } from "../const";

export const formatTime = (seconds: number) => {
  if (seconds < 0 || seconds >= SECONDS_IN_100_HOURS ) {
    throw new Error('wrong input seconds');
  }
  if (seconds > 3599 && seconds < SECONDS_IN_100_HOURS) {
    return [seconds / 60 / 60, (seconds / 60) % 60, seconds % 60]
      .map((el) => Math.floor(el))
      .join(':')
      .replace(/\b(\d)\b/g, '0$1');
  }
  return [(seconds / 60) % 60, seconds % 60]
    .map((el) => Math.floor(el))
    .join(':')
    .replace(/\b(\d)\b/g, '0$1');
};

export const randomIntFromInterval = (a: number, b: number) =>
  Math.floor(Math.random() * Math.abs(a - b));
