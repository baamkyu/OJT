export default class MainScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  circle!: Phaser.GameObjects.Arc;
  minimap!: Phaser.Cameras.Scene2D.Camera;

  constructor() {
    super({ key: "main" });
  }
  preload() {
    /** texture packer로 export한 파일들을 atlas를 이용하면 쉽게 가져올 수 있습니다. */
    this.load.atlas("beji", "texture.png", "texture.json");
    this.load.atlas("walkSprite", "walkSprite.png", "walkSprite.json");

    this.load.image("bg1", "bg1.png");
    this.load.image("bg2", "bg2.png");
    this.load.image("bg3", "bg3.png");

    this.load.tilemapTiledJSON("map");
    this.load.image("tile", "tile.png");
  }

  create() {
    const { width, height } = this.game.canvas;
    this.add.image(400, 400, "test");
    this.bg1 = this.add.tileSprite(0, 0, width, height, "bg1").setOrigin(0, 0);
    this.bg2 = this.add.tileSprite(0, 0, width, height, "bg2").setOrigin(0, 0);
    this.bg3 = this.add.tileSprite(0, 0, width, height, "bg3").setOrigin(0, 0);

    const map = this.make.tilemap({ key: "map" });
    const tileset: any = map.addTilesetImage("tile", "tile");
    const platforms: any = map.createLayer("platforms", tileset);
    const player = this.physics.add.sprite(200, 170, "beji");
    platforms.setCollisionByExclusion([-1]);
    this.physics.add.collider(player, platforms);

    /** sprite를 만들고 */
    // const sprite = this.add.sprite(200, 200, "beji", "stand1.png");
    // /** 순차적으로 보여주는 애니메이션을 만들어 놓습니다. */
    // sprite.anims.create({
    //   key: "stand",
    //   frames: this.anims.generateFrameNames("beji", {
    //     prefix: "stand",
    //     start: 1,
    //     end: 5,
    //     suffix: ".png",
    //   }),
    //   repeat: -1,
    //   frameRate: 10,
    // });

    const sprite = this.add.sprite(200, 200, "walkSprite", "walk1.png");
    sprite.anims.create({
      key: "walkSprite",
      frames: this.anims.generateFrameNames("walkSprite", {
        prefix: "walk",
        start: 1,
        end: 6,
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 10,
    });
    /** stand 애니메이션을 시작합니다. */
    sprite.play("walkSprite");
    /** 동그라미를 만들어 물리세계에 넣습니다. */
    this.circle = this.add.circle(30, 30, 30, 0xffffff);
    this.tweens.add({
      targets: this.circle,
      x: 300,
      duration: 300,
      yoyo: true,
      repeat: 3,
      ease: Phaser.Math.Easing.Bounce.Out,
    });
    // this.time.addEvent({
    //   startAt: 0,
    //   delay: 100,
    //   repeat: -1,
    //   callback: () => {
    //     const color = new Phaser.Display.Color();
    //     color.random(50);

    //     this.add.circle(
    //       Phaser.Math.Between(0, width),
    //       Phaser.Math.Between(0, height),
    //       Phaser.Math.FloatBetween(20, 100),
    //       color.color
    //     );
    //   },
    // });

    this.physics.add.existing(this.circle);

    /**물리세계에 움직이지 않는 그룹을 만들어 땅바닥 요소를 넣습니다 */
    const ground = this.add
      .rectangle(0, height - 30, width, 30, 0xffffff)
      .setOrigin(0, 0);

    const staticGroup = this.physics.add.staticGroup(ground);
    /** 물리세계가 두 물체의 충돌을 인지하도록 합니다. */
    this.physics.add.collider(this.circle, ground);
    /** set cursors */
    this.cursors = this.input.keyboard!.createCursorKeys();

    /**메인 카메라가 플레이어를 쫓아 다닙니다. */
    this.cameras.main.startFollow(this.circle);
    this.cameras.main.setBounds(-100, 0, width + 200, height);
    /** 미니맵을 생성합니다 */
    this.minimap = this.cameras
      .add(0, 0, width * 0.1, height * 0.1)
      .setBounds(-100, 0, width + 200, height)
      .setZoom(0.1)
      .setBackgroundColor(0xff00ff);
  }

  update(this: any, time: number, delta: number): void {
    this.bg1.tilePositionX += 3;
    this.bg2.tilePositionX += 6;
    this.bg3.tilePositionX += 9;
    if (this.cursors.left.isDown) {
      this.circle.body.velocity.x = -100;
    }
    if (this.cursors.right.isDown) {
      this.circle.body.velocity.x = 100;
    }
    if (this.cursors.space.isDown) {
      this.circle.body.velocity.y = -1000;
    }

    /** 미니맵이 플레이어를 따라 가도록 설정합니다 */
    this.minimap.scrollX = this.circle.x;
    this.minimap.scrollY = this.circle.y;

    this.add
      .rectangle(this.width, 0, 100, 100, 0xff0000)
      .setOrigin(1, 0)
      .setScrollFactor(0);
  }
}
