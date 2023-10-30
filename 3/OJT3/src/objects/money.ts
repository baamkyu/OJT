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

  let changeDirection: boolean = false;

  let dx = Math.random() * (2 - -2) + -2; // -2 ~ 2 사이 랜덤값
  let dy = Math.random() * (3 - 1) + 1; // 1 ~ 3 사이 랜덤값
  const update = (maxWidth: number, maxHeight: number) => {
    // x축 벗어나면 방향전환
    if (x + dx > maxWidth - 10 || x + dx < 10) {
      changeDirection = !changeDirection;
    }

    if (changeDirection) {
      x -= dx;
      y += dy;
    } else {
      x += dx;
      y += dy;
    }
    if (y + dy > maxHeight - 10) {
      init(100, 0);
      dx = Math.random() * (2 - -2) + -2; // -2 ~ 2 사이 랜덤값
      dy = Math.random() * (3 - 1) + 1; // 1 ~ 3 사이 랜덤값
    }

    draw();
    return { x, y };
  };

  const init = (ox: number, oy: number) => {
    x = ox;
    y = oy;
  };

  return { draw, update, init };
}
