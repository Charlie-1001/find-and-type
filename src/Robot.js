export class Robot {
  constructor(container) {
    this.container = container;
    this.robotPhrases = {
      startInstruction: "\u{1F916}Choose a topic and click the <strong>START</strong> button to play.",
      findAndType: "\u{1F916}Now, find the letters on your keyboard\u{2328}\u{FE0F} and type them.",
      turnOnCaps: "\u{1F916}Please turn on the <strong>Caps Lock key</strong>.",
      turnOffCaps: "\u{1F916}Please turn off the <strong>Caps Lock key</strong>.",
      encourage: "Keep it up! Almost done!\u{2728}",
      replayInstruction: "Well done!\u{1F3C6}\u{1F389} Now click the <strong>Replay</strong> button to play again or <strong>Home</strong> button to go back to the home page.",
    };
    this.robotImg = ['/images/robot-1.png', '/images/robot-2.png'];
    this.currentIndex = 0;
    this.robotSpeechTimer = null;
  }

  // creating the robot
  create() {
    this.robotContainer = document.createElement('div');
    this.robotContainer.className = 'robot-container';
    this.robotSpeech = document.createElement('p');
    this.robotSpeech.className = 'robot-speech';
    this.robotImage = document.createElement('img');
    this.robotImage.id = 'robot';

    setInterval(() => {
      this.robotImage.src = this.robotImg[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.robotImg.length;
    }, 1000);

    this.robotContainer.appendChild(this.robotSpeech);
    this.robotContainer.appendChild(this.robotImage);
    this.container.appendChild(this.robotContainer);
  };

  // robot talking function
  talk(phrase, canDisappear = false, delay = 0) {
    this.robotSpeechTimer && clearTimeout(this.robotSpeechTimer);

    setTimeout(() => {
      this.robotSpeech.style.display = 'block';
      this.robotSpeech.innerHTML = this.robotPhrases[phrase];

      if (!canDisappear) return;

      this.robotSpeechTimer = setTimeout(() => {
        this.robotSpeech.style.display = 'none';
      }, 5000);
    }, delay);
  }

}
