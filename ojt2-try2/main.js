// Solving 클래스 정의
class Header {
  template() {
      return `
          <div>
            <style>
              .header-div {
                width: 100%;
                max-width: 1200px;
                background-color: green;
                display: flex;
                justify-content: center;
                font-size: 32px;
              }
              .title{
                font-size: 28px;
              }
              .btn-div{
                position: absolute;
                left: 160px;
                bottom: 80px;
                width: 600px;
                height: 68px;
                background-color: lightgray;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .btn-style{
                width: 56px;
                height: 56px;
                margin: 0 4px 0 4px;
                font-size: 28px;
                background-color: white;
                border: none;
                box-shadow: 1px 1px 2px 1px gray;
                color: blue;
              } .btn-style:hover {
                box-shadow: 2px 3px 4px 4px gray;
              }

              .header-star{
                width: 95%;
                display: flex;
                justify-content: center;
              }
              .header-exit{
                width: 5%;
                font-size: 24px;
                font-weight: bold;
                background-color: green;
                border: none;
              } .header-exit:hover{
                background-color: red;
                border: black;
              }
            </style>
            <div class="header-div">
              <div class="header-star">✮✮✮✮✮✰✰✰</div>
              <button class="header-exit">⤦</button>
            </div>
            <p class="title">🔔 다음 덧셈을 하세요.</p>
            <div class="btn-div">
              <button class="btn-style">1</button>
              <button class="btn-style">2</button>
              <button class="btn-style">3</button>
              <button class="btn-style">4</button>
              <button class="btn-style">5</button>
              <button class="btn-style">6</button>
              <button class="btn-style">7</button>
              <button class="btn-style">8</button>
              <button class="btn-style">9</button>
            </div>
          </div>
      `;
  }
  render() {
    const container = document.createElement('div');
    container.innerHTML = this.template();
    return container;
  }
}


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
      const header = new Header();
      const headerElement = header.render();
      document.querySelector('#app').appendChild(headerElement)

      const container = document.createElement("section");

      // svg에서 사용한 태그들 생성
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      // const rightRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      // const curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // const orangeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      // const blueCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

      // 태그들의 속성 설정
      svg.setAttribute('viewBox', '0 0 1200 800')
      svg.setAttribute('width', '1200')
      svg.setAttribute('height', '800')



      const num = randomArray()

      for (let i=0; i<num.length;){ 
        for (let j=0; j<num[i]; j++){
          var cx = 428 - 24*(j+1)
          var orangeCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          orangeCircle.setAttribute('cx', cx);
          orangeCircle.setAttribute('cy', 335);
          orangeCircle.setAttribute('r', 5); // 반지름을 설정하세요.
          orangeCircle.setAttribute('fill', 'orange');

          svg.appendChild(orangeCircle);

          // 한 번만 그려도 되는 것들
          if (j === 0) {
            // 파란 동그라미
            var blueCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            blueCircle.setAttribute('cx', 480);
            blueCircle.setAttribute('cy', 335); 
            blueCircle.setAttribute('r', 5); // 반지름을 설정하세요.
            blueCircle.setAttribute('fill', 'blue');
            svg.appendChild(blueCircle);
            
            // 왼쪽 테두리
            var leftRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var leftRectWidth = 8 + 24*num[i]
            leftRect.setAttribute('width', leftRectWidth.toString())
            leftRect.setAttribute('height', '32')
            leftRect.setAttribute('fill', 'none')
            leftRect.setAttribute('stroke', 'skyblue')
            leftRect.setAttribute('stroke-width', '2')
            leftRect.setAttribute('rx', '15')
            leftRect.setAttribute('ry', '15')
            // 왼쪽 테두리의 x 좌표
            var leftRectx = 420 - leftRectWidth  
            leftRect.setAttribute('x', leftRectx.toString())
            leftRect.setAttribute('y', '320')
            svg.appendChild(leftRect);

            // 오른쪽 테두리
            var rightRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rightRect.setAttribute('rx', '15')
            rightRect.setAttribute('ry', '15')            
            rightRect.setAttribute('x', '465')
            rightRect.setAttribute('y', '320')
            rightRect.setAttribute('width', '32')
            rightRect.setAttribute('height', '32')
            rightRect.setAttribute('fill', 'none')
            rightRect.setAttribute('stroke', 'skyblue')
            rightRect.setAttribute('stroke-width', '2')
            svg.appendChild(rightRect);
      
            // 가운데 커브
            var curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
            curve.setAttribute('d', 'M412,320 Q442,280 472,320')
            curve.setAttribute('stroke', 'skyblue')
            curve.setAttribute('fill', 'none')
            curve.setAttribute('stroke-width', '2')
            curve.setAttribute('stroke-linecap', 'round')
            svg.appendChild(curve);

            // 아래 문제 글씨
            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('font-size', '40')
            text.setAttribute('x', '360')
            text.setAttribute('y', '450')
            text.textContent = num[i] + ' + 1 ='
            svg.appendChild(text)

            // 정답 담는 빨간 박스
            var redBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');       
            redBox.setAttribute('x', '484')
            redBox.setAttribute('y', '412')
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

      
      container.appendChild(svg);

      // app div에 container 추가
      document.querySelector("#app").appendChild(container);
      document.querySelector('#app').appendChild(Solving);
  }

content()





