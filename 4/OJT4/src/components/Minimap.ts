export default class Minimap {
  camera: Phaser.Cameras.Scene2D.Camera;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    map: Phaser.Tilemaps.Tilemap
  ) {
    this.camera = scene.cameras
      .add(x, y, width / 10, height / 10)
      .setZoom(0.1)
      .setBackgroundColor(0x8171e0f9)
      .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      .setAlpha(0.9)
      .setName("minimap");
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    this.camera.scrollX = player.x;
    this.camera.scrollY = player.y;
  }
}
