// import GameScene from "../scenes/Game";

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
    this.itemSlots = this.scene.add.container(100, 300);

    const textStyle = {
      fontSize: "40px",
      color: "#000000",
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
    };

    this.shieldText = this.scene.add.text(0, 25, "", textStyle);
    this.superjumpText = this.scene.add.text(0, 10, "", textStyle);
    this.dashText = this.scene.add.text(105, 10, "", textStyle);

    this.shieldImage = this.scene.add.image(0, 0, "shield");
    this.superjumpImage = this.scene.add.image(5, 0, "superjump");
    this.dashImage = this.scene.add.image(110, 0, "dash");

    this.superjumpImage.setScale(2);
    this.dashImage.setScale(2);

    // this.itemSlots.add(this.shieldImage);
    this.itemSlots.add(this.superjumpImage);
    this.itemSlots.add(this.dashImage);
    // this.itemSlots.add(this.shieldText);
    this.itemSlots.add(this.superjumpText);
    this.itemSlots.add(this.dashText);

    this.itemSlots.setDepth(101);
    this.itemSlots.setScrollFactor(0); // 이 부분이 추가됐습니다.
  }

  create() {}

  update(this: any, shieldNum: number, superjumpNum: number, dashNum: number) {
    this.shieldText.setText(`${shieldNum}`);
    this.superjumpText.setText(`${superjumpNum}`);
    this.dashText.setText(`${dashNum}`);

    this.itemSlots.x = this.scene.cameras.main.width / 2;
    this.itemSlots.y = window.innerHeight - 70;
  }
}
