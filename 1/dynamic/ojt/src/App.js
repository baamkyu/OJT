import { handleLoadPage } from "./utils/pagehandler";

const App = () => {
  const section = document.createElement("section");
  let pageIndex = localStorage.getItem("pageIndex") ?? "0";

  section.id = "main-section";
  section.style.width = "100%";
  section.style.height = "100%";
  document.querySelector("#app")?.appendChild(section);
  handleLoadPage(pageIndex, 0);
};
export default App;
