import { Console } from "@woowacourse/mission-utils";

class App {
  constructor() {
    this.randomNumbers = [];
  }
  async play() {}

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
