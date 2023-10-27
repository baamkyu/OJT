// import { Test } from "../../../3/OJT3/src/pages/test";
import { Play } from "../../OJT3/src/pages/play";

const App = () => {
  const canvas = document.createElement("canvas");
  canvas.id = "myCanvas";
  canvas.setAttribute("width", "800");
  canvas.setAttribute("height", "740");

  document.body.appendChild(canvas); // 캔버스를 DOM에 추가
  Play();
  // Test();
};
export default App;
