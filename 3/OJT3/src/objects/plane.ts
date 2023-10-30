import planeImage from "../images/plane.png";

type TOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export default function plane(
  ctx: CanvasRenderingContext2D,
  options: TOptions
) {
  let x = options.x;
  let y = options.y;
  let width = options.width;
  let height = options.height;

  const planeImg = new Image(); // 이미지 로딩을 한 번만 수행하도록 변경
  planeImg.src = planeImage;
  const draw = () => {
    ctx.drawImage(planeImg, x, y, width, height);
    return { x, y };
  };

  const move = (moveX: number) => {
    x += moveX;
    return x;
  };
  return { draw, move };
}
