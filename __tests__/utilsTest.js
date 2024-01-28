import App from "../src/App.js";
import {
  makeRandomNumber,
  makeRandomNumbers,
  printScoreMessage,
} from "../src/utils.js";
import { getLogSpy } from "./ApplicationTest.js";

describe("random number unit test", () => {
  test("1~9 사이의 랜덤한 하나의 숫자를 만든다.", () => {
    const number = makeRandomNumber();

    expect(number).toBeGreaterThanOrEqual(1);
    expect(number).toBeLessThanOrEqual(9);

    expect(number).not.toBe(10);
    expect(number).not.toBe(0);
  });

  test("각자 다른 세자리 숫자를 만든다.", () => {
    const numbers = makeRandomNumbers();

    expect(numbers.length).toBe(3);
    expect(numbers[0]).not.toBe(numbers[1]);
    expect(numbers[0]).not.toBe(numbers[2]);
    expect(numbers[1]).not.toBe(numbers[2]);
  });
});

describe("check score unit test", () => {
  test("입력한 숫자에 대한 점수를 매긴다", () => {
    const app = new App();

    app.randomNumbers = [1, 2, 3];
    const userNumbers1 = [1, 2, 3];
    const userNumbers2 = [1, 3, 2];
    const userNumbers3 = [2, 3, 1];
    const userNumbers4 = [4, 5, 6];
    const userNumbers5 = [1, 4, 5];

    expect(app.checkScore(userNumbers1)).toEqual({
      strike: 3,
      ball: 0,
    });
    expect(app.checkScore(userNumbers2)).toEqual({
      strike: 1,
      ball: 2,
    });
    expect(app.checkScore(userNumbers3)).toEqual({
      strike: 0,
      ball: 3,
    });
    expect(app.checkScore(userNumbers4)).toEqual({
      strike: 0,
      ball: 0,
    });
    expect(app.checkScore(userNumbers5)).toEqual({
      strike: 1,
      ball: 0,
    });
  }),
    test("점수에 대한 메시지를 출력한다.", () => {
      const logSpy = getLogSpy();

      const score1 = { strike: 0, ball: 0 };
      const score2 = { strike: 1, ball: 0 };
      const score3 = { strike: 0, ball: 1 };
      const score4 = { strike: 2, ball: 1 };
      const score5 = { strike: 1, ball: 2 };
      const score6 = { strike: 3, ball: 0 };
      const score7 = { strike: 0, ball: 3 };

      printScoreMessage(score1);
      expect(logSpy).toHaveBeenCalledWith("낫싱");

      printScoreMessage(score2);
      expect(logSpy).toHaveBeenCalledWith("1스트라이크");

      printScoreMessage(score3);
      expect(logSpy).toHaveBeenCalledWith("1볼");

      printScoreMessage(score4);
      expect(logSpy).toHaveBeenCalledWith("2스트라이크 1볼");

      printScoreMessage(score5);
      expect(logSpy).toHaveBeenCalledWith("1스트라이크 2볼");

      printScoreMessage(score6);
      expect(logSpy).toHaveBeenCalledWith("3스트라이크");

      printScoreMessage(score7);
      expect(logSpy).toHaveBeenCalledWith("3볼");
    });
});
