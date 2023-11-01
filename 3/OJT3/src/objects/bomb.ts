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

  static objects: Bomb[] = [];

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
    for (let i = 0; i < Bomb.objects.length; i++) {
      Bomb.objects[i].draw();
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
    for (let i = 0; i < Bomb.objects.length; i++) {
      Bomb.objects[i].update(maxWidth, maxHeight);
    }
  }

  // 하나의 기본 객체를 저장할 static 변수
  static defaultObject: Bomb | null = null;
  // 기본 객체를 생성하는 함수
  static initialize(ctx: CanvasRenderingContext2D) {
    // 이미 초기화되었다면 더 이상 실행하지 않음
    if (Bomb.defaultObject) return;

    const defaultObjOptions: TOptions = {
      img: bombImg,
      x: 0,
      y: 0,
      width: 56,
      height: 56,
    };

    const defaultObj = new Bomb(ctx, defaultObjOptions);
    Bomb.defaultObject = defaultObj;

    Bomb.objects.push(defaultObj);
  }

  init(ox: number, oy: number) {
    this.x = ox;
    this.y = oy;
  }
  addObject(ctx: CanvasRenderingContext2D, options: TOptions) {
    const newBomb = new Bomb(ctx, options);
    Bomb.objects.push(newBomb);
    // console.log(Bomb.objects);
  }
}
