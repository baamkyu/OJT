import { Background } from "../components/Background";

// import Minimap from "../components/Minimap";
import Player from "../components/Player";
import SceneKeys from "../constants/SceneKeys";

// import { makeTileLayer } from "../util";

export default class GameScene extends Phaser.Scene {
  player!: Player;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  // minimap!: Minimap;
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
    console.log("game.ts 실행");
    const width: number = this.game.canvas.width;
    const height: number = this.game.canvas.height;

    this.background = new Background(this);

    // 맵 그리기
    // const array = [
    //   [0, 1, 2],
    //   [0, 1, 2],
    //   [0, 1, 2],
    // ];
    // const map = this.make.tilemap({
    //   // key: "map",
    //   data: array,
    //   tileWidth: 70,
    //   tileHeight: 70,
    // });
    // map.addTilesetImage("tiles");
    // const layer = map.createLayer(0, "tiles", 0, 35);

    // 맵 그리기 JSON
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 4,
      tileHeight: 4,
    });
    // (인자1: name of tileset in Tiled, 인자2: key from preload)
    const tileset: any = map.addTilesetImage("tile", "tiles");
    const platformsLayer: any = map.createLayer("tiles", tileset, 0, 0);
    // console.log(layer);

    // const cactusLayer = map.createLayer("cactus", tileset, 0, 0);

    // 2번째 인자 -> platforms.png 가르키면 됨
    // 3, 4번째 인자 -> assetKey: string, layerId: string
    // const platformsLayer = makeTileLayer(map, "map", "tile", "tiles");
    // this.platformsLayer = platformsLayer!;

    const platformGroup = this.physics.add.staticGroup();
    const tileBodies = this.platformsLayer
      // @ts-ignore
      .filterTiles((tile?) => tile.properties.colpoint)
      .map((tile) => {
        return this.add
          .rectangle(
            tile.x * 128,
            tile.y * 128 + 128,
            128,
            tile.properties.height
          )
          .setOrigin(0, 1);
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

    // this.add
    //   .image(0, 0, "bg1")
    //   .setOrigin(0)
    //   .setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.player = new Player(this, 800, 500, "player", "stand");
    this.player.body?.setSize(100, 150);
    // this.minimap = new Minimap(this, 20, 80, width, height);

    this.cursors = this.input.keyboard!.createCursorKeys();

    console.log(width, height);

    // this.physics.add.collider(this.player, layer);
    // layer.setCollisionBetween;
  }

  update() {
    this.player.update(this.cursors);

    // this.background.update();
  }
}
