export default class Player extends Phaser.Physics.Arcade.Sprite {
  _itemCount = 0;
  _laddering = false;
  _firstWalking = true;
  _doubleJump = false;
  get laddering() {
    return this._laddering;
  }
  set laddering(bool: boolean) {
    //@ts-ignore
    this.body.setAllowGravity(!bool);
    this._laddering = bool;
  }
  dead = false;
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
      x: 128 * 4,
      duration: 1000,
      delay: 500,
      onStart: () => {
        this.play("walk");
      },
      onComplete: () => {
        this._firstWalking = false;
      },
    });
    this.setDepth(100);
    const cursors = scene.input.keyboard.createCursorKeys();
    cursors.left.on("up", () => {
      if (this.body.blocked.down) this.setVelocity(0);
    });
    cursors.right.on("up", () => {
      if (this.body.blocked.down) this.setVelocity(0);
    });
    cursors.space.on("down", () => {
      //공중에 있을 때 한번 더 쩜프
      if (!this._doubleJump && !this.body.blocked.down) {
        this._doubleJump = true;
        this.setVelocityY(-1250);
        this.play("jumpstart", true);
      }
    });
  }
  complete() {
    this.scene.physics.world.remove(this.body);
  }
  kill() {
    this.dead = true;

    if (!this.scene.sound.get("die")) this.scene.sound.play("die");

    this.setFrame("hit");
    this.setVelocity(0, 0);
    this.setCollideWorldBounds(false);
    //@ts-ignore
    this.setTint(0xff6666);
    this.scene.cameras.main.shake(500, 0.025);
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.setTint(undefined);
        this.dead = false;
      },
    });
  }
  killEnemy() {
    this.setVelocityY(-300);
  }
  update(
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    _: Phaser.Tilemaps.TilemapLayer,
    ladderLayer: Phaser.Tilemaps.TilemapLayer
  ): void {
    if (this._firstWalking) return;
    if (this.dead) return;

    if (this.body.bottom >= this.scene.cameras.main.getBounds().bottom) {
      this.kill();
      const scene = this.scene.scene;
      setTimeout(() => {
        scene.restart();
      }, 500);
      return;
    }
    if (this._laddering) {
      this.setVelocity(0, 0);
      if (cursors.up.isDown) {
        if (
          !this.scene.physics.overlapTiles(
            this,
            ladderLayer.layer.data.flat().filter((el) => el.index !== -1)
          )
        ) {
          this.laddering = false;
        } else {
          this.play("climb", true);
          this.y -= 8;
        }
      } else if (cursors.down.isDown) {
        const bottomCenter = this.getBottomCenter();
        if (!ladderLayer.getTileAtWorldXY(bottomCenter.x, bottomCenter.y)) {
          this.laddering = false;
        } else {
          this.play("climb", true);
          this.y += 8;
        }
      } else if (cursors.left.isDown || cursors.right.isDown) {
        this.laddering = false;
        this.setFrame("jumpstart4");
      } else {
        this.stop();
      }
      return;
    }
    // controls left & right

    if (cursors.left.isDown) {
      this.setVelocityX(-500);
      // this.body.x -= 10;
      this.setFlipX(true);
      if (this.body.blocked.down) this.play("walk", true);
    } else if (cursors.right.isDown) {
      // this.body.x += 10;
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

    // controls up

    if (cursors.space.isDown && this.body.blocked.down) {
      this.play("jumpstart", true);
      this.setVelocityY(-1250);
    }
  }
}
