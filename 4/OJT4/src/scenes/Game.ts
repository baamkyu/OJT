import { Background } from "../components/Background";
import Minimap from "../components/Minimap";
import Player from "../components/Player";
import SceneKeys from "../constants/SceneKeys";

export default class GameScene extends Phaser.Scene {
  player!: Player;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  minimap!: Minimap;
  background!: Background;
  platformsLayer!: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super({ key: SceneKeys.Game });
  }

  preload() {
    this.load.image("tiles", "assets/map/tile.png");
    this.load.tilemapTiledJSON("map", "assets/map/tileset.json");
  }

  create() {
    // const width: number = this.game.canvas.width;
    // const height: number = this.game.canvas.height;

    // make map, background
    this.background = new Background(this);
    // console.log(width, height);

    // make item
    this.add.image(400, 300, "shield");
    this.add.image(400, 300, "dash");
    this.add.image(400, 300, "superjump");

    const map = this.make.tilemap({
      key: "map",
      tileWidth: 16,
      tileHeight: 16,
    });

    // player
    this.player = new Player(this, 128, 1100, "player", "stand1");
    this.player.body?.setSize(100, 150);

    // 카메라 설정
    this.cameras.main.setBounds(0, 0, 2560, 1440); // 전체 맵 크기를 설정
    this.cameras.main.startFollow(this.player, true); // 카메라가 플레이어를 따라다니도록 설정
    this.physics.world.setBounds(0, 0, 2560, 1440);

    // this.minimap.camera.ignore(this.background);

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
      .filterTiles((tile) => tile.properties.colpoint)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 16, tile.y * 16 + 8, 16, 80)
          .setOrigin(0);
      });

    platformGroup.addMultiple(tileBodies);
    tileBodies.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = false;
      ///@ts-ignore
      el.body.checkCollision.left = false;
      ///@ts-ignore
      el.body.checkCollision.right = false;
    });

    this.physics.add.collider(platformGroup, this.player);

    // 미니맵
    this.minimap = new Minimap(
      this,
      20,
      40,
      map.widthInPixels,
      map.heightInPixels,
      map
    );
    this.minimap.camera.ignore(this.background); // 미니맵 배경 제거

    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    this.player.update(this.cursors);
    this.minimap.update(this.player);
    // console.log(this.player.x);
    // this.background.update();
  }
}
