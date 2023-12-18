export default class SecondScene extends Phaser.Scene {
  constructor() {
    super({ key: "second" });
    console.log("cons! s");
  }
  init() {
    console.log("init s");
  }
  preload() {
    console.log("preload s");
  }
  create() {
    console.log("create! s");
  }
  update(time: number, delta: number): void {
    console.log("update s");
  }
}
