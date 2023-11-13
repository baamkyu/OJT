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

  superjumpNum: number = 1000;
  shieldNum: number = 100;
  dashNum: number = 1000;
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

    // make item
    this.itemList = new ItemList(this);

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
      128,
      1100,
      "player",
      "stand1"
      // this.shieldNum,
      // this.superjumpNum,
      // this.dashNum
    );
    this.player.body?.setSize(50, 50);

    // 카메라 설정
    this.cameras.main.setBounds(0, 0, 2560, 1440); // 전체 맵 크기를 설정
    this.cameras.main.startFollow(this.player, true); // 카메라가 플레이어를 따라다니도록 설정
    this.physics.world.setBounds(0, 0, 2560, 1440);

    // platform 불러오기
    ///@ts-ignore
    const tileset = map.addTilesetImage("tile", "tile");
    ///@ts-ignore
    const platformsLayer = map.createLayer("tileset", tileset, 0, 0);
    this.platformsLayer = platformsLayer!;

    // make platform
    // const platformGroup = this.physics.add.staticGroup();

    // const isBlockedAllDirections = this.platformsLayer
    //   .filterTiles(
    //     (tile: Phaser.Tilemaps.Tile) => tile.properties.isBlockedAllDirections
    //   )
    //   .map((tile: Phaser.Tilemaps.Tile) => {
    //     return this.add
    //       .rectangle(tile.x * 16, tile.y * 16, 16, 16)
    //       .setOrigin(0);
    //   });

    // isBlockedAllDirections.forEach((el) => {
    //   console.log(el);
    // });
    // const isTopBlocked = this.platformsLayer
    //   .filterTiles((tile: Phaser.Tilemaps.Tile) => tile.properties.isTopBlocked)
    //   .map((tile: Phaser.Tilemaps.Tile) => {
    //     const body: any = this.add
    //       .rectangle(tile.x * 16, tile.y * 16, 16, 16)
    //       .setOrigin(0);

    //     body.body.checkCollision.down = false;
    //     body.body.checkCollision.left = false;
    //     body.body.checkCollision.right = false;

    //     return body;
    //   });

    // const tileBodies = isBlockedAllDirections.concat(isTopBlocked);

    // console.log(tileBodies);

    // platformGroup.addMultiple(tileBodies);
    // this.physics.add.collider(platformGroup, this.player);

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
    // this.physics.add.collider(items, platformGroup);
    // this.physics.add.collider(dash, platformGroup);
    // this.physics.add.collider(superjump, platformGroup);

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
    this.itemList.update(this.shieldNum, 1000, 1000);

    // console.log(this.shieldNum, this.superjumpNum, this.dashNum);
    // console.log(this.player.x);
    // this.background.update();
  }
}
