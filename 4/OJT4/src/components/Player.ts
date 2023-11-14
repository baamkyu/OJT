import GameScene from "../scenes/Game";
import SceneKeys from "../constants/SceneKeys";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  keyA: Phaser.Input.Keyboard.Key;
  keyS: Phaser.Input.Keyboard.Key;
  keyD: Phaser.Input.Keyboard.Key;

  _dashing: boolean = false;
  _superjumping: boolean = false;
  _canDash: boolean = true;
  _canSuperjump: boolean = true;
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);

    this.keyA = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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
      x: this.x,
      duration: 1000,
      delay: 500,
      onStart: () => {
        this.play("walk");
      },
    });
    this.setDepth(100); // z-index
  }

  useItem(gameScene: GameScene) {
    console.log("d", gameScene.dashNum);
    if (this.keyD.isDown) {
      if (gameScene.dashNum > 0 && this._canDash) {
        this._dashing = true;
        this._canDash = false;
        gameScene.dashNum -= 1;
        console.log("dash");
        setTimeout(() => {
          this._canDash = true;
        }, 3000);
      }
    } else if (this.keyS.isDown) {
      console.log("s", gameScene.superjumpNum);
      if (gameScene.superjumpNum > 0 && this._canSuperjump) {
        this._superjumping = true;
        this._canSuperjump = false;
        gameScene.superjumpNum -= 1;
        this.setVelocityY(-2000);
        setTimeout(() => {
          this._canSuperjump = true;
        }, 3000);
      }
    }
  }

  update(this: any, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.useItem(this.scene.scene.get(SceneKeys.Game));

    if (cursors.left.isDown) {
      this.setVelocityX(-300);
      this.setFlipX(true);
      if (this.body.blocked.down) this.play("walk", true);
      if (this._dashing) {
        this.setVelocityX(-500);
        setTimeout(() => {
          this._dashing = false;
          console.log("dash false");
        }, 1500);
      }
    } else if (cursors.right.isDown) {
      this.setVelocityX(300);
      this.setFlipX(false);
      if (this.body.blocked.down) this.play("walk", true);
      if (this._dashing) {
        this.setVelocityX(500);
        setTimeout(() => {
          this._dashing = false;
          console.log("dash false");
        }, 1500);
      }
    } else {
      this.setVelocityX(0);
      this._dashing = false;
      if (this.body.blocked.down) this.play("stand", true);
    }
    if (this.body.blocked.down) {
      this._superjumping = false;
    }

    if (this.body.blocked.down && cursors.space.isDown) {
      this.play("jumpstart", true);
      this.setVelocityY(-700);
    }
  }
}
