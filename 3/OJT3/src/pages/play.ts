import planeImage from "../images/plane.png";
import bombImage from "../images/bomb.png";
import bulletImage from "../images/bullet.png";
import moneyImage from "../images/money.png";
import Bullet from "../objects/bullet";
import Bomb from "../objects/bomb";
import Money from "../objects/money";
import Plane from "../objects/plane";
import info from "../objects/info";
// import { BoomAni } from "../ani/boomani";
import backgroundImage from "../images/background.png";

export const Play = () => {
  const canvas: any = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

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
    height: 40,
    width: 40,
  });
  const _bomb = new Bomb(ctx, {
    img: images.bomb,
    x: canvas.height / 2 - 100,
    y: 0,
    height: 40,
    width: 40,
  });
  const _money = new Money(ctx, {
    img: images.money,
    x: canvas.height / 2 - 100,
    y: 0,
    height: 40,
    width: 40,
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

  function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    // 끝나는 로직
    if (_info.haveLives() <= 0) {
      _info.endGame();
    }

    // 충돌 감지
    function checkCollision(obj: any) {
      const objects = obj.objects;

      if (objects.length === 0) {
        return;
      } else {
        for (let i = 0; i < objects.length; i++) {
          const item = objects[i];
          if (
            paddleX < item.x &&
            paddleX + paddleWidth > item.x &&
            paddleY < item.y &&
            paddleY + paddleHeight > item.y
          ) {
            setTimeout(() => objects.splice(i, 1), 300); // settimeout으로 약간 감싸줘서 한번에 두개 부딪힐때 문제가 생길듯??
            _bullet.init(0, 0);

            if (obj instanceof Bullet) {
              _info.minusLives();
              Bullet.objects.splice(i, 1);
            } else if (obj instanceof Bomb) {
              item.init(0, 0);
              Bomb.objects.splice(i, 1);
              alert("패배");
              document.location.reload();
            }
          }
        }
      }
    }

    checkCollision(Bullet);
    checkCollision(Bomb);
    checkCollision(Money);

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
        width: 40,
        height: 40,
      });
    }

    // 총알 적중 감지
    // function bulletToItem() {
    //   for (let i = 0; i < Plane.shootedBullets.length; i++) {
    //     const planeBulletObject = Plane.shootedBullets[i];
    //     for (
    //       let j = 0;
    //       j <
    //       Math.max(
    //         Bullet.bullets.length,
    //         Bomb.bombs.length,
    //         Money.moneys.length,
    //         1
    //       );
    //       j++
    //     ) {
    //       try {
    //         const bulletObject = Bullet.bullets[j];
    //         const BombObject = Bomb.bombs[j];
    //         const MoneyObject = Money.moneys[j];
    //         if (
    //           planeBulletObject.x < bulletObject.x + bulletObject.width &&
    //           planeBulletObject.x + 10 > bulletObject.x &&
    //           planeBulletObject.y < bulletObject.y + bulletObject.height &&
    //           planeBulletObject.y + 10 > bulletObject.y
    //         ) {
    //           Plane.shootedBullets.splice(i, 1);
    //           Bullet.bullets.splice(j, 1);
    //           console.log("bullet 충돌");
    //         } else if (
    //           planeBulletObject.x < BombObject.x + BombObject.width &&
    //           planeBulletObject.x + 10 > BombObject.x &&
    //           planeBulletObject.y < BombObject.y + BombObject.height &&
    //           planeBulletObject.y + 10 > BombObject.y
    //         ) {
    //           Plane.shootedBullets.splice(i, 1);
    //           Bomb.bombs.splice(j, 1);
    //           console.log("BombObject 충돌");
    //         } else if (
    //           planeBulletObject.x < MoneyObject.x + MoneyObject.width &&
    //           planeBulletObject.x + 10 > MoneyObject.x &&
    //           planeBulletObject.y < MoneyObject.y + MoneyObject.height &&
    //           planeBulletObject.y + 10 > MoneyObject.y
    //         ) {
    //           Plane.shootedBullets.splice(i, 1);
    //           Money.moneys.splice(j, 1);
    //           console.log("MoneyObject 충돌");
    //         }
    //       } catch {
    //         console.log("catch로 빠짐");
    //       }
    //     }

    //     // for (let i = 0; i < Bullet.bullets.length; i++) {
    //     //   const bulletObject = Bullet.bullets[i];
    //     //   if (
    //     //     planeBulletObject.x < bulletObject.x + bulletObject.width &&
    //     //     planeBulletObject.x + 10 > bulletObject.x &&
    //     //     planeBulletObject.y < bulletObject.y + bulletObject.height &&
    //     //     planeBulletObject.y + 10 > bulletObject.y
    //     //   ) {
    //     //     console.log("bullet 충돌");
    //     //   }
    //     // }
    //   }
    // }

    // 패들 컨트롤러
    _plane.draw();
    paddleController();
    _plane.shooting();
    frameCount += 1;
    // touchBomb();
    // touchBullet();
    // bulletToItem();
    Bomb.updateAll(canvas.width, canvas.height);
    Bullet.updateAll(canvas.width, canvas.height);
    Money.updateAll(canvas.width, canvas.height);
    _info.haveMoney();
    _info.haveLives();

    // 아이템 추가
    if (frameCount % 100 === 0) {
      addRandomItem();
    }
    requestAnimationFrame(draw);
  }

  draw();
};

// draw()함수 안에 clearRect 사용
// requestAnimationFrame(draw)를 통해 빠르게 무한 반복
// 배경을 draw()함수 안에 넣으면 이미지를 계속해서 렌더링 할 것임
// draw()밖에 넣으면 clearRect에 묻혀서 배경이 렌더링이 되지 않음
