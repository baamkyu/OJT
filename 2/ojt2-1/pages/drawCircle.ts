export const DrawCircle = () => {
  const firstGroup: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

  // 따라 그릴 기본 점으로 된 원
  const dottedCircle: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  dottedCircle.setAttribute("cx", "200");
  dottedCircle.setAttribute("cy", "200");
  dottedCircle.setAttribute("r", "100");
  dottedCircle.setAttribute("fill", "none");
  dottedCircle.setAttribute("stroke", "gray");
  dottedCircle.setAttribute("stroke-width", "2");
  dottedCircle.setAttribute("stroke-dasharray", "20 8");

  // 애니메이션에 사용될 요소들 담을 그룹 생성
  const firstAnimationGroup: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

  const pencil: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  pencil.setAttribute("x", "-24");
  pencil.setAttribute("y", "0");
  pencil.setAttribute("font-size", "24");
  pencil.textContent = "✏️";

  let currentX: number = -24; // 초기 x 좌표
  let currentY: number = 0; // 초기 y 좌표

  // 애니메이션 시작 전에 초기 위치를 설정
  pencil.setAttribute("x", currentX.toString());
  pencil.setAttribute("y", currentY.toString());

  const pencilMotion: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animateMotion"
  );
  pencilMotion.setAttribute("repeatCount", "1");
  pencilMotion.setAttribute("dur", "4s");

  const mpath: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "mpath"
  );
  mpath.setAttribute("href", "#pencilLine");

  pencilMotion.appendChild(mpath);
  pencil.appendChild(pencilMotion);
  firstAnimationGroup.appendChild(pencil);

  // 연필의 회전 루트
  const pencilLine: any = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pencilLine.setAttribute("x", "0");
  pencilLine.setAttribute("y", "0");
  pencilLine.setAttribute("stroke", "#DB555B");
  pencilLine.setAttribute("stroke-linecap", "round");
  pencilLine.setAttribute("stroke-width", "6");
  pencilLine.setAttribute("fill", "none");
  pencilLine.setAttribute(
    "d",
    "M 0 0 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
  );

  pencilLine.id = "pencilLine";
  pencilLine.setAttribute("fill", "none");
  pencilLine.classList.add("moving-circle");

  pencilLine.onanimationend = () => {
    // firstAnimationGroup.removeChild(pencil);
    const finishUIGroup: SVGElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    const correctUI: SVGElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    correctUI.setAttribute("font-size", "36");
    correctUI.setAttribute("font-weight", "bold");
    correctUI.setAttribute("fill", "#01B41F");
    correctUI.setAttribute("x", "320");
    correctUI.setAttribute("y", "140");
    correctUI.textContent = "O";

    const speechBubbleIcon: SVGElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image"
    );
    speechBubbleIcon.setAttribute("href", "../src/icons/speechBubble.png");
    speechBubbleIcon.setAttribute("width", "64");
    speechBubbleIcon.setAttribute("height", "64");
    speechBubbleIcon.setAttribute("x", "302");
    speechBubbleIcon.setAttribute("y", "100");

    finishUIGroup.appendChild(speechBubbleIcon);
    finishUIGroup.appendChild(correctUI);
    firstGroup.appendChild(finishUIGroup);
  };

  // 원의 길이 탐색
  // console.log(pencilLine.getTotalLength());

  firstAnimationGroup.appendChild(pencilLine);

  firstAnimationGroup.appendChild(pencil);
  firstAnimationGroup.setAttribute("transform", "translate(200 100)");

  firstGroup.appendChild(dottedCircle);
  firstGroup.appendChild(firstAnimationGroup);

  return firstGroup;
};

// 원 그리기
const style: HTMLElement = document.createElement("style");
style.innerHTML = `
    .moving-circle {
      stroke-dasharray: 628;
      animation: stroke-ani 4s linear; 
    }

    @keyframes stroke-ani {
      from {
        stroke-dashoffset: 628; 
      }
      to {
        stroke-dashoffset: 0;
      }
    }
    `;

// 스타일 요소를 <head>에 추가
document.head.appendChild(style);
