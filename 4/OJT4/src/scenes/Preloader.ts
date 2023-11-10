import SceneKeys from "../constants/SceneKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader });
  }
  preload() {
    // 게임에 필요한 에셋 preload

    // 배경
    this.load.image("bg1", "assets/background/bg1.png");

    // 포이
    this.load.atlas(
      "player",
      "assets/player/poy.png",
      "assets/player/poy.json"
    );

    // tile
    this.load.image("tiles", "assets/map/tile.png");
  }
  create() {
    // preload가 모두 끝나면 게임 실행
    this.game.scene.start(SceneKeys.Game);
  }
}
