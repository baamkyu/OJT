import { DrawCircle } from "../pages/drawCircle";
import { DrawingCircle } from "../pages/drawingCircle";

const App = () => {
  const section = document.createElement("section");

  section.id = "main-section";
  document.querySelector<HTMLDivElement>("#app")?.appendChild(section);

  const svg: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 1200 800");
  svg.id = "svg";
  svg.appendChild(DrawCircle());
  svg.appendChild(DrawingCircle());
  section.append(svg);
};
export default App;
