import planeImage from "../images/plane.png";

type TOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const planeImg = new Image();
planeImg.src = planeImage;

export default class Plane {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  static shootedBullets: { x: number; y: number }[]; // Array to store bullets
  bulletTime: number = 0;
  isKeyDown: boolean = false;

  constructor(ctx: CanvasRenderingContext2D, options: TOptions) {
    this.ctx = ctx;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    Plane.shootedBullets = [];

    // 스페이스바 눌렀을 때
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

  draw() {
    for (let i = 0; i < Plane.shootedBullets.length; i++) {
      if (Plane.shootedBullets[i].y <= 0) {
        Plane.shootedBullets.splice(i, 1);
      }
      this.ctx.drawImage(
        planeImg,
        Plane.shootedBullets[i].x,
        Plane.shootedBullets[i].y,
        30,
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

  //   shootBullet() {
  //     Plane.shootedBullets.push({ x: this.x + this.width / 2 - 5, y: this.y });
  //   }

  update() {
    console.log(Plane.shootedBullets);
    this.bulletTime += 1;
    console.log(this.bulletTime);
    if (this.bulletTime >= 200) {
      if (this.isKeyDown === true) {
        Plane.shootedBullets.push({
          x: this.x + this.width / 2 - 5,
          y: this.y,
        });
        this.bulletTime = 0;
      }
    }

    for (let i = 0; i < Plane.shootedBullets.length; i++) {
      Plane.shootedBullets[i].y -= 2;
      console.log(Plane.shootedBullets[i].y);
    }
  }

  shooting() {
    this.update();
    this.draw();
    setTimeout(() => this.shooting(), 300);
  }
}
