export const DrawingCircle = () => {
  const secondGroup: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

  const dottedPath: SVGPathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  dottedPath.setAttribute("x", "0");
  dottedPath.setAttribute("y", "0");
  dottedPath.setAttribute("stroke", "gray");
  dottedPath.setAttribute("stroke-linecap", "round");
  dottedPath.setAttribute("stroke-width", "2px");
  dottedPath.setAttribute("stroke-dasharray", "10, 10");
  dottedPath.setAttribute("fill", "none");
  dottedPath.setAttribute(
    "d",
    "M 600 100 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
  );

  dottedPath.id = "dottedPath";

  const drawPath: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  drawPath.setAttribute("x", "0");
  drawPath.setAttribute("y", "0");
  drawPath.setAttribute("stroke", "red");
  drawPath.setAttribute("stroke-linecap", "round");
  drawPath.setAttribute("stroke-width", "6");
  drawPath.setAttribute("fill", "none");
  drawPath.setAttribute("stroke-dashoffset", "628.4");
  drawPath.setAttribute("stroke-dasharray", "628.4");
  drawPath.setAttribute(
    "d",
    "M 600 100 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
  );
  drawPath.id = "drawPath";
  drawPath.classList.add("circle-line");

  const circlePoint: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circlePoint.setAttribute("r", "10");
  circlePoint.setAttribute("cx", "600");
  circlePoint.setAttribute("cy", "100");
  circlePoint.setAttribute("fill", "pink");
  circlePoint.setAttribute("stroke", "#111");
  circlePoint.setAttribute("stroke-width", "1");

  const circlePointIcon: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );
  circlePointIcon.setAttribute("href", "../src/icons/arrowWhite.png");
  // circlePointIcon.setAttribute("transform", "rotate(agree 600 100)");
  circlePointIcon.setAttribute("width", "20");
  circlePointIcon.setAttribute("height", "20");
  circlePointIcon.setAttribute("x", "590");
  circlePointIcon.setAttribute("y", "90");

  let drawing = false;

  secondGroup.addEventListener("mousedown", startDrawing);
  secondGroup.addEventListener("mouseup", stopDrawing);
  secondGroup.addEventListener("mousemove", colorDottedPath);

  function startDrawing() {
    // 나중에 원과의 거리를 통해 유효한 클릭인지를 검토하는 로직 추가해야함
    drawing = true;
  }
  function stopDrawing() {
    drawing = false;
  }

  function closestPoint(
    pathNode: SVGPathElement,
    point: [number, number]
  ): { x: number; y: number; distance: number; length: number } {
    const pathLength = pathNode.getTotalLength();
    let precision = 8;
    let best: DOMPoint | undefined | any;
    let bestLength: number | undefined;
    let bestDistance = Infinity;

    // Linear scan for coarse approximation
    for (
      let scan: DOMPoint, scanLength = 0, scanDistance;
      scanLength <= pathLength;
      scanLength += precision
    ) {
      scan = pathNode.getPointAtLength(scanLength);
      scanDistance = distance2(scan);
      if (scanDistance < bestDistance) {
        best = scan;
        bestLength = scanLength;
        bestDistance = scanDistance;
      }
    }

    // Binary search for precise estimate
    precision /= 2;
    while (precision > 0.5) {
      let before: DOMPoint | undefined;
      let after: DOMPoint | undefined;
      let beforeLength: number | undefined;
      let afterLength: number | undefined;
      let beforeDistance: number | undefined;
      let afterDistance: number | undefined;
      if ((beforeLength = (bestLength || 0) - precision) >= 0) {
        before = pathNode.getPointAtLength(beforeLength);
        beforeDistance = distance2(before);
        if (beforeDistance < bestDistance) {
          best = before;
          bestLength = beforeLength;
          bestDistance = beforeDistance;
        }
      }
      if ((afterLength = (bestLength || 0) + precision) <= pathLength) {
        after = pathNode.getPointAtLength(afterLength);
        afterDistance = distance2(after);
        if (afterDistance < bestDistance) {
          best = after;
          bestLength = afterLength;
          bestDistance = afterDistance;
        }
      }
      precision /= 2;
    }

    if (best) {
      best["distance"] = Math.sqrt(bestDistance);
    } else {
      best = new DOMPoint(0, 0, 0);
      best["distance"] = 0;
    }
    best["length"] = bestLength;

    return {
      x: best.x,
      y: best.y,
      distance: best["distance"],
      length: best["length"],
    };

    function distance2(p: DOMPoint) {
      const dx = p.x - point[0];
      const dy = p.y - point[1];
      return dx * dx + dy * dy;
    }
  }

  function colorDottedPath(event: MouseEvent) {
    if (drawing) {
      // svg 좌표로 변환
      const svg: any = document.getElementById("svg");
      // 마우스 이벤트의 클라이언트 좌표 가져오기
      const clientX = event.clientX;
      const clientY = event.clientY;

      // 클라이언트 좌표를 SVG 좌표로 변환
      const svgPoint = svg.createSVGPoint();
      svgPoint.x = clientX;
      svgPoint.y = clientY;

      // 클라이언트 좌표를 SVG 좌표로 변환
      const transformedPoint = svgPoint.matrixTransform(
        svg.getScreenCTM().inverse()
      );
      // 변환된 좌표 사용
      const mouseX: number = transformedPoint.x;
      const mouseY: number = transformedPoint.y;

      let best = closestPoint(dottedPath, [mouseX, mouseY]);
      console.log(best);
      if (best.distance < 50) {
        // 시작점 주변에서 움직일 경우 시작점으로
        circlePoint.setAttribute(
          "cx",
          best.x < 150 && best.x > 90 && best.y < 40 && best.y > 0
            ? "120"
            : best.x.toString()
        );

        circlePoint.setAttribute(
          "cy",
          best.x < 150 && best.x > 90 && best.y < 40 && best.y > 0
            ? " 20"
            : best.y.toString()
        );

        let agree = -(best.length / 628.4) * 360;
        circlePointIcon.setAttribute(
          "transform",
          `rotate(${agree} ${best.x} ${best.y})`
        );

        circlePointIcon.setAttribute("x", (best.x - 10).toString());
        circlePointIcon.setAttribute("y", (best.y - 10).toString());
        // console.log(best.x, best.y);
        drawPath.setAttribute(
          "stroke-dashoffset",
          best.x < 140 && best.x > 100 && best.y < 30 && best.y > 10
            ? "0"
            : (628.4 - best.length).toString()
        );
        drawPath.setAttribute("stroke-dasharray", "628.4");

        console.log("동작");
      }

      // 짝수바퀴째 인 경우 = (1256.8 - best.length).toString()
    }
  }

  function calcAngle(x1: number, y1: number, x2: number, y2: number): number {
    const x: number = x2 - x1;
    const y: number = y2 - y1;
    const angle: number = Math.atan2(x, y);
    return angle;
  }

  console.log("calcAngle", calcAngle(600, 100, 505, 231));

  secondGroup.appendChild(dottedPath);
  secondGroup.appendChild(drawPath);
  secondGroup.appendChild(circlePoint);
  secondGroup.appendChild(circlePointIcon);

  console.log("시ㄹ행");

  return secondGroup;
};
