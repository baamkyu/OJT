export class Background extends Phaser.GameObjects.Group {
  bg1: Phaser.GameObjects.TileSprite;
  // bg2: Phaser.GameObjects.TileSprite;
  // bg3: Phaser.GameObjects.TileSprite;
  constructor(public scene: Phaser.Scene) {
    super(scene);

    this.bg1 = scene.add
      .tileSprite(0, 0, 0, 0, "bg1")
      .setScrollFactor(0)
      .setOrigin(0)
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      );
    // this.bg2 = scene.add
    //   .tileSprite(0, 0, 0, 0, "bg2")
    //   .setScrollFactor(0)
    //   .setOrigin(0.5, 1)
    //   .setX(x)
    //   .setY(y)
    //   .setW(scene.game.canvas.width);

    // this.bg3 = scene.add
    //   .tileSprite(0, 0, 0, 0, "bg3")
    //   .setScrollFactor(0)
    //   .setOrigin(0.5, 1)
    //   .setX(x)
    //   .setY(y)
    //   .setW(scene.game.canvas.width);
    // this.addMultiple([this.bg1, this.bg2, this.bg3]);
    this.add(this.bg1);
  }
  update() {
    this.bg1.tilePositionX = this.scene.cameras.main.worldView.x * 0.2;
    // this.bg2.tilePositionX = this.scene.cameras.main.worldView.x * 0.4;
    // this.bg3.tilePositionX = this.scene.cameras.main.worldView.x * 0.6;
  }
}
