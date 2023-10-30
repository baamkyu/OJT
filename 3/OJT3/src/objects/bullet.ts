import bulletImage from "../images/bullet.png";
type TOptions = {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
};

const bulletImg = new Image();
bulletImg.src = bulletImage;

export default class Bullet {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  changeDirection: boolean;

  static bullets: Bullet[] = [];

  constructor(ctx: CanvasRenderingContext2D, options: TOptions) {
    this.ctx = ctx;
    this.img = bulletImg;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.changeDirection = false;
    this.dx = Math.random() * (2 - -2) + -2;
    this.dy = Math.random() * (3 - 1) + 1;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawAll() {
    for (let i = 0; i < Bullet.bullets.length; i++) {
      Bullet.bullets[i].draw();
    }
  }
  update(maxWidth: number, maxHeight: number) {
    if (this.x + this.dx > maxWidth - 10 || this.x + this.dx < 10) {
      this.changeDirection = !this.changeDirection;
    }
    if (this.changeDirection) {
      this.x -= this.dx;
      this.y += this.dy;
    } else {
      this.x += this.dx;
      this.y += this.dy;
    }

    if (this.y + this.dy > maxHeight - 10) {
      this.init(100, 0); // 아래로 넘어갔을때 다시 시작
      this.dx = Math.random() * (2 - -2) + -2;
      this.dy = Math.random() * (3 - 1) + 1;
    }
    this.draw();

    return { x: this.x, y: this.y };
  }

  static updateAll(maxWidth: number, maxHeight: number) {
    for (let i = 0; i < Bullet.bullets.length; i++) {
      Bullet.bullets[i].update(maxWidth, maxHeight);
    }
  }

  init(ox: number, oy: number) {
    this.x = ox;
    this.y = oy;
  }
  addBullet(ctx: CanvasRenderingContext2D, options: TOptions) {
    const newBullet = new Bullet(ctx, options);
    Bullet.bullets.push(newBullet);
    console.log(Bullet.bullets);
  }
}
