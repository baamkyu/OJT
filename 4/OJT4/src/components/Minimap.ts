export default class Minimap {
  camera: Phaser.Cameras.Scene2D.Camera;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.camera = scene.cameras
      .add(x, y, width / 10, height / 10)
      .setZoom(0.1)
      .setBackgroundColor(0x81bdd2ee)
      .setBounds(0, 0, width / 2, height / 2)
      .setAlpha(1)
      .setName("minimap");
  }

  //   update(player: Phaser.Physics.Arcade.Sprite) {
  //     this.camera.scrollX = player.x;
  //     this.camera.scrollY = player.y;
  //   }
}
