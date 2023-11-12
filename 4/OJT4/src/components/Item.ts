import GameScene from "../scenes/Game";

export class ItemList {
  scene: Phaser.Scene;
  itemSlots: Phaser.GameObjects.Container;
  shieldText: Phaser.GameObjects.Text;
  superjumpText: Phaser.GameObjects.Text;
  dashText: Phaser.GameObjects.Text;
  shieldImage: Phaser.GameObjects.Image;
  superjumpImage: Phaser.GameObjects.Image;
  dashImage: Phaser.GameObjects.Image;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.itemSlots = this.scene.add.container(0, 500);

    const textStyle = {
      fontSize: "24px",
      color: "#000000",
      fontFamily: "Arial, sans-serif",
    };

    this.shieldText = this.scene.add.text(10, 10, "", textStyle);
    this.superjumpText = this.scene.add.text(10, 10, "", textStyle);
    this.dashText = this.scene.add.text(10, 10, "", textStyle);

    this.shieldImage = this.scene.add.image(0, 0, "shield");
    this.superjumpImage = this.scene.add.image(0, 0, "superjump");
    this.dashImage = this.scene.add.image(0, 0, "dash");

    this.itemSlots.add(this.shieldImage);
    this.itemSlots.add(this.superjumpImage);
    this.itemSlots.add(this.dashImage);
    this.itemSlots.add(this.shieldText);
    this.itemSlots.add(this.superjumpText);
    this.itemSlots.add(this.dashText);
  }

  create() {}

  update(this: any, shieldNum: number, superjumpNum: number, dashNum: number) {
    this.shieldText.setText(`${shieldNum}`);
    this.superjumpText.setText(`${superjumpNum}`);
    this.dashText.setText(`${dashNum}`);

    this.shieldImage.x = this.scene.cameras.main.scrollX + 50;
    this.superjumpImage.x = this.scene.cameras.main.scrollX + 100;
    this.dashImage.x = this.scene.cameras.main.scrollX + 150;
    this.shieldText.x = this.scene.cameras.main.scrollX + 60;
    this.superjumpText.x = this.scene.cameras.main.scrollX + 110;
    this.dashText.x = this.scene.cameras.main.scrollX + 160;
  }
}
