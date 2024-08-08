export const formatTime = (seconds: number) => {
  if (seconds > 3601) {
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
