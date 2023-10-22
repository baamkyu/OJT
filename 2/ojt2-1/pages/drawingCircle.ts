export const DrawingCircle = () => {
  const container: HTMLElement = document.createElement(
    "section"
  ) as HTMLElement;
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

  const dottedPath: SVGElement = document.createElementNS(
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

  const circle: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("r", "10");
  circle.setAttribute("cx", "120");
  circle.setAttribute("cy", "20");
  circle.setAttribute("fill", "red");
  circle.setAttribute("stroke", "#111");
  circle.setAttribute("stroke-width", "4px");

  document.addEventListener("DOMContentLoaded", function () {
    // getElementById를 사용하여 요소를 가져오는 코드를 여기에 배치합니다.

    // 요소를 가져온 후, 그 이후의 로직을 수행할 수 있습니다.
    let a: any = document.getElementById("circle");
    console.log(a.getScreenCTM().inverse());
  });

  svg.appendChild(dottedPath);
  svg.appendChild(drawPath);
  svg.appendChild(circle);
  container.appendChild(svg);
  console.log("시ㄹ행");

  // console.log(a.getScreenCTM());
  return container;
};
