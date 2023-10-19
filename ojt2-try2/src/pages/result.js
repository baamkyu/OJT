import { handleLoadPage } from "../utils/pagehandler";

const result = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("viewBox", "0 0 1200 800");
  svg.setAttribute("width", "1200");
  svg.setAttribute("height", "800");

  const container = document.createElement("section");
  container.textContent = "hello";
  let goContent = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );

  goContent.setAttribute("width", "200");
  goContent.setAttribute("height", "50");
  goContent.setAttribute("x", "200");
  goContent.setAttribute("y", "200");
  goContent.setAttribute("fill", "pink");

  svg.appendChild(goContent);
  container.appendChild(svg);

  // 다시하기
  goContent.addEventListener("click", function () {
    handleLoadPage("0", 0);
  });
  return container;
};

export default result;
