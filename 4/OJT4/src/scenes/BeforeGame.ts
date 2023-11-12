// BeforeGame.ts

export default class BeforeGame extends Phaser.Scene {
  constructor() {
    super({ key: "BeforeGame" });
  }

  preload() {
    // 로딩할 이미지 또는 리소스가 있다면 여기에서 preload
  }

  create() {
    // 버튼 생성
    const startButton = this.add
      .text(400, 300, "Start Game", {
        fontSize: "32px",
        color: "#fff",
        backgroundColor: "#000",
        padding: {
          x: 10,
          y: 5,
        },
      })
      .setOrigin(0.5)
      .setInteractive();

    // 버튼 클릭 이벤트 처리
    startButton.on("pointerdown", () => {
      // Start Game 버튼을 눌렀을 때 Game 씬으로 전환
      this.scene.start("Game");
    });
  }
}
