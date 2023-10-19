import { handleLoadPage } from "../utils/pagehandler";

const result = () => {
  const container = document.createElement("section");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 1200 800");
  svg.setAttribute("width", "1200");
  svg.setAttribute("height", "800");

  let resultRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  resultRect.setAttribute("width", "400");
  resultRect.setAttribute("height", "600");
  resultRect.setAttribute("x", "400");
  resultRect.setAttribute("y", "40");
  resultRect.setAttribute("fill", "lightgray");
  resultRect.setAttribute("box-shadow", "5px 5px 5px 5px gray");
  svg.appendChild(resultRect);

  let resultTitle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

  resultTitle.setAttribute("x", "564");
  resultTitle.setAttribute("y", "80");
  resultTitle.setAttribute("font-weight", "bold");
  resultTitle.setAttribute("font-size", "32");
  resultTitle.textContent = "결과";
  svg.appendChild(resultTitle);
  for (let i = 0; i < 8; i++) {
    let resultText = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    let calcY = 48 * (i + 1) + 80;
    resultText.setAttribute("x", "560");
    resultText.setAttribute("y", calcY.toString());
    let result = localStorage.getItem(i);
    if (result == "correct") {
      resultText.textContent = `${i + 1}번 -> 🅾️`;
    } else if (result === "wrong") {
      resultText.textContent = `${i + 1}번 -> ❌`;
    } else {
      resultText.textContent = `${i + 1}번 -> ?`;
    }
    svg.appendChild(resultText);
  }

  let goContent = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  goContent.setAttribute("width", "250");
  goContent.setAttribute("height", "50");
  goContent.setAttribute("x", "472");
  goContent.setAttribute("y", "580");
  goContent.setAttribute("fill", "pink");
  goContent.classList.add("button");

  let goContentText = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  goContentText.setAttribute("font-size", "24");
  goContentText.setAttribute("x", "560");
  goContentText.setAttribute("y", "614");
  goContentText.textContent = "다시 풀기";
  goContentText.classList.add("button");
  svg.appendChild(goContent);
  svg.appendChild(goContentText);
  container.appendChild(svg);

  // 다시하기
  goContent.addEventListener("click", function () {
    handleLoadPage("0", 0);
  });
  return container;
};
// 버튼 css
const style = document.createElement("style");
style.innerHTML = `
      /* answerBox에 호버 효과 추가 */    
      .button:hover {
        cursor: pointer; /* 커서 모양을 클릭 가능한 것처럼 변경 */
        font-weight: bold;
      }
      .button:active {
        cursor: pointer; /* 커서 모양을 클릭 가능한 것처럼 변경 */
        fill: skyblue; /* 클릭 가능한 상태에 색상 변경 (예: 연한 파란색) */
        box-shadow: 1px 1px 20px #ddd;
      }
  
    `;

// 스타일 요소를 <head>에 추가
document.head.appendChild(style);

export default result;
