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
    //make a text field

    this.timeText = this.scene.add.text(100, 600, "00:00", {
      fontSize: "32px",
      color: "#000000",
    });

    // 타이머 이벤트를 설정
    this.timer = this.scene.time.addEvent({
      delay: 1000, // 1초마다 호출
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
    console.log("timer create");
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

  // 다른 타이머 관련 메서드를 추가할 수 있습니다.
}
