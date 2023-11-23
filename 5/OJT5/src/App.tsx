import "./App.css";
import { Provider } from "jotai";
import FabricCanvas from "./components/FabricCanvas";
import DefaultTool from "./components/DefaultTool";

function App() {
  return (
    <Provider>
      <DefaultTool />
      <FabricCanvas />
    </Provider>
  );
}

export default App;
