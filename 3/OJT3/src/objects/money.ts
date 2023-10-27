type TOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// x, y: 시작점

export default function bomb(ctx: CanvasRenderingContext2D, options: TOptions) {
  let x = options.x;
  let y = options.y;
  let width = options.width;
  let height = options.height;

  const draw = () => {
    ctx.beginPath();
    ctx.arc(x, y, width, height, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
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
