import { topics } from './TopicData.js';
import { VictoryPage } from './VictoryPage.js';
import { Robot} from './Robot.js';
import { HomePage } from './HomePage.js';
import { playSound, stopSound } from './PlaySound.js';

export class GamePage {
  constructor(topic) {
    this.colors = [
      'var(--yellow)', 'var(--coral)', 'var(--sky-blue)', 'var(--green)',
      'var(--purple)', 'var(--orange)', 'var(--teal)', 'var(--pink)', 'var(--pink)'
    ];
    this.topic = topic;
    this.app = document.getElementById('app');
    this.currentLetterIndex = 0;
    this.currentColorIndex = 0;
    this.colorIndexDirection = 1;
    this.selectedTopic = null;
  }

  create() {
    this.app.innerHTML = `
    <div class="game-page">
      <div class="letter-container"></div>
    </div>
    <button id="homeBtn">
      <img src="${import.meta.env.BASE_URL}images/home-btn.png" alt="home button image" />
    </button>
    `;

    this.letterContainer = document.querySelector('.letter-container');
    this.selectedTopic = topics[this.topic];

    this.selectedTopic.forEach(letter => {
      const letterElement = document.createElement('div');
      letterElement.classList.add('letter');
      letterElement.textContent = letter;
      this.letterContainer.appendChild(letterElement);
    });

    // select the first letter and highlight it
    this.letterList = this.letterContainer.children;
    const firstLetter = this.letterList[this.currentLetterIndex];
    firstLetter.classList.add('highlighted');

    const container = document.querySelector('.game-page');
    this.victoryPage = new VictoryPage(this.topic);
    const homePage = new HomePage;
    this.robot = new Robot(container);
    this.robot.create(container);
    this.robot.talk('findAndType', false, 2000);

    document.getElementById('homeBtn').addEventListener('click', () => {
      homePage.create();
      playSound('bgSound', 1, true);
    });

    this.keyboardEvent();
  };

  keyboardEvent() {
    this.handleKeydown = (event) => {
      const currentLetter = this.letterList[this.currentLetterIndex];
      const nextLetter = this.letterList[this.currentLetterIndex + 1];
      const typedLetter = event.key;

      if (typedLetter === currentLetter.textContent) {
        playSound('keyClick');

        currentLetter.style.backgroundColor = this.colors[this.currentColorIndex];
        currentLetter.style.color = 'black';
        this.currentColorIndex += this.colorIndexDirection;
        if (this.currentColorIndex === this.colors.length - 1 || this.currentColorIndex < 0) {
          this.colorIndexDirection *= -1;
          this.currentColorIndex += this.colorIndexDirection;
        }

        if (this.currentLetterIndex >= this.selectedTopic.length * (2/3)) {
          this.robot.talk('encourage', false);
        }

        if (this.currentLetterIndex === this.selectedTopic.length - 1) {
          this.currentLetterIndex = 0;
          this.currentColorIndex = 0;
          this.colorIndexDirection = 1;
          stopSound('bgm');
          playSound('victorySound');
          this.victoryPage.create();
          this.destroyKeydownListener();
          return;
        }

        this.currentLetterIndex++;

        const previousLetter = this.letterList[this.currentLetterIndex - 1];
        previousLetter && previousLetter.classList.remove('highlighted');
        nextLetter && nextLetter.classList.add('highlighted');

      } else if (typedLetter.toLowerCase() === currentLetter.textContent.toLowerCase()) {
        if (currentLetter.textContent === currentLetter.textContent.toUpperCase()) {
          this.robot.talk('turnOnCaps', true);
        } else {
          this.robot.talk('turnOffCaps', true);
        }
      }
    }

    document.addEventListener('keydown', this.handleKeydown);
  };

  destroyKeydownListener() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
}

