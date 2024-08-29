import { MAX_FILM_LENTH } from '../const';
import { formatTime } from './utils';

describe('Function: formatTime', () => {
  it('should return "true" when output format is correct', () => {
    const seconds = Math.floor(Math.random() * MAX_FILM_LENTH);
    const leftTimeRegExpr = /^([0][0-9]:)?[0-5][0-9]:[0-5][0-9]$/;
    const result = leftTimeRegExpr.test(formatTime(seconds));

    expect(result).toBe(true);
  });
});
