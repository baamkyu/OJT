import { Background } from "../components/Background";
import Minimap from "../components/Minimap";
import Player from "../components/Player";
import SceneKeys from "../constants/SceneKeys";
import { ItemList } from "../components/Item";
import TimerComponent from "../components/Timer";

export default class GameScene extends Phaser.Scene {
  player!: Player;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  minimap!: Minimap;
  background!: Background;
  platformsLayer!: Phaser.Tilemaps.TilemapLayer;
  itemList!: ItemList;
  timer!: TimerComponent;
  timerText!: Phaser.GameObjects.Text;

  superjumpNum: number = 0;
  shieldNum: number = 0;
  dashNum: number = 0;
  constructor() {
    super({ key: SceneKeys.Game });
  }

  preload() {
    this.load.image("tiles", "assets/map/tile.png");
    this.load.tilemapTiledJSON("map", "assets/map/tileset.json");
  }

  create() {
    const width: number = this.game.canvas.width;
    const height: number = this.game.canvas.height;

    // make map, background
    this.background = new Background(this);

    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    // make timer
    this.timer = new TimerComponent(this);
    this.timer.create();

    // make item list
    this.itemList = new ItemList(this);

    // make item
    let items = this.physics.add.group();
    let shield1: Phaser.GameObjects.GameObject = items.create(
      100,
      height - 500,
      "superjump"
    );
    let superjump1: Phaser.GameObjects.GameObject = items.create(
      300,
      height - 500,
      "superjump"
    );
    let dash1: Phaser.GameObjects.GameObject = items.create(
      500,
      height - 500,
      "dash"
    );

    items.children.iterate(function (child: any): boolean | null {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
      return true;
    });

    // player
    this.player = new Player(
      this,
      200,
      height - 500,
      "player",
      "stand1"
      // this.shieldNum,
      // this.superjumpNum,
      // this.dashNum
    );
    this.player.setScale(0.5);
    this.player.body?.setSize(50, 130);

    // 카메라 설정
    this.cameras.main.setBounds(0, 0, 2560, 1440); // 전체 맵 크기를 설정
    this.cameras.main.startFollow(this.player, true); // 카메라가 플레이어를 따라다니도록 설정
    this.physics.world.setBounds(0, 0, 2560, 1440);

    // platform 불러오기
    ///@ts-ignore
    const tileset = map.addTilesetImage("tile", "tiles");
    ///@ts-ignore
    const platformsLayer = map.createLayer("tileset", tileset, 0, 0);
    this.platformsLayer = platformsLayer!;

    // make platform
    const platformGroup = this.physics.add.staticGroup();
    const tileBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.block)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 16, tile.y * 16, 16, 16)
          .setOrigin(0);
      });

    const wallBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.wall)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 16, tile.y * 16, 16, 16)
          .setOrigin(0);
      });

    platformGroup.addMultiple(tileBodies);
    platformGroup.addMultiple(wallBodies);
    tileBodies.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = false;
      ///@ts-ignore
      el.body.checkCollision.left = false;
      ///@ts-ignore
      el.body.checkCollision.right = false;
    });

    wallBodies.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = true;
      ///@ts-ignore
      el.body.checkCollision.left = true;
      ///@ts-ignore
      el.body.checkCollision.right = true;
    });

    this.physics.add.collider(platformGroup, this.player);

    // make minimap
    this.minimap = new Minimap(
      this,
      20,
      40,
      map.widthInPixels,
      map.heightInPixels,
      map
    );
    this.minimap.camera.ignore(this.background); // 미니맵 배경 제거
    this.cursors = this.input.keyboard!.createCursorKeys(); // 키보드 감지

    // item 충돌
    this.physics.add.collider(items, platformGroup);

    this.physics.add.overlap(
      this.player,
      items,
      this.collectItem,
      undefined,
      this
    );
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  // 아이템 관리 함수
  collectItem(_: any, item: any) {
    if (item.active) {
      item.setActive(false);
      item.setVisible(false);
      if (item.texture.key === "shield") {
        this.shieldNum += 1;
      } else if (item.texture.key === "dash") {
        this.dashNum += 1;
      } else if (item.texture.key === "superjump") {
        this.superjumpNum += 1;
      }

      setTimeout(() => {
        item.setActive(true);
        item.setVisible(true);
      }, 1000);
    }
  }
  update() {
    this.player.update(this.cursors);
    this.minimap.update(this.player);
    this.itemList.update(this.shieldNum, this.superjumpNum, this.dashNum);
    this.timer.update();
  }
}
