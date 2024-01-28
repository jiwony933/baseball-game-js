import { MissionUtils } from "@woowacourse/mission-utils";
import { makeRandomNumbers, printScoreMessage } from "./utils.js";

class App {
  constructor() {
    this.isFirstGame = true;
    this.randomNumbers = [];
  }
  async play() {
    // this.randomNumbers = makeRandomNumbers();
    if (this.isFirstGame) {
      this.isFirstGame = false;
      MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
    }
    // await this.playGame();
  }

  async playGame() {
    MissionUtils.Console.print("숫자를 입력해주세요 : ");

    const input = await MissionUtils.Console.readLineAsync();
    const userNumbers = input.split("").map((str) => parseInt(str));

    const score = this.checkScore(userNumbers);
    printScoreMessage(score);

    if (score.strike === 3) {
      MissionUtils.Console.print(
        "3개의 숫자를 모두 맞히셨습니다! 게임 종료\n게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요."
      );
      const restart = await MissionUtils.Console.readLineAsync();
      if (restart === "1") {
        this.play();
        return;
      }
    }
  }

  checkScore(userNumbers) {
    const score = {
      strike: 0,
      ball: 0,
    };
    userNumbers.forEach((userNumber, index) => {
      if (this.randomNumbers.includes(userNumber)) {
        if (this.randomNumbers[index] === userNumber) {
          score.strike += 1;
        } else {
          score.ball += 1;
        }
      }
    });
    return score;
  }
}

export default App;

const app = new App();
app.play();
