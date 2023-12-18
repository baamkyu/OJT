import planeImage from "../../public/assets/images/plane.png";
import planeBulletImage from "../../public/assets/images/planeBullet.png";
import Sound from "../objects/sound";

type TOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  isGaming: boolean;
};

const planeImg = new Image();
planeImg.src = planeImage;

const planeBulletImg = new Image();
planeBulletImg.src = planeBulletImage;

const soundManager = new Sound();
export let shootCount = 0;

export default class Plane {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  isGaming: boolean;
  static shootedBullets: { x: number; y: number }[]; // Array to store bullets
  bulletTime: number = 0;
  isKeyDown: boolean = false;

  constructor(ctx: CanvasRenderingContext2D, options: TOptions) {
    this.ctx = ctx;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.isGaming = options.isGaming;
    Plane.shootedBullets = [];

    // 스페이스바 눌렀을 때
    if (this.isGaming) {
      document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
          this.isKeyDown = true;
          // console.log(this.isKeyDown, "Space keydown"); // whatever you want to do when space is pressed
        }
      });

      document.addEventListener("keyup", (event) => {
        if (event.code === "Space") {
          this.isKeyDown = false;
          // console.log(this.isKeyDown, "Space keyup"); // whatever you want to do when space is released
        }
      });
    }
  }

  draw() {
    for (let i = 0; i < Plane.shootedBullets.length; i++) {
      if (Plane.shootedBullets[i].y <= 0) {
        Plane.shootedBullets.splice(i, 1);
        continue;
      }
      this.ctx.drawImage(
        planeBulletImg,
        Plane.shootedBullets[i].x,
        Plane.shootedBullets[i].y,
        20,
        30
      );
    }
    this.ctx.drawImage(planeImg, this.x, this.y, this.width, this.height);
    // console.log(this.shootedBullets);
    return this.x, this.y;
  }
  move(moveX: number) {
    this.x += moveX;
    return this.x;
  }

  update() {
    if (this.isGaming) {
      // console.log(Plane.shootedBullets);
      this.bulletTime += 1;
      // console.log(this.bulletTime);
      if (this.bulletTime >= 200) {
        if (this.isKeyDown === true) {
          soundManager.playSound("shot");

          shootCount += 1;
          Plane.shootedBullets.push({
            x: this.x + this.width / 2 - 5,
            y: this.y,
          });
          this.bulletTime = 0;
        }
      }

      for (let i = 0; i < Plane.shootedBullets.length; i++) {
        Plane.shootedBullets[i].y -= 2;
        // console.log(Plane.shootedBullets[i].y);
      }
    }
  }

  shooting() {
    if (this.isGaming) {
      this.update();
      this.draw();
      setTimeout(() => this.shooting(), 300);
    } else {
      // 게임이 종료되었을 때, 총알 발사 중지
      // 추가로, Plane.shootedBullets 배열을 비워서 이미 발사된 총알을 모두 제거합니다.
      Plane.shootedBullets = [];
    }
  }
  setIsGaming(isGaming: boolean) {
    this.isGaming = isGaming;
    // 게임 상태가 변경될 때 적절한 동작 수행
  }
}
