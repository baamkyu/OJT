


// 앞의 숫자 랜덤 돌리기
const randomArray = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8];

  const shuffleArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const j = Math.floor(Math.random() * (i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }
  return shuffleArray([...nums])
}


const content = () => {

      const container = document.createElement("section");

      // svg에서 사용한 태그들 생성
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const problemGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      // const rightRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      // const curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // const orangeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      // const blueCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

      // 태그들의 속성 설정
      svg.setAttribute('viewBox', '0 0 1200 800')
      svg.setAttribute('width', '1200')
      svg.setAttribute('height', '800')


      // 랜덤으로 돌아갈 문제 배열
      // 배열의 첫번째부터 시작해서 배열의 끝부분까지 반복문
      // problemNum = 배열의 인덱스 번호
      // circleLength = 배열의 값 (문제 앞에 올 수)
      const num = randomArray()
      for (let problemNum=0; problemNum<num.length;){ 
        for (let circleLength=0; circleLength<num[problemNum]; circleLength++){
          var cx = 16 + 24*(circleLength)
          var orangeCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          orangeCircle.setAttribute('cx', cx);
          orangeCircle.setAttribute('cy', 176);
          orangeCircle.setAttribute('r', 5); // 반지름을 설정하세요.
          orangeCircle.setAttribute('fill', 'orange');

          problemGroup.appendChild(orangeCircle);

          var centerCalc = (1200 - (circleLength*24 + 68)) / 2
          
          problemGroup.setAttribute('transform', `matrix(1, 0, 0, 1, ${centerCalc}, 0)`)

          // 한 번만 그려도 되는 것들
          if (circleLength === 0) {
            // 파란 동그라미
            var blueCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            var blueCirclex = 56 + 24*num[problemNum]    
            blueCircle.setAttribute('cx', blueCirclex.toString());
            blueCircle.setAttribute('cy', 176); 
            blueCircle.setAttribute('r', 5); // 반지름을 설정하세요.
            blueCircle.setAttribute('fill', 'blue');
            problemGroup.appendChild(blueCircle);
            
            // 왼쪽 테두리
            var leftRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var leftRectWidth = 8 + 24*num[problemNum]
            leftRect.setAttribute('width', leftRectWidth.toString())
            leftRect.setAttribute('height', '32')
            leftRect.setAttribute('fill', 'none')
            leftRect.setAttribute('stroke', 'skyblue')
            leftRect.setAttribute('stroke-width', '2')
            leftRect.setAttribute('rx', '15')
            leftRect.setAttribute('ry', '15')
            leftRect.setAttribute('x', '0')
            leftRect.setAttribute('y', '160')
            problemGroup.appendChild(leftRect);

            // 오른쪽 테두리
            var rightRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rightRect.setAttribute('rx', '15')
            rightRect.setAttribute('ry', '15')
            var rightRectx = 40 + 24*num[problemNum]      
            rightRect.setAttribute('x', rightRectx.toString())
            rightRect.setAttribute('y', '160')
            rightRect.setAttribute('width', '32')
            rightRect.setAttribute('height', '32')
            rightRect.setAttribute('fill', 'none')
            rightRect.setAttribute('stroke', 'skyblue')
            rightRect.setAttribute('stroke-width', '2')
            problemGroup.appendChild(rightRect);
      
            // 가운데 커브
            var curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
            var curvex1 = blueCirclex - 56
            curve.setAttribute('d', `M${curvex1},160 Q${curvex1+28},120 ${curvex1+56},160`)
            curve.setAttribute('stroke', 'skyblue')
            curve.setAttribute('fill', 'none')
            curve.setAttribute('stroke-width', '2')
            curve.setAttribute('stroke-linecap', 'round')
            problemGroup.appendChild(curve);

            // 아래 문제 글씨
            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('font-size', '40')
            text.setAttribute('x', '536')
            text.setAttribute('y', '290')
            text.textContent = num[problemNum] + ' + 1 ='
            svg.appendChild(text)

            // 정답 담는 빨간 박스
            var redBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');       
            redBox.setAttribute('x', '664')
            redBox.setAttribute('y', '252')
            redBox.setAttribute('width', '48')
            redBox.setAttribute('height', '48')
            redBox.setAttribute('fill', 'none')
            redBox.setAttribute('stroke', 'red')
            redBox.setAttribute('stroke-width', '2')
            svg.appendChild(redBox);


          }

        }
        break
        // 유저가 정답을 골랐을 때 다음 문제로 이동
        if (userClicked) {
          i++;
        }
      }

      svg.appendChild(problemGroup)
      container.appendChild(svg);

      // app div에 container 추가
      document.querySelector("#app").appendChild(container);
      document.querySelector('#app').appendChild(Solving);

  }

content()





