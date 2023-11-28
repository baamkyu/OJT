import "./App.css";
import { Provider } from "jotai";
import FabricCanvas from "./components/toolbox/FabricCanvas";
import ToolBox from "./components/toolbox/ToolBox";
import AddButton from "./components/answer/AddButton";
import AnswerSelections from "./components/answer/AnswerSelections";

function App() {
  return (
    <Provider>
      <ToolBox />
      <FabricCanvas />
      <AddButton />
      <AnswerSelections />
    </Provider>
  );
}

export default App;
