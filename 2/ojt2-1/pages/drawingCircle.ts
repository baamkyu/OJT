export const DrawingCircle = () => {
  const container: HTMLElement = document.createElement("section");
  container.setAttribute("width", "400");
  container.setAttribute("height", "400");
  container.setAttribute("viewBox", "0 0 400 400");

  const svg: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svg.setAttribute("width", "1000");
  svg.setAttribute("height", "800");
  svg.setAttribute("viewBox", "0 0 1000 800");
  svg.id = "svg";

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
    "M 120 20 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
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
  drawPath.setAttribute("stroke-width", "4px");
  drawPath.setAttribute("fill", "none");
  drawPath.setAttribute(
    "d",
    "M 120 20 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
  );
  drawPath.id = "drawPath";
  drawPath.classList.add("circle-line");

  const circlePoint: SVGGraphicsElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circlePoint.setAttribute("r", "10");
  circlePoint.setAttribute("cx", "120");
  circlePoint.setAttribute("cy", "20");
  circlePoint.setAttribute("fill", "red");
  circlePoint.setAttribute("stroke", "#111");
  circlePoint.setAttribute("stroke-width", "4px");

  let drawing = false;

  svg.addEventListener("mousedown", startDrawing);
  svg.addEventListener("mouseup", stopDrawing);
  svg.addEventListener("mousemove", colorDottedPath);

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

      circlePoint.setAttribute(
        "cx",
        best.x < 130 && best.x > 110 && best.y < 30 && best.y > 10
          ? "120"
          : best.x.toString()
      );
      circlePoint.setAttribute(
        "cy",
        best.x < 130 && best.x > 110 && best.y < 30 && best.y > 10
          ? " 20"
          : best.y.toString()
      );
      drawPath.setAttribute(
        "stroke-dashoffset",
        (628.4 - best.length).toString()
      );
      drawPath.setAttribute("stroke-dasharray", "628.4");
    }
  }

  svg.appendChild(dottedPath);
  svg.appendChild(drawPath);
  svg.appendChild(circlePoint);

  container.appendChild(svg);
  console.log("시ㄹ행");

  return container;
};
