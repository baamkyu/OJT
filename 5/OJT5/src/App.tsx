import "./App.css";
import { Provider } from "jotai";
import FabricCanvas from "./components/toolbox/FabricCanvas";
import DefaultTool from "./components/toolbox/DefaultTool";
import AddButton from "./components/answer/AddButton";
import AnswerSelections from "./components/answer/AnswerSelections";

function App() {
  return (
    <Provider>
      <DefaultTool />
      <FabricCanvas />
      <AddButton />
      <AnswerSelections />
    </Provider>
  );
}

export default App;
