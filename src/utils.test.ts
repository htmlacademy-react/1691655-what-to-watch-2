import { formatTime } from "./utils"

describe('Function: formatTime', () => {
    it('should return proper time string when seconds is correct', () => {
        const seconds = Math.floor(Math.random() * 10800);
        const leftTimeRegExpr = /^([0][0-9]\:)?[0-5][0-9]\:[0-5][0-9]$/;

        console.log('seconds is: ', seconds);

        const result = leftTimeRegExpr.test(formatTime(seconds));

        expect(result).toBe(true);
    })
})