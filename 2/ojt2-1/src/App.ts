import { DrawCircle } from "../pages/drawCircle";
import { DrawingCircle } from "../pages/drawingCircle";

const App = () => {
  const section = document.createElement("section");

  section.id = "main-section";
  document.querySelector<HTMLDivElement>("#app")?.appendChild(section);
  section.appendChild(DrawCircle());
  section.appendChild(DrawingCircle());
  console.log("section에 drawcircle 넣는 함수 작동");
};
export default App;
