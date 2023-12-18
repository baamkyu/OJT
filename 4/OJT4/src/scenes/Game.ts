import { Background } from "../components/Background";
import Minimap from "../components/Minimap";
import Player from "../components/Player";
import SceneKeys from "../constants/SceneKeys";
import { ItemList } from "../components/Item";
import TimerComponent from "../components/Timer";
import { Portal, FinishPortal } from "../components/MapElement";
// import { GameObjects, Physics, Types } from "phaser";

export default class GameScene extends Phaser.Scene {
  player!: Player;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  minimap!: Minimap;
  background!: Background;
  platformsLayer!: Phaser.Tilemaps.TilemapLayer;
  itemList!: ItemList;
  timer!: TimerComponent;
  timerText!: Phaser.GameObjects.Text;
  blackholeSpot!: Portal;
  startSpot!: Portal;
  finishPortal!: FinishPortal;
  // gameNPC!: GameNPC;

  superjumpNum: number = 0;
  shieldNum: number = 0;
  dashNum: number = 0;
  constructor() {
    super({ key: SceneKeys.Game });
  }

  preload() {}

  create() {
    // make map, background
    // const width: number = this.game.canvas.width;
    // const height: number = this.game.canvas.height;

    this.background = new Background(this);

    const map = this.make.tilemap({
      key: "gameMap",
      tileWidth: 16,
      tileHeight: 16,
    });

    // make item list
    this.itemList = new ItemList(this);

    // make item
    let items = this.physics.add.group();
    let superjump1: Phaser.GameObjects.GameObject = items.create(
      2500,
      1200,
      "superjump"
    );

    let superjump2: Phaser.GameObjects.GameObject = items.create(
      1250,
      730,
      "superjump"
    );
    // let superjump3: Phaser.GameObjects.GameObject = items.create(
    //   210,
    //   910,
    //   "superjump"
    // );
    let dash1: Phaser.GameObjects.GameObject = items.create(1655, 520, "dash");
    let dash2: Phaser.GameObjects.GameObject = items.create(580, 1180, "dash");

    items.children.iterate(function (child: any): boolean | null {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
      return true;
    });

    console.log(superjump1, superjump2, dash1, dash2);
    // player
    this.player = new Player(this, 100, 1100, "player", "stand1");
    this.player.setScale(0.5);
    this.player.body?.setSize(50, 130);

    // portal
    this.blackholeSpot = new Portal(this, 2520, 1380, "blackhole");
    (this.blackholeSpot.body as Phaser.Physics.Arcade.Body).setAllowGravity(
      false
    );
    this.physics.add.overlap(this.player, this.blackholeSpot, () => {
      this.resetPlayerPosition(2200, 1200, true);
      const blackholeAudio = this.sound.add("blackhole");
      blackholeAudio.play();
    });

    this.startSpot = new Portal(this, 240, 1180, "startspot");
    (this.startSpot.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.physics.add.overlap(this.player, this.startSpot, () =>
      this.resetPlayerPosition(350, 1150, false)
    );

    // finish portal
    this.finishPortal = new FinishPortal(this, 50, 350, "finishPortal");
    (this.finishPortal.body as Phaser.Physics.Arcade.Body).setAllowGravity(
      false
    );

    this.physics.add.overlap(this.player, this.finishPortal, () =>
      // this.resetPlayerPosition(200, 150, false)
      {
        this.timer.stopTimer();
        this.game.scene.start("Ending");

        audio.stop();
      }
    );

    // 카메라 설정
    this.cameras.main.setBounds(0, 0, 2560, 1440); // 전체 맵 크기를 설정
    this.cameras.main.startFollow(this.player, true); // 카메라가 플레이어를 따라다니도록 설정
    this.physics.world.setBounds(0, 0, 2560, 1440);

    // platform 불러오기
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
    this.physics.add.collider(platformGroup, this.blackholeSpot);
    this.physics.add.collider(platformGroup, this.startSpot);
    // this.physics.add.collider(platformGroup, this.gameNPC);
    this.physics.add.collider(platformGroup, this.finishPortal);

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

    // make timer
    this.timer = new TimerComponent(this);
    this.timer.create();

    // bgm
    const audio = this.sound.add("bgm");
    audio.play();
    audio.setLoop(true);
  }
  resetPlayerPosition = (x: number, y: number, shake: boolean) => {
    this.player.setX(x);
    this.player.setY(y);

    if (shake) {
      this.cameras.main.shake(200, 0.05);
    }
  };

  // 아이템 관리 함수
  collectItem(_: any, item: any) {
    if (!item.active) return;
    item.setActive(false);
    item.setVisible(false);
    if (item.texture.key === "shield") {
      const getItem = this.sound.add("getItem");
      getItem.play();
      this.shieldNum += 1;
      return;
    }
    if (item.texture.key === "dash") {
      const getItem = this.sound.add("getItem");

      getItem.play();

      this.dashNum += 1;
    } else if (item.texture.key === "superjump") {
      const getItem = this.sound.add("getItem");
      getItem.play();
      this.superjumpNum += 1;
    }

    setTimeout(() => {
      item.setActive(true);
      item.setVisible(true);
    }, 5000);
  }

  update() {
    // console.log("game update");
    this.player.update(this.cursors);
    this.minimap.update(this.player);
    this.itemList.update(this.shieldNum, this.superjumpNum, this.dashNum);
    this.timer.update();
  }
}
