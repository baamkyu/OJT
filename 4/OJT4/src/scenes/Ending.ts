import { Background } from "../components/Background";
import GameScene from "./Game";

export default class Ending extends Phaser.Scene {
  background!: Background;

  constructor() {
    super({ key: "Ending" });
  }

  init() {}

  create() {
    this.background = new Background(this);

    // 게임 중지
    const gameScene = this.game.scene.getScene("Game") as GameScene;
    gameScene.scene.stop();

    // 화면 크기
    const screenWidth = this.game.canvas.width;
    const screenHeight = this.game.canvas.height;

    // UI 배경 네모
    const backgroundRect = this.add.rectangle(
      screenWidth / 2,
      screenHeight / 2,
      600,
      400,
      0xffffff
    );
    backgroundRect.setAlpha(0.8);

    const gameoverText = this.add.text(
      screenWidth / 2 - 125,
      screenHeight / 2 - 150,
      "GAME OVER",
      {
        fontSize: "40px",
        color: "#000000",
        padding: {
          x: 10,
          y: 5,
        },
      }
    );

    // 텍스트 결과
    const resultText = this.add.text(
      screenWidth / 2 - 120,
      screenHeight / 2 - 70,
      `소요 시간: ${gameScene.timer.getCurrentTime()}`,
      {
        fontSize: "24px",
        color: "#000000",
        padding: {
          x: 10,
          y: 5,
        },
      }
    );

    // '다시하기' 버튼
    const restartButton = this.add.text(
      screenWidth / 2 + 70,
      screenHeight / 2 + 100,
      "다시하기",
      {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#56A2DB",
        padding: {
          x: 20,
          y: 10,
        },
      }
    );
    restartButton.setOrigin(0.5);
    restartButton.setInteractive();
    restartButton.on("pointerdown", () => {
      this.scene.stop();
      this.scene.start("Game");
    });

    // '확인' 버튼
    const confirmButton = this.add.text(
      screenWidth / 2 - 70,
      screenHeight / 2 + 100,
      "돌아가기",
      {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#56A2DB",
        padding: {
          x: 20,
          y: 10,
        },
      }
    );
    confirmButton.setOrigin(0.5);
    confirmButton.setInteractive();
    confirmButton.on("pointerdown", () => {
      this.scene.stop();
      this.scene.start("BeforeGame");
    });
  }
  update() {
    // console.log("ending update");
  }
}
