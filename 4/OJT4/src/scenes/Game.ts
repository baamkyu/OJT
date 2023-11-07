import { Background } from "../components/Background";

import Minimap from "../components/Minimap";
import Player from "../components/Player";
import SceneKeys from "../constants/SceneKeys";

export default class GameScene extends Phaser.Scene {
  player!: Player;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  minimap!: Minimap;
  background!: Background;

  constructor() {
    super({ key: SceneKeys.Game });
  }

  create() {
    const width: number = this.game.canvas.width;
    const height: number = this.game.canvas.height;

    this.background = new Background(this);
    this.add
      .image(0, 0, "bg1")
      .setOrigin(0)
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    this.player = new Player(this, 800, 500, "poy", "stand");
    this.minimap = new Minimap(this, 20, 80, width, height);

    console.log(width, height);
  }

  update() {
    // this.background.update();
  }
}
