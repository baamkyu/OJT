import { handleLoadPage } from "../utils/pagehandler";

// 앞의 숫자 랜덤 돌리기
const randomArray = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8];

  const shuffleArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  return shuffleArray([...nums]);
};

// 콘텐츠 그리기
export const content = (pageIndex) => {
  const container = document.createElement("section");

  // svg에서 사용한 태그들 생성
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const problemGroup = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  // const header = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const selectGroup = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

  // 태그들의 속성 설정
  svg.setAttribute("viewBox", "0 0 1200 800");
  svg.setAttribute("width", "1200");
  svg.setAttribute("height", "800");

  // header.setAttribute('width', '1200')
  // header.setAttribute('height', '80')
  // header.setAttribute('fill', 'green')
  // header.setAttribute('x', '0')
  // header.setAttribute('y', '0')

  let ans = "";
  const redBoxAns = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

  redBoxAns.setAttribute("font-size", "40");
  redBoxAns.setAttribute("x", "676");
  redBoxAns.setAttribute("y", "292");
  redBoxAns.textContent = ans;
  svg.appendChild(redBoxAns);

  const changeRedBoxAns = (value) => {
    // 결과 페이지로 이동
    if (pageIndex + 1 > 2) {
      handleLoadPage("1");
      return;
    }

    redBoxAns.textContent = value;
    setTimeout(function () {
      handleLoadPage("0", pageIndex + 1);
    }, 1000);
  };

  // 랜덤으로 돌아갈 문제 배열
  // 배열의 첫번째부터 시작해서 배열의 끝부분까지 반복문
  // problemNum = 배열의 인덱스 번호
  // circleLength = 배열의 값 (문제 앞에 올 수)
  // const num = randomArray()
  const num = randomArray();
  let problemNum = pageIndex; // 문제 번호
  let orangeNum = num[problemNum];
  console.log(problemNum);

  for (let circleLength = 0; circleLength < orangeNum; circleLength++) {
    var cx = 16 + 24 * circleLength;
    var orangeCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    orangeCircle.setAttribute("cx", cx);
    orangeCircle.setAttribute("cy", 176);
    orangeCircle.setAttribute("r", 5); // 반지름을 설정하세요.
    orangeCircle.setAttribute("fill", "orange");
    problemGroup.appendChild(orangeCircle);
  }

  // 주황 동그라미 개수를 이용해 중간 찾기, 가운데정렬
  let centerCalc = (1200 - (orangeNum * 24 + 68)) / 2;
  problemGroup.setAttribute(
    "transform",
    `matrix(1, 0, 0, 1, ${centerCalc}, 0)`
  );

  // 한 번만 그려도 되는 요소들
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("font-size", "40");
  text.setAttribute("x", "532");
  text.setAttribute("y", "292");
  text.textContent = `${orangeNum} + 1 =`;
  svg.appendChild(text);

  // 파란 동그라미
  let blueCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  let blueCirclex = 56 + 24 * orangeNum;
  blueCircle.setAttribute("cx", blueCirclex.toString());
  blueCircle.setAttribute("cy", 176);
  blueCircle.setAttribute("r", 5); // 반지름을 설정하세요.
  blueCircle.setAttribute("fill", "blue");
  problemGroup.appendChild(blueCircle);

  // 왼쪽 테두리
  let leftRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  let leftRectWidth = 8 + 24 * orangeNum;
  leftRect.setAttribute("width", leftRectWidth.toString());
  leftRect.setAttribute("height", "32");
  leftRect.setAttribute("fill", "none");
  leftRect.setAttribute("stroke", "skyblue");
  leftRect.setAttribute("stroke-width", "2");
  leftRect.setAttribute("rx", "15");
  leftRect.setAttribute("ry", "15");
  leftRect.setAttribute("x", "0");
  leftRect.setAttribute("y", "160");
  problemGroup.appendChild(leftRect);

  // 오른쪽 테두리
  let rightRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  rightRect.setAttribute("rx", "15");
  rightRect.setAttribute("ry", "15");
  let rightRectx = 40 + 24 * orangeNum;
  rightRect.setAttribute("x", rightRectx.toString());
  rightRect.setAttribute("y", "160");
  rightRect.setAttribute("width", "32");
  rightRect.setAttribute("height", "32");
  rightRect.setAttribute("fill", "none");
  rightRect.setAttribute("stroke", "skyblue");
  rightRect.setAttribute("stroke-width", "2");
  problemGroup.appendChild(rightRect);

  // 가운데 커브
  let curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let curvex1 = blueCirclex - 56;
  curve.setAttribute(
    "d",
    `M${curvex1},160 Q${curvex1 + 28},120 ${curvex1 + 56},160`
  );
  curve.setAttribute("stroke", "skyblue");
  curve.setAttribute("fill", "none");
  curve.setAttribute("stroke-width", "2");
  curve.setAttribute("stroke-linecap", "round");
  problemGroup.appendChild(curve);

  // 사용자가 선택한 정답
  let clickedValue = 0;

  // 문제 부분

  // 정답 담는 빨간 박스
  let redBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  redBox.setAttribute("x", "664");
  redBox.setAttribute("y", "252");
  redBox.setAttribute("width", "48");
  redBox.setAttribute("height", "48");
  redBox.setAttribute("fill", "none");
  redBox.setAttribute("stroke", "red");
  redBox.setAttribute("stroke-width", "2");
  svg.appendChild(redBox);

  let selectBoxBG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  selectBoxBG.setAttribute("fill", "gray");
  selectBoxBG.setAttribute("x", "64");
  selectBoxBG.setAttribute("y", "492");
  selectBoxBG.setAttribute("width", "656");
  selectBoxBG.setAttribute("height", "80");
  selectGroup.appendChild(selectBoxBG);

  for (let i = 1; i < 10; i++) {
    let selectBox = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

    selectBox.setAttribute("fill", "lightgray");
    selectBox.setAttribute("x", 72 * i);
    selectBox.setAttribute("y", "500");
    selectBox.setAttribute("width", "64");
    selectBox.setAttribute("height", "64");
    selectBox.classList.add("answerStyle");

    selectGroup.appendChild(selectBox);

    let selectText = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    selectText.textContent = i;
    selectText.setAttribute("font-size", "36");
    selectText.setAttribute("x", 22 + 72 * i);
    selectText.setAttribute("y", "546");
    selectText.classList.add("answerStyle");

    selectBox.addEventListener("click", function () {
      clickedValue = i;
      changeRedBoxAns(clickedValue);
      // console.log("클릭한 answerBox의 값: " + i);

      // 정답/오답 확인
      if (orangeNum + 1 === i) {
        console.log("ok");
      } else {
        console.log("no");
      }
    });
    selectText.addEventListener("click", function () {
      clickedValue = i;
      changeRedBoxAns(clickedValue);
      // console.log("클릭한 answerBox의 값: " + i);
      // 정답/오답 확인
      if (orangeNum + 1 === i) {
        console.log("ok");
      } else {
        console.log("no");
      }
    });
    selectGroup.appendChild(selectText);
  }
  selectGroup.setAttribute("transform", `matrix(1, 0, 0, 1, 240, 0)`);

  svg.appendChild(problemGroup);
  svg.appendChild(selectGroup);
  container.appendChild(svg);

  console.log(clickedValue);

  // app div에 container 추가
  //   document.querySelector("#app").appendChild(container);
  return container;
};

// 버튼 css
const style = document.createElement("style");
style.innerHTML = `
      /* answerBox에 호버 효과 추가 */    
      .answerStyle:hover {
        cursor: pointer; /* 커서 모양을 클릭 가능한 것처럼 변경 */
      }
      .answerStyle:active {
        cursor: pointer; /* 커서 모양을 클릭 가능한 것처럼 변경 */
        fill: skyblue; /* 클릭 가능한 상태에 색상 변경 (예: 연한 파란색) */
      }
  
    `;

// 스타일 요소를 <head>에 추가
document.head.appendChild(style);

// content();
