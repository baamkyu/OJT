// TimerComponent.ts

export default class TimerComponent {
  scene: Phaser.Scene;
  timeInMinutes: number = 0;
  timeInSeconds: number = 0;
  timeText: any = "00:00";
  timer!: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create() {
    this.timeText = this.scene.add.text(100, 100, "00:00", {
      fontSize: "32px",
      color: "#000000",
    });

    // 타이머 이벤트
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  updateTimer() {
    this.timeInSeconds++;

    var minutes = Math.floor(this.timeInSeconds / 60);
    var seconds = this.timeInSeconds - minutes * 60;

    var timeString = this.addZeros(minutes) + ":" + this.addZeros(seconds);

    this.timeText.text = timeString;
  }

  addZeros(num: any) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  }

  update() {
    this.timeText.x =
      this.scene.cameras.main.scrollX + this.scene.cameras.main.width / 2;
    this.timeText.y = this.scene.cameras.main.scrollY + 50;
  }
}
