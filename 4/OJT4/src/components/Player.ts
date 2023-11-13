import GameScene from "../scenes/Game";
import SceneKeys from "../constants/SceneKeys";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  keyA: Phaser.Input.Keyboard.Key;
  keyS: Phaser.Input.Keyboard.Key;
  keyD: Phaser.Input.Keyboard.Key;
  // superjumpNum: number;
  // shieldNum: number;
  // dashNum: number;
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string,
    frame: string
    // superjumpNum: number,
    // shieldNum: number,
    // dashNum: number
  ) {
    super(scene, x, y, texture, frame);

    this.keyA = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // 추가된 부분: superjump, shield, dash 초기화
    // this.superjumpNum = superjumpNum;
    // this.shieldNum = shieldNum;
    // this.dashNum = dashNum;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0, 1);
    this.setDisplayOrigin(0, 1);
    this.setCollideWorldBounds(true);

    // stand animation
    this.anims.create({
      key: "stand",
      frames: scene.anims.generateFrameNames("player", {
        prefix: "stand",
        start: 1,
        end: 5,
        zeroPad: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });
    // walk animation
    this.anims.create({
      key: "walk",
      frames: scene.anims.generateFrameNames("player", {
        prefix: "walk",
        start: 1,
        end: 6,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });
    // climb animation
    this.anims.create({
      key: "climb",
      frames: scene.anims.generateFrameNames("player", {
        prefix: "climb",
        start: 1,
        end: 2,
        zeroPad: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });
    // jumpstart animation
    this.anims.create({
      key: "jumpstart",
      frames: scene.anims.generateFrameNames("player", {
        prefix: "jumpstart",
        start: 1,
        end: 4,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: 0,
    });
    this.play("stand");

    scene.tweens.add({
      targets: this,
      x: 128,
      duration: 1000,
      delay: 500,
      onStart: () => {
        this.play("walk");
      },
    });
    this.setDepth(100); // z-index
  }

  // 사다리
  // 한대 맞았을 때 (총알, 송곳)
  // 무적

  useItem(gameScene: GameScene) {
    console.log("d", gameScene.dashNum);
    if (this.keyD.isDown) {
      if (gameScene.dashNum > 0) {
        this.setVelocityX(-2000);
        this.setFlipX(true);
        console.log("dash");

        // 1초 후에 속도를 0으로 설정하여 멈춤
        // this.scene.time.delayedCall(1000, () => {
        //   gameScene.dashNum -= 1;
        // });
      }
    } else if (this.keyS.isDown) {
      console.log("s", gameScene.superjumpNum);
      if (gameScene.superjumpNum > 0) {
        gameScene.superjumpNum -= 1;
        this.setVelocityY(-2000);
        console.log("superjump");
      }
    }
  }

  update(this: any, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.useItem(this.scene.scene.get(SceneKeys.Game));

    if (cursors.left.isDown) {
      this.setVelocityX(-500);
      this.setFlipX(true);
      if (this.body.blocked.down) this.play("walk", true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(500);
      this.setFlipX(false);
      if (this.body.blocked.down) this.play("walk", true);
    } else {
      this.setVelocityX(0);
      if (this.body.blocked.down) this.play("stand", true);
    }
    if (this.body.blocked.down) {
      this._doubleJump = false;
    }

    if (this.body.blocked.down && cursors.space.isDown) {
      this.play("jumpstart", true);
      this.setVelocityY(-1000);
    }
  }
}
