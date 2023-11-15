import SceneKeys from "../constants/SceneKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeys.Preloader });
  }
  preload() {
    // 게임에 필요한 에셋 preload

    // 배경
    this.load.image("bg1", "assets/background/bg1.png");

    // 플레이어
    this.load.atlas(
      "player",
      "assets/player/poy.png",
      "assets/player/poy.json"
    );

    // 포탈
    this.load.atlas(
      "portal",
      "assets/map/portal.png",
      "assets/map/portal.json"
    );

    // 게임중 NPC
    this.load.atlas(
      "gameNPC",
      "assets/map/gameNPC.png",
      "assets/map/gameNPC.json"
    );

    // 종료 포탈
    this.load.atlas(
      "finishPortal",
      "assets/map/finishPortal.png",
      "assets/map/finishPortal.json"
    );

    // 아이템
    this.load.image("shield", "assets/item/shield.png");
    this.load.image("dash", "assets/item/dash.png");
    this.load.image("superjump", "assets/item/superjump.png");

    // tile
    this.load.image("tiles", "assets/map/tile.png");
  }
  create() {
    // preload가 모두 끝나면 게임 실행
    this.game.scene.start(SceneKeys.BeforeGame);
  }
}
