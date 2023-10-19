import { content } from "../pages/content";
import result from "../pages/result";

export const handleLoadPage = (pageIndex, queryIndex) => {
  const parent = document.querySelector("#main-section");

  if (!parent) return;
  if (parent.hasChildNodes()) {
    handleRemovePage(parent);
  }

  switch (pageIndex) {
    case "0":
      parent.appendChild(content(queryIndex));
      break;
    case "1":
      parent.appendChild(result());
      break;
    default:
      break;
  }
};

const handleRemovePage = (parent) => {
  parent.replaceChildren();
};
