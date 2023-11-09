import SceneKeys from "../constants/SceneKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader });
  }
  preload() {
    // 게임에 필요한 에셋 preload
    // 배경
    this.load.image("bg1", "assets/background/bg1.png");
    this.load.image("bg2", "assets/background/bg2.png");
    this.load.image("bg3", "assets/background/bg3.png");
    // 벽
    this.load.image("move1", "assets/map/move1x1.png");
    this.load.image("move4", "assets/map/move4x1.png");
    this.load.image("move6", "assets/map/move6x1.png");

    // 포이
    this.load.atlas(
      "player",
      "assets/player/poy.png",
      "assets/player/poy.json"
    );

    // tile
    this.load.image("tiles", "assets/map/tile.png");

    console.log("preloader preload");
  }
  create() {
    // preload가 모두 끝나면 게임 실행
    this.game.scene.start(SceneKeys.Game);
  }
}
