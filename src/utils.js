import { MissionUtils } from "@woowacourse/mission-utils";

export const makeRandomNumber = () => {
  const number = MissionUtils.Random.pickNumberInRange(1, 9);
  return number;
};

export const makeRandomNumbers = () => {
  const numbers = [];
  while (numbers.length < 3) {
    const number = makeRandomNumber();
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  return numbers;
};

export const printScoreMessage = (score) => {
  const { strike, ball } = score;
  if (strike === 0 && ball === 0) {
    MissionUtils.Console.print("낫싱");
  } else {
    const message = [];
    if (strike > 0) {
      message.push(`${strike}스트라이크`);
    }
    if (ball > 0) {
      message.push(`${ball}볼`);
    }
    MissionUtils.Console.print(message.join(" "));
  }
};
