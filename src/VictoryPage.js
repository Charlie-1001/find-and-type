import { GamePage } from './GamePage.js';
import { HomePage } from './HomePage.js';
import { playSound } from './PlaySound.js';
import { Robot } from './Robot.js';

export class VictoryPage {
  constructor(currentTopic) {
    this.app = document.getElementById('app');
    this.currentTopic = currentTopic;
  }

  create() {
    this.app.innerHTML = `
      <div class="victory-page">
        <button id="play-again-btn">
          <img src="${import.meta.env.BASE_URL}images/replay-btn.png" alt="play again button" />
        </button>
      </div>

      <button id="homeBtn">
        <img src="${import.meta.env.BASE_URL}images/home-btn.png" alt="home button image" />
      </button>
    `;

    const container = document.querySelector('.victory-page');
    const gamePage = new GamePage(this.currentTopic);
    const homePage = new HomePage;
    const robot = new Robot(container);

    robot.create();
    robot.talk('replayInstruction', false, 1000);

    const playAgainButton = document.getElementById('play-again-btn');

    document.getElementById('homeBtn').addEventListener('click', () => {
      homePage.create();
      playSound('bgSound', 1, true);
    });

    playAgainButton.addEventListener('click', () => {
      gamePage.create();
      playSound('bgSound', 1, true);
    })
  }
}