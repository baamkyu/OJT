type typeXY = {
  moneyX: number;
  moneyY: number;
  liveX: number;
  liveY: number;
};
export default function Info(ctx: CanvasRenderingContext2D, xy: typeXY) {
  // 점수
  let money: number = 0;
  let lives: number = 5;
  const haveMoney = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Money: ${money}`, xy.moneyX, xy.moneyY);
    return money;
  };
  const plusMoney = () => {
    money += 1;
  };
  // 목숨
  const haveLives = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`목숨*${lives}`, xy.liveX, xy.liveY);
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
