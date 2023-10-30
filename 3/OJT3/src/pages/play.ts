import planeImage from "../images/plane.png";
import bombImage from "../images/bomb.png";
import bulletImage from "../images/bullet.png";
import Bullet from "../objects/bullet";
import Bomb from "../objects/bomb";
import plane from "../objects/plane";
import info from "../objects/info";
import { BoomAni } from "../ani/boom";

export const Play = () => {
  const canvas: any = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const planeImg = new Image(); // 이미지 로딩을 한 번만 수행하도록 변경
  planeImg.src = planeImage;
  const bombImg = new Image(); // 이미지 로딩을 한 번만 수행하도록 변경
  bombImg.src = bombImage;
  const bulletImg = new Image(); // 이미지 로딩을 한 번만 수행하도록 변경
  bulletImg.src = bulletImage;

  // 패들 그리기
  let paddleWidth: number = 100;
  let paddleHeight: number = 80;
  let paddleX: number = (canvas.width - paddleWidth) / 2; // 나중에 여기 움직일 수 있도록 변경
  let paddleY: number = canvas.height - paddleHeight;

  // 패들 컨트롤러
  let rightPressed: boolean = false;
  let leftPressed: boolean = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  function keyDownHandler(e: any) {
    // right, arrowright 둘 다 쓴 이유는 브라우저의 호환성때문임
    if (e.key === "Right" || e.key === "ArrowRight") {
      console.log("right");
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      console.log("left");
      leftPressed = true;
    }
  }
  function keyUpHandler(e: any) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

  function paddleController() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
      _plane.move(7);
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
      _plane.move(-7);
    }
  }

  // 최종 렌더링
  const _bullet = new Bullet(ctx, {
    img: bulletImg,
    x: canvas.height / 2 + 50,
    y: 0,
    height: 40,
    width: 40,
  });
  const _bomb = new Bomb(ctx, {
    img: bombImg,
    x: canvas.height / 2 - 100,
    y: 0,
    height: 40,
    width: 40,
  });

  const _plane = plane(ctx, {
    x: paddleX,
    y: paddleY,
    width: paddleWidth,
    height: paddleHeight,
  });
  const _info = info(ctx, {
    moneyX: 8,
    moneyY: 20,
    liveX: canvas.width - 65,
    liveY: 20,
  });

  _bullet.draw();
  _bomb.draw();
  let frameCount = 0;

  function draw() {
    if (_info.haveLives() <= 0) {
      _info.endGame();
      console.log("끝");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 폭탄 충돌 감지
    function touchBomb() {
      for (let i = 0; i < Bomb.bombs.length; i++) {
        const bombObject = Bomb.bombs[i];
        if (
          paddleX < bombObject.x &&
          paddleX + paddleWidth > bombObject.x &&
          paddleY < bombObject.y &&
          paddleY + paddleHeight > bombObject.y
        ) {
          _info.endGame();

          // BoomAni(ctx, paddleX, paddleY, canvas.width, canvas.height);
          alert("패배");
          document.location.reload();
        }
      }
    }
    // 총알 충돌 감지
    function touchBullet() {
      for (let i = 0; i < Bullet.bullets.length; i++) {
        const bulletObject = Bullet.bullets[i];
        if (
          paddleX < bulletObject.x &&
          paddleX + paddleWidth > bulletObject.x &&
          paddleY < bulletObject.y &&
          paddleY + paddleHeight > bulletObject.y
        ) {
          alert("live-1");
          // _bullet.init(300, 0);
          _info.minusLives();
        }
      }
    }

    // if (bpt.y >= canvas.height) {
    //   _bullet.init(400, 0); // 랜덤 좌표로 변경해야함
    // }
    // if (bpt2.y >= canvas.height) {
    //   _bomb.init(200, 0);
    // }
    // if (bpt3.y >= canvas.height) {
    //   _money.init(30, 0);
    // }

    // 패들 컨트롤러
    _plane.draw();
    paddleController();
    frameCount += 1;
    touchBomb();
    touchBullet();
    Bomb.updateAll(canvas.width, canvas.height);
    Bullet.updateAll(canvas.width, canvas.height);
    _info.haveMoney();
    _info.haveLives();
    console.log("frameCount", frameCount);
    if (frameCount % 300 === 0) {
      _bomb.addBomb(ctx, {
        img: bombImg,
        x: Math.random() * canvas.width,
        y: 0,
        width: 40,
        height: 40,
      });
      _bullet.addBullet(ctx, {
        img: bulletImg,
        x: Math.random() * canvas.width,
        y: 0,
        width: 40,
        height: 40,
      });
      alert("300");
    }

    requestAnimationFrame(draw);
  }
  draw();
};
