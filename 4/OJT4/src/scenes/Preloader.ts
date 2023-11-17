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
      "assets/map/sprite/portal.png",
      "assets/map/sprite/portal.json"
    );

    // 게임전 NPC
    this.load.atlas(
      "gameNPC",
      "assets/map/sprite/gameNPC.png",
      "assets/map/sprite/gameNPC.json"
    );

    // NPC 채팅
    this.load.atlas(
      "npcChat",
      "assets/map/sprite/npcChat.png",
      "assets/map/sprite/npcChat.json"
    );

    // 종료 포탈
    this.load.atlas(
      "finishPortal",
      "assets/map/sprite/finishPortal.png",
      "assets/map/sprite/finishPortal.json"
    );

    // 아이템
    this.load.image("shield", "assets/item/shield.png");
    this.load.image("dash", "assets/item/dash.png");
    this.load.image("superjump", "assets/item/superjump.png");

    // tile
    this.load.image("tiles", "assets/map/tile.png");
    this.load.tilemapTiledJSON("entranceMap", "assets/map/entrancemap.json"); // 입장맵
    this.load.tilemapTiledJSON("gameMap", "assets/map/tileset.json"); // 게임맵

    // audio
    this.load.audio("bgm", "assets/sounds/adventure.mp3");
    this.load.audio("getItem", "assets/sounds/collect.mp3");
    this.load.audio("blackhole", "assets/sounds/error.mp3");
  }

  create() {
    // preload가 모두 끝나면 게임 실행
    this.game.scene.start(SceneKeys.BeforeGame);
  }
}
