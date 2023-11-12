// TimerComponent.ts

export default class TimerComponent {
  private scene: Phaser.Scene;
  private timer: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  startTimer(callback: (elapsedTime: number) => void) {
    this.timer = this.scene.time.addEvent({
      delay: 1000, // 1초 간격
      callback: () => {
        callback(this.timer.getElapsedSeconds());
      },
      callbackScope: this,
      loop: true, // 타이머를 반복 실행
    });
  }

  stopTimer() {
    if (this.timer) {
      this.timer.remove();
    }
  }

  // 다른 타이머 관련 메서드를 추가할 수 있습니다.
}
