export class Portal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, frame: string) {
    super(scene, x, y, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // body의 오프셋을 중앙으로 설정
    this.setOffset(this.width / 2 + 10, this.height / 2 + 30);
    this.setDepth(99);

    // 오른쪽 아래 포탈
    this.anims.create({
      key: "portal",
      frames: scene.anims.generateFrameNames("portal", {
        prefix: "portal",
        start: 1,
        end: 2,
      }),
      frameRate: 1,
      repeat: -1,
    });

    scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      duration: 1000,
      delay: 500,
      onstart: () => {
        this.play("portal");
      },
    });
  }
}

// export class GameNPC extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene: Phaser.Scene, x: number, y: number, frame: string) {
//     super(scene, x, y, frame);

//     scene.add.existing(this);
//     scene.physics.add.existing(this);

//     // 종료 NPC
//     this.anims.create({
//       key: "gameNPC",
//       frames: [
//         { key: "gameNPC", frame: "bear1.png" },
//         { key: "gameNPC", frame: "bear2.png" },
//         { key: "gameNPC", frame: "bear3.png" },
//         { key: "gameNPC", frame: "bear4.png" },
//       ],
//       frameRate: 1,
//       repeat: -1,
//     });

//     // body의 오프셋을 중앙으로 설정
//     this.setOffset(this.width / 2 + 10, this.height / 2 + 30);
//     this.setDepth(99);

//     scene.tweens.add({
//       targets: this,
//       x: x,
//       y: y,
//       duration: 1000,
//       delay: 500,
//       onstart: () => {
//         this.play("gameNPC");
//       },
//     });
//   }
// }

export class FinishPortal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, frame: string) {
    super(scene, x, y, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // 종료 포탈
    this.anims.create({
      key: "finishPortal",
      frames: [
        { key: "finishPortal", frame: "finish1.png" },
        { key: "finishPortal", frame: "finish2.png" },
      ],
      frameRate: 2,
      repeat: -1,
    });

    scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      duration: 1000,
      delay: 500,
      onstart: () => {
        this.play("finishPortal");
      },
    });
    this.body?.setSize(50, 100);
  }
}
