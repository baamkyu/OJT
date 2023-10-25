import { Test } from "../../../3/OJT3/src/pages/test";

const App = () => {
  const canvas = document.createElement("canvas");
  canvas.id = "myCanvas";
  document.body.appendChild(canvas); // 캔버스를 DOM에 추가

  Test();
};
export default App;
