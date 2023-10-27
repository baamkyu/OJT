import planeImage from "../images/plane.png";
import bullet2 from "../objects/bullet";
import bomb2 from "../objects/bullet";
import money2 from "../objects/bullet";

export const Play = () => {
  const canvas: any = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const planeImg = new Image(); // 이미지 로딩을 한 번만 수행하도록 변경
  planeImg.src = planeImage;

  planeImg.addEventListener(
    "load",
    () => {
      draw();
    },
    false
  );

  let dx = Math.random() * (2 - -2) + -2; // -2 ~ 2 사이 랜덤값
  let dy = Math.random() * (3 - 1) + 1; // 1 ~ 3 사이 랜덤값

  // 점수
  let money: number = 0;
  function haveMoney() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Money: ${money}`, 8, 20);
  }
  // 목숨
  let lives: number = 5;
  function haveLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`목숨*${lives}`, canvas.width - 65, 20);
  }

  // 패들 그리기
  let paddleWidth: number = 100;
  let paddleHeight: number = 80;
  let paddleX: number = 100; // 나중에 여기 움직일 수 있도록 변경
  let paddleY: number = canvas.height - paddleHeight;
  function drawPlane() {
    // 이미지 그리기
    ctx.drawImage(
      planeImg,
      paddleX,
      canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight
    );
  }
  // 패들 컨트롤러
  let rightPressed: boolean = false;
  let leftPressed: boolean = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  function keyDownHandler(e: any) {
    // right, arrowright 둘 다 쓴 이유는 브라우저의 호환성때문임
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
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

  // 폭탄 충돌 감지
  // function touchBomb() {
  //   if (
  //     paddleX < bombX &&
  //     paddleX + paddleWidth > bombX &&
  //     paddleY < bombY &&
  //     paddleY + paddleHeight > bombY
  //   ) {
  //     lives = 0;
  //     alert("패배");
  //     document.location.reload();
  //   }
  // }

  // 총알 충돌 감지
  // function touchBullet() {
  //   if (
  //     paddleX < bulletX &&
  //     paddleX + paddleWidth > bulletX &&
  //     paddleY < bulletY &&
  //     paddleY + paddleHeight > bulletY
  //   ) {
  //     if (lives === 1) {
  //       alert("패배");
  //       document.location.reload();
  //     } else {
  //       lives -= 1;
  //       bulletX = -999;
  //       bulletY = -999;
  //     }
  //   }
  // }

  // 최종 렌더링

  const _bullet = bullet2(ctx, {
    x: canvas.height / 2 + 50,
    y: 0,
    height: 40,
    width: 40,
  });
  const _bomb = bomb2(ctx, {
    x: canvas.height / 2 - 100,
    y: 0,
    height: 40,
    width: 40,
  });
  const _money = money2(ctx, {
    x: canvas.height / 2,
    y: 0,
    height: 40,
    width: 40,
  });

  _bullet.draw();
  _bomb.draw();
  _money.draw();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bpt = _bullet.update(dx, dy);
    const bpt2 = _bomb.update(dx, dy);
    const bpt3 = _money.update(dx, dy);

    if (bpt.y >= canvas.height) {
      _bullet.init(400, 0);
    }
    if (bpt2.y >= canvas.height) {
      _bomb.init(200, 0);
    }
    if (bpt3.y >= canvas.height) {
      _money.init(30, 0);
    }
    // haveMoney();
    // haveLives();
    // drawPlane(); // 이미지 그리기
    // bulletItem();

    // touchBomb();
    // touchBullet();

    // if (bombX + bombDX > canvas.width - 10 || bombX + bombDX < 10) {
    //   bombDX = -bombDX;
    // }
    // // // 아래로 나가면
    // // if (bombY + bombDY > canvas.height - 10) {
    // //   drawItem();
    // // }
    // if (bulletX + bulletDX > canvas.width - 10 || bulletX + bulletDX < 10) {
    //   bulletDX = -bulletDX;
    // }
    // // // 아래로 나가면
    // // if (bulletY + bulletDY > canvas.height - 10) {
    // //   drawItem();
    // // }
    // if (moneyX + moneyDX > canvas.width - 10 || moneyX + moneyDX < 10) {
    //   moneyDX = -moneyDX;
    // }
    // // // 아래로 나가면
    // // if (moneyY + moneyDY < 10) {
    // //   drawItem();
    // // }

    // if (rightPressed && paddleX < canvas.width - paddleWidth) {
    //   paddleX += 7;
    // } else if (leftPressed && paddleX > 0) {
    //   paddleX -= 7;
    // }

    requestAnimationFrame(draw);
  }
};
