import "./App.css";
import { Provider } from "jotai";
import FabricCanvas from "./components/toolbox/FabricCanvas";
import ToolBox from "./components/toolbox/ToolBox";
import AddButton from "./components/answer/AddButton";
import AnswerBox from "./components/answer/answerBox";

function App() {
  return (
    <Provider>
      <ToolBox />
      <div className="flex flex-row">
        <FabricCanvas />
        <AddButton />
        <AnswerBox />
      </div>
    </Provider>
  );
}

export default App;
