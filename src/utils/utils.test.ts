import { formatTime } from './utils';

describe('Function: formatTime', () => {
  it('should return correct format when duration less than hour', () => {
    const secondsUnderHour = 3599;
    const expectedResult = '59:59';
    const result = formatTime(secondsUnderHour) === expectedResult;

    expect(result).toBe(true);
  });

  it('should return correct format when duration more than hour', () => {
    const secondsInrHour = 3600;
    const expectedResult = '01:00:00';

    const result = formatTime(secondsInrHour) === expectedResult;

    expect(result).toBe(true);
  });

  it('should return correct format when duration out of range', () => {
    const wrongSeconds = -1;


    expect(() => formatTime(wrongSeconds)).toThrow(new Error('wrong input seconds'));
  });
});
