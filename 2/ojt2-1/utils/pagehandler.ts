import { DrawCircle } from "../pages/drawCircle";

let queryIndex = 0;
let pageIndex = 0;
export const handleLoadPage = (pageIndex, queryIndex) => {
  const parent = document.querySelector("#main-section");

  queryIndex = 0;
  if (!parent) return;
  if (parent.hasChildNodes()) {
    handleRemovePage(parent);
  }

  switch (pageIndex) {
    case "0":
      parent.appendChild(DrawCircle(queryIndex));
      break;
    // case "1":
    //   parent.appendChild(result());
    //   break;
    default:
      break;
  }
};

const handleRemovePage = (parent) => {
  parent.replaceChildren();
};
