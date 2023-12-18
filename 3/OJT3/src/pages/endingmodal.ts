import hitRateImage from "../../public/assets/images/hitRate.png";
import moneyImage from "../../public/assets/images/getMoney.png";
import bulletItemImage from "../../public/assets/images/bullet.png";
import bombItemImage from "../../public/assets/images/bomb.png";
import moneyItemImage from "../../public/assets/images/money.png";

const hitRateImg = new Image();
hitRateImg.src = hitRateImage;
const moneyImg = new Image();
moneyImg.src = moneyImage;

const bulletItemImg = new Image();
bulletItemImg.src = bulletItemImage;
const bombItemImg = new Image();
bombItemImg.src = bombItemImage;
const moneyItemImg = new Image();
moneyItemImg.src = moneyItemImage;

export const EndingModal = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  money: number,
  hitRate: number,
  hitBullet: number,
  hitBomb: number,
  hitMoney: number,
  restartGame: () => void
) => {
  // 모달 배경
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, width, height);

  // 모달 내용 상자
  const modalWidth = 400;
  const modalHeight = 400;
  const x = (width - modalWidth) / 2;
  const y = (height - modalHeight) / 2;
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, modalWidth, modalHeight);

  // 모달 내용
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over", x + 150, y + 40);
  ctx.fillText("기록", x + 50, y + 85);

  ctx.drawImage(moneyImg, x + 50, y + 110, 40, 40);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`획득 머니 : ${money}개`, x + 100, y + 134);

  ctx.drawImage(hitRateImg, x + 50, y + 170, 40, 40);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`적중률 : ${hitRate}%`, x + 100, y + 196);

  // 0.7%의 투명도를 가진 선 그리기
  ctx.strokeStyle = "gray"; // 선의 색상 설정
  ctx.globalAlpha = 0.7; // 투명도 설정 (0.7%를 0.007로 표현)
  ctx.beginPath();
  ctx.moveTo(x + 40, y + 240); // 선의 시작 위치
  ctx.lineTo(x + 360, y + 240); // 선의 끝 위치
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillText("파괴 아이템", x + 50, y + 280);

  ctx.drawImage(bulletItemImg, x + 50, y + 300, 32, 32);
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`x ${hitBullet}`, x + 90, y + 322);

  ctx.drawImage(bombItemImg, x + 150, y + 300, 32, 32);
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`x ${hitBomb}`, x + 190, y + 322);

  ctx.drawImage(moneyItemImg, x + 250, y + 300, 32, 32);
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`x ${hitMoney}`, x + 290, y + 322);
  // "다시하기" 버튼
  const buttonWidth = 130;
  const buttonHeight = 40;
  const buttonX = x + modalWidth / 2 + buttonWidth;
  const buttonY = y + modalHeight - 40;

  const restartButton = document.createElement("button");
  restartButton.style.position = "absolute";
  restartButton.style.left = `${buttonX}px`;
  restartButton.style.top = `${buttonY}px`;
  restartButton.style.width = `${buttonWidth}px`;
  restartButton.style.height = `${buttonHeight}px`;
  restartButton.style.backgroundColor = "green";
  restartButton.style.color = "white";
  restartButton.innerHTML = "다시하기";
  restartButton.addEventListener("click", () => {
    console.log("click restartButton");
    restartGame();
    document.body.removeChild(restartButton);

    document.location.reload();
  });

  document.body.appendChild(restartButton);
};
