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
