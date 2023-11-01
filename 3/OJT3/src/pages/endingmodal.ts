// type TOptions = {
//   money: number;
//   hitRate: number
// };
import { Play } from "../pages/play";

export const EndingModal = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  money: number,
  hitRate: number
) => {
  // 모달 배경
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, width, height);

  // 모달 내용 상자
  const modalWidth = 400;
  const modalHeight = 200;
  const x = (width - modalWidth) / 2;
  const y = (height - modalHeight) / 2;
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, modalWidth, modalHeight);

  // 모달 내용
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over", x + 150, y + 30);
  ctx.fillText(`Money: ${money}`, x + 50, y + 60);
  ctx.fillText(`Hit Rate: ${hitRate}%`, x + 50, y + 90);

  // "다시하기" 버튼
  const buttonWidth = 100;
  const buttonHeight = 30;
  const buttonX = x + (modalWidth - buttonWidth) / 2;
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
    // "다시하기" 버튼을 클릭했을 때의 동작
    // 예: 게임 리셋
    document.location.reload();
  });

  document.body.appendChild(restartButton);
};
