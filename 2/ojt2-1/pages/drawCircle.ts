export const DrawCircle = () => {
  const container = document.createElement("section");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  circle.setAttribute("cx", "300");
  circle.setAttribute("cy", "300");
  circle.setAttribute("r", "200");
  circle.setAttribute("stroke", "red");
  circle.setAttribute("fill", "none");

  path.setAttribute(
    "d",
    "M 50, 200 a -100, 100 0 1, 0 0, 200 a 100, -100 0 1, 0 0 -200"
  );
  path.setAttribute("fill", "none");

  svg.appendChild(circle);
  svg.appendChild(path);
  container.appendChild(svg);
  console.log("drawCircle");
  return container;
};
