import { GamePage } from './GamePage.js';
import { Robot } from './Robot.js';
import { topics } from './TopicData.js';
import { playSound } from './PlaySound.js';

export class HomePage {
  constructor() {
    this.app = document.getElementById('app');
  }

  create() {
    this.app.innerHTML = `
      <div class="home-page">
        <div class="home-page-menu">
          <label for="topic-selection">Select a topic</label>
          <select id="topic-selection"></select>
          <button id="start-button">START</button>
        </div>
      </div>
    `;

    const container = document.querySelector('.home-page');
    const startButton = document.getElementById('start-button');
    this.topicSelection = document.getElementById('topic-selection');
    const robot = new Robot(container);

    robot.create();
    robot.talk('startInstruction', false, 3000);
    this.populateTopics();

    // start game page
    startButton.addEventListener('click', () => {
      playSound('bgSound', 1, true);
      const gamePage = new GamePage(this.topicSelection.value);
      gamePage.create();
    });
  }

  populateTopics() {
    Object.keys(topics).forEach(topic => {
      const optionElement = document.createElement('option');
      optionElement.value = topic;
      optionElement.textContent = topic;

      this.topicSelection.appendChild(optionElement);
    })
  }

}


