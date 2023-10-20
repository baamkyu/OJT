const App = () => {
  const section = document.createElement("section");

  section.id = "main-section";
  document.querySelector<HTMLDivElement>("#app")?.appendChild(section);
};
export default App;
