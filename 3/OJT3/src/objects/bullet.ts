import bulletImage from "../images/bullet.png";
type TOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// x, y: 시작점

const bulletImg = new Image();
bulletImg.src = bulletImage;

export default function bomb(ctx: CanvasRenderingContext2D, options: TOptions) {
  let x = options.x;
  let y = options.y;
  let width = options.width;
  let height = options.height;

  const draw = () => {
    ctx.drawImage(bulletImg, x, y, width, height);
  };

  const update = (dx: number, dy: number) => {
    x += dx;
    y += dy;
    draw();
    return { x, y };
  };

  const init = (ox: number, oy: number) => {
    x = ox;
    y = oy;
  };

  return { draw, update, init };
}
