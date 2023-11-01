import planeImage from "../images/plane.png";
import bombImage from "../images/bomb.png";
import bulletImage from "../images/bullet.png";
import moneyImage from "../images/money.png";
import Sound from "../objects/sound";
import Bullet from "../objects/bullet";
import Bomb from "../objects/bomb";
import Money from "../objects/money";
import Plane from "../objects/plane";
import info from "../objects/info";
// import { BoomAni } from "../ani/boomani";
import backgroundImage from "../images/background.png";
// import { shootCount } from "../objects/plane";
import { EndingModal } from "./endingmodal";

export const Play = () => {
  const canvas: any = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  let isGaming: boolean = false;
  let isFinish: boolean = false;

  const soundManager = new Sound();

  const images = {
    plane: new Image(),
    bomb: new Image(),
    bullet: new Image(),
    money: new Image(),
    background: new Image(),
  };

  images.plane.src = planeImage;
  images.bomb.src = bombImage;
  images.bullet.src = bulletImage;
  images.money.src = moneyImage;
  images.background.src = backgroundImage;

  // 패들 그리기
  let paddleWidth: number = 100;
  let paddleHeight: number = 80;
  let paddleX: number = (canvas.width - paddleWidth) / 2; // 나중에 여기 움직일 수 있도록 변경
  let paddleY: number = canvas.height - paddleHeight;

  // 패들 컨트롤러
  // 패들 컨트롤러 상태
  let paddleControllerState = {
    rightPressed: false,
    leftPressed: false,
  };
  document.addEventListener(
    "keydown",
    (e: KeyboardEvent) => keyDownHandler(e),
    false
  );
  document.addEventListener(
    "keyup",
    (e: KeyboardEvent) => keyUpHandler(e),
    false
  );

  function keyDownHandler(e: KeyboardEvent) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      paddleControllerState.rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      paddleControllerState.leftPressed = true;
    }
  }

  function keyUpHandler(e: any) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      paddleControllerState.rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      paddleControllerState.leftPressed = false;
    }
  }

  function paddleController() {
    if (
      paddleControllerState.rightPressed &&
      paddleX < canvas.width - paddleWidth
    ) {
      paddleX += 7;
      _plane.move(7);
    } else if (paddleControllerState.leftPressed && paddleX > 0) {
      paddleX -= 7;
      _plane.move(-7);
    }
  }

  // 최종 렌더링
  const _bullet = new Bullet(ctx, {
    img: images.bullet,
    x: canvas.height / 2 + 50,
    y: 0,
    height: 56,
    width: 56,
  });
  const _bomb = new Bomb(ctx, {
    img: images.bomb,
    x: canvas.height / 2 - 100,
    y: 0,
    height: 56,
    width: 56,
  });
  const _money = new Money(ctx, {
    img: images.money,
    x: canvas.height / 2 - 100,
    y: 0,
    height: 56,
    width: 56,
  });

  const _plane = new Plane(ctx, {
    x: paddleX,
    y: paddleY,
    height: paddleWidth,
    width: paddleHeight,
  });

  const _info = info(ctx, {
    moneyX: 8,
    moneyY: 20,
    liveX: canvas.width - 65,
    liveY: 20,
  });

  _bullet.draw();
  _bomb.draw();
  _money.draw();
  let frameCount = 299;

  // 랜덤 아이템 추가
  function addRandomItem() {
    const itemImages = [images.bomb, images.bullet, images.money];
    const randomImage =
      itemImages[Math.floor(Math.random() * itemImages.length)];
    const item =
      randomImage === images.bomb
        ? _bomb
        : randomImage === images.bullet
        ? _bullet
        : _money;
    item.addObject(ctx, {
      img: randomImage,
      x: Math.random() * canvas.width,
      y: 0,
      width: 56,
      height: 56,
    });
  }
  // 총알 적중 감지
  let hitCount = 0;
  function checkHitItem() {
    for (let i = 0; i < Plane.shootedBullets.length; i++) {
      const planeBulletObject = Plane.shootedBullets[i];
      let bulletHit = false;
      let bombHit = false;
      let moneyHit = false;
      for (let j = 0; j < Bullet.objects.length; j++) {
        const bulletObject = Bullet.objects[j];

        if (
          planeBulletObject.x < bulletObject.x + bulletObject.width &&
          planeBulletObject.x + 10 > bulletObject.x &&
          planeBulletObject.y < bulletObject.y + bulletObject.height &&
          planeBulletObject.y + 10 > bulletObject.y
        ) {
          Bullet.objects.splice(j, 1);
          // Plane.shootedBullets.splice(i, 1);
          soundManager.playSound("hit");
          bulletHit = true;
          hitCount += 1;
          console.log("Bullet 적중");
          break;
        }
      }

      for (let j = 0; j < Bomb.objects.length; j++) {
        const bombObject = Bomb.objects[j];

        if (
          planeBulletObject.x < bombObject.x + bombObject.width &&
          planeBulletObject.x + 10 > bombObject.x &&
          planeBulletObject.y < bombObject.y + bombObject.height &&
          planeBulletObject.y + 10 > bombObject.y
        ) {
          soundManager.playSound("hit");
          Bomb.objects.splice(j, 1);
          // Plane.shootedBullets.splice(i, 1);
          bombHit = true;
          hitCount += 1;
          console.log("Bomb 적중");
          break;
        }
      }

      for (let j = 0; j < Money.objects.length; j++) {
        const moneyObject = Money.objects[j];

        if (
          planeBulletObject.x < moneyObject.x + moneyObject.width &&
          planeBulletObject.x + 10 > moneyObject.x &&
          planeBulletObject.y < moneyObject.y + moneyObject.height &&
          planeBulletObject.y + 10 > moneyObject.y
        ) {
          Money.objects.splice(j, 1);
          // Plane.shootedBullets.splice(i, 1);
          moneyHit = true;
          hitCount += 1;
          console.log("Money 적중");
          break;
        }
      }
      // 적중하면 총알 사라지기
      if (bulletHit || bombHit || moneyHit) {
        Plane.shootedBullets.splice(i, 1);
        continue;
      }
    }
  }

  // 충돌 감지
  function checkCollision(obj: any) {
    const objects = obj.objects;

    if (objects.length === 0) {
    } else {
      for (let i = 0; i < objects.length; i++) {
        const item = objects[i];
        if (
          paddleX < item.x &&
          paddleX + paddleWidth > item.x &&
          paddleY < item.y &&
          paddleY + paddleHeight > item.y
        ) {
          if (obj === Bullet) {
            item.init(0, 0);
            _info.minusLives();
            objects.splice(i, 1);
            if (_info.haveLives() != 1) {
              soundManager.playSound("auch");
            }
          } else if (obj === Bomb) {
            soundManager.playSound("endGame");
            item.init(0, 0);
            _info.endGame();
            objects.splice(i, 1);
            // document.location.reload();
          } else if (obj === Money) {
            objects.splice(i, 1);
            _info.plusMoney();

            soundManager.playSound("getMoney");
            console.log("money획득");
          }
        }
      }
    }
  }

  function draw() {
    // soundManager.playSound("shot");
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    // 끝나는 로직
    if (_info.haveLives() <= 0) {
      soundManager.playSound("endGame");
      _info.endGame();
      isGaming = false;

      // alert("게임 끝");
    }

    checkCollision(Bullet);
    checkCollision(Bomb);
    checkCollision(Money);

    // 패들 컨트롤러
    _plane.draw();
    _plane.shooting();
    paddleController();
    frameCount += 1;
    checkHitItem();
    Bomb.updateAll(canvas.width, canvas.height);
    Bullet.updateAll(canvas.width, canvas.height);
    Money.updateAll(canvas.width, canvas.height);
    _info.haveMoney();
    _info.haveLives();
    // console.log("hitCount : ", hitCount, "shootCount : ", { shootCount });

    // 아이템 추가
    if (frameCount % 100 === 0) {
      addRandomItem();
    }
    isGaming
      ? requestAnimationFrame(draw)
      : EndingModal(ctx, canvas.width, canvas.height, 10, 0.8);
  }
  draw();
};

// draw()함수 안에 clearRect 사용
// requestAnimationFrame(draw)를 통해 빠르게 무한 반복
// 배경을 draw()함수 안에 넣으면 이미지를 계속해서 렌더링 할 것임
// draw()밖에 넣으면 clearRect에 묻혀서 배경이 렌더링이 되지 않음
