export class Background extends Phaser.GameObjects.Group {
  bg1: Phaser.GameObjects.TileSprite;
  bg2: Phaser.GameObjects.TileSprite;
  bg3: Phaser.GameObjects.TileSprite;
  constructor(public scene: Phaser.Scene) {
    super(scene);
    const x = this.scene.cameras.main.centerX;
    const y = this.scene.cameras.main.height;

    this.bg1 = scene.add
      .tileSprite(0, 0, 0, 0, "bg1")
      .setScrollFactor(0)
      .setOrigin(0.5, 1)
      .setX(x)
      .setY(y)
      .setW(scene.game.canvas.width);

    this.bg2 = scene.add
      .tileSprite(0, 0, 0, 0, "bg2")
      .setScrollFactor(0)
      .setOrigin(0.5, 1)
      .setX(x)
      .setY(y)
      .setW(scene.game.canvas.width);

    this.bg3 = scene.add
      .tileSprite(0, 0, 0, 0, "bg3")
      .setScrollFactor(0)
      .setOrigin(0.5, 1)
      .setX(x)
      .setY(y)
      .setW(scene.game.canvas.width);
    this.addMultiple([this.bg1, this.bg2, this.bg3]);
  }
  update() {
    this.bg1.tilePositionX = this.scene.cameras.main.worldView.x * 0.2;
    this.bg2.tilePositionX = this.scene.cameras.main.worldView.x * 0.4;
    this.bg3.tilePositionX = this.scene.cameras.main.worldView.x * 0.6;

    // this.bg1.tilePositionY = this.scene.cameras.main.worldView.y * 0.2;
    // this.bg2.tilePositionY = this.scene.cameras.main.worldView.y * 0.2;
    // this.bg3.tilePositionY = this.scene.cameras.main.worldView.y * 0.2;
  }
}
