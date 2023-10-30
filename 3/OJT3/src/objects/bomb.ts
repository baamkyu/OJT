import bombImage from "../images/bomb.png";

type TOptions = {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
};

const bombImg = new Image();
bombImg.src = bombImage;

export default class Bomb {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  changeDirection: boolean;

  static bombs: Bomb[] = [];

  constructor(ctx: CanvasRenderingContext2D, options: TOptions) {
    this.ctx = ctx;
    this.img = bombImg;
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
    for (let i = 0; i < Bomb.bombs.length; i++) {
      Bomb.bombs[i].draw();
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
    for (let i = 0; i < Bomb.bombs.length; i++) {
      Bomb.bombs[i].update(maxWidth, maxHeight);
    }
  }
  init(ox: number, oy: number) {
    this.x = ox;
    this.y = oy;
  }
  addBomb(ctx: CanvasRenderingContext2D, options: TOptions) {
    const newBomb = new Bomb(ctx, options);
    Bomb.bombs.push(newBomb);
    console.log(Bomb.bombs);
  }
}
