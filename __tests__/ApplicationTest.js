import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { makeRandomNumber, makeRandomNumbers } from "../src/utils.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("숫자 야구 게임", () => {
  test("게임 종료 후 재시작", async () => {
    // given
    const randoms = [1, 3, 5, 5, 8, 9];
    const answers = ["246", "135", "1", "597", "589", "2"];
    const logSpy = getLogSpy();
    const messages = ["낫싱", "3스트라이크", "1볼 1스트라이크", "3스트라이크", "게임 종료"];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when
    const app = new App();
    await expect(app.play()).resolves.not.toThrow();

    // then
    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test("예외 테스트", async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ["1234"];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when & then
    const app = new App();

    await expect(app.play()).rejects.toThrow("[ERROR]");
  });
});

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

    expect(app.checkScore(userNumbers1)).toBe({
      strike: 3,
      ball: 0,
    });
    expect(app.checkScore(userNumbers2)).toBe({
      strike: 2,
      ball: 1,
    });
    expect(app.checkScore(userNumbers3)).toBe({
      strike: 0,
      ball: 3,
    });
    expect(app.checkScore(userNumbers4)).toBe({
      strike: 0,
      ball: 0,
    });
    expect(app.checkScore(userNumbers5)).toBe({
      strike: 1,
      ball: 0,
    });
  });
});
