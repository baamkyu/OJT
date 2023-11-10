import "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, //
  width: 800,
  height: 600,
  physics: {
    // 물리엔진 관련 설정
    default: "arcade", // arcade, matter 두 가지 물리엔진이 있음
    // arcade: box기반으로 된 물리엔진, matter: path기반으로 된 물리엔진
    arcade: {
      gravity: { y: 300 }, // 중력
      debug: false, // 디버깅모드
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
let player: any;
let platforms: any;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
let stars: any;
let score: number = 0;
let scoreText: any;
let bombs: any;
let gameOver: any = false;
const game = new Phaser.Game(config);

function preload(this: Phaser.Scene) {
  // 에셋, 사운드, 이미지 등 미리 다운받아놓는 메서드
  this.load.image("sky", "../src/assets/sky.png");
  this.load.image("ground", "../src/assets/platform.png");
  this.load.image("star", "../src/assets/star.png");
  this.load.image("bomb", "../src/assets/bomb.png");
  this.load.spritesheet("dude", "../src/assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create(this: Phaser.Scene) {
  // 설정, 코드 등 여기 많이 씀
  this.add.image(400, 300, "sky");
  this.add.image(400, 300, "star");

  // 발판 생성
  platforms = this.physics.add.staticGroup();

  // platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  // 캐릭터 생성
  player = this.physics.add.sprite(100, 450, "dude");
  player.setBounce(0.2); // 부딪혔을 때 속도 (1이면 속도 그대로 유지)
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  player.body.setGravityY(300); // player에 중력 부여
  this.physics.add.collider(player, platforms); // player와 platforms의 물리적 충돌 감지

  cursors = this.input?.keyboard?.createCursorKeys();
  this.physics.add.collider(player, platforms);

  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });
  this.physics.add.collider(stars, platforms);

  stars.children.iterate(function (child: any) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fontStyle: "#000",
  });
  bombs = this.physics.add.group();
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  this.physics.add.overlap(player, stars, collectStar, undefined, this);

  this.physics.add.collider(player, bombs, hitBomb, undefined, this);
}

function update(this: Phaser.Scene) {
  // fps에 따라 계속 실행 (보통 1초에 60번)
  // 게임 루프에서 게임 상태 업데이트 코드를 작성합니다.
  if (gameOver) {
    return;
  }

  if (cursors?.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors?.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else if (cursors?.space.isDown) {
    player.setVelocityY(-330);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors?.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function collectStar(player: any, star: any) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child: any) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var bomb = bombs?.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    bomb.allowGravity = false;
  }
}

function hitBomb(this: Phaser.Scene, player: any, bomb: any) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  gameOver = true;
}

// pause : 잠깐 멈추는 거
// sleep :
