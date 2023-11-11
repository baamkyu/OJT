export default class Player extends Phaser.Physics.Arcade.Sprite {
  _itemCount = 0;
  _laddering = false;
  _isInvincible = false;
  _firstWalking = true;
  _doubleJump = false;

  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);

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
      onComplete: () => {
        this._firstWalking = false;
      },
    });
    this.setDepth(100); // z-index
  }

  // 사다리
  // 한대 맞았을 때 (총알, 송곳)
  // 무적

  update(this: any, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
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

    if (cursors.space.isDown && this.body.blocked.down) {
      this.play("jumpstart", true);
      this.setVelocityY(-1000);
    }
  }
}
