
class Solving {
    template() {
        return `
            <div class="solving-title">
                <span>🔔 다음 덧셈을 하세요.</span>
                <button class="moveToMainPage">exit</button>
            </div>
        `;
    }
}

export const content = () => {
    
    const init = () => {
        const container = document.createElement("section");

        // svg에서 사용한 태그들 생성
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const rightRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const underLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const orangeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const blueCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        // 태그들의 속성 설정
        orangeCircle.setAttribute('r', '5')
        orangeCircle.setAttribute('fill', 'orange')
        blueCircle.setAttribute('r', '5')
        blueCircle.setAttribute('fill', 'blue')

        rightRect.setAttribute('rx', '15')
        rightRect.setAttribute('ry', '15')
        rightRect.setAttribute('width', '32')
        rightRect.setAttribute('height', '32')
        rightRect.setAttribute('fill', 'none')
        rightRect.setAttribute('stroke', 'skyblue')
        rightRect.setAttribute('stroke-width', '2')

        curve.setAttribute('d', 'M 0 0 Q 24 -40 48 0')
        curve.setAttribute('stroke', 'skyblue')
        curve.setAttribute('fill', 'none')
        curve.setAttribute('stroke-width', '2')
        curve.setAttribute('stroke-linecap', 'round')
        
        underLine.setAttribute('x1', '0')
        underLine.setAttribute('y1', '32')
        underLine.setAttribute('x2', '56')
        underLine.setAttribute('y2', '32')
        underLine.setAttribute('stroke', 'skyblue')
        underLine.setAttribute('stroke-width', '2')

        // SVG를 container에 추가
        svg.appendChild(orangeCircle);
        svg.appendChild(blueCircle);
        svg.appendChild(rightRect);
        svg.appendChild(underLine);
        
        container.appendChild(svg);

        // app div에 container 추가
        document.querySelector("#app").appendChild(container);    
    }
    init();

}
// export default new Solving();
