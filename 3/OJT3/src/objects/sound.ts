import gunshot from "../sound/gunshot.mp3";
import gunshot2 from "../sound/gunshot2.mp3";
import getMoney from "../sound/money.mp3";
import auch from "../sound/auch.mp3";
import endGameAudio from "../sound/endGame.mp3";

export default class Sound {
  shotAudio: HTMLAudioElement;
  hitAudio: HTMLAudioElement;
  getMoneyAudio: HTMLAudioElement;
  endGameAudio: HTMLAudioElement;
  auchAudio: HTMLAudioElement;

  constructor() {
    this.shotAudio = new Audio();
    this.shotAudio.id = "shotAudio";
    this.shotAudio.src = gunshot;

    this.hitAudio = new Audio();
    this.hitAudio.id = "hitAudio";
    this.hitAudio.src = gunshot2;

    this.getMoneyAudio = new Audio();
    this.getMoneyAudio.id = "getMoneyAudio";
    this.getMoneyAudio.src = getMoney;

    this.endGameAudio = new Audio();
    this.endGameAudio.id = "endGameAudio";
    this.endGameAudio.src = endGameAudio;

    this.auchAudio = new Audio();
    this.auchAudio.id = "auchAudio";
    this.auchAudio.src = auch;
  }

  playSound(soundType: string) {
    switch (soundType) {
      case "shot":
        this.shotAudio.pause();
        this.shotAudio.currentTime = 0;

        this.shotAudio.play();

        break;
      case "hit":
        this.hitAudio.pause();
        this.hitAudio.currentTime = 0;

        this.hitAudio.play();
        break;
      case "auch":
        this.auchAudio.pause();
        this.auchAudio.currentTime = 0;

        this.auchAudio.play();
        break;
      case "getMoney":
        this.getMoneyAudio.pause();
        this.getMoneyAudio.currentTime = 0;

        this.getMoneyAudio.play();
        break;
      case "endGame":
        this.endGameAudio.pause();
        this.endGameAudio.currentTime = 0;

        this.endGameAudio.play();
        break;

      default:
        break;
    }
  }
}
