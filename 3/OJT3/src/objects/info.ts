import planeImage from "../../public/assets/images/plane.png";
import getMoneyImage from "../../public/assets/images/money.png";

type typeXY = {
  moneyX: number;
  moneyY: number;
  liveX: number;
  liveY: number;
};

const planeImg = new Image();
planeImg.src = planeImage;
const getMoneyImg = new Image();
getMoneyImg.src = getMoneyImage;

export default function Info(ctx: CanvasRenderingContext2D, xy: typeXY) {
  // 점수
  let money: number = 0;
  let lives: number = 3;
  const haveMoney = () => {
    ctx.drawImage(getMoneyImg, xy.moneyX - 45, xy.moneyY, 36, 36);
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`x ${money}`, xy.moneyX, xy.moneyY + 25);
    return money;
  };
  const plusMoney = () => {
    money += 1;
  };
  // 목숨
  const haveLives = () => {
    ctx.drawImage(planeImg, xy.liveX - 45, xy.liveY, 36, 36);
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`x ${lives}`, xy.liveX, xy.liveY + 25);
    return lives;
  };
  const minusLives = () => {
    lives -= 1;
  };
  const endGame = () => {
    lives = 0;
  };

  return { haveMoney, haveLives, plusMoney, minusLives, endGame };
}
