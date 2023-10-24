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
  dottedCircle.setAttribute("stroke", "red");
  dottedCircle.setAttribute("stroke-width", "3px");
  dottedCircle.setAttribute("stroke-dasharray", "20 8");

  // 점으로 된 원을 기준으로 새로 생길 요소들
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
  const pencilLine: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pencilLine.setAttribute("x", "0");
  pencilLine.setAttribute("y", "0");
  pencilLine.setAttribute("stroke", "red");
  pencilLine.setAttribute("stroke-linecap", "round");
  pencilLine.setAttribute("stroke-width", "4");
  pencilLine.setAttribute("fill", "none");
  pencilLine.setAttribute(
    "d",
    "M 0 0 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
  );

  pencilLine.id = "pencilLine";
  pencilLine.setAttribute("fill", "none");
  pencilLine.classList.add("moving-circle");

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
