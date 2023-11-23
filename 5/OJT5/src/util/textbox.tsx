export const textBold = (activeObj: fabric.Textbox) => {
  const currentFontWeight = activeObj?.get("fontWeight") as string;
  const newFontWeight = currentFontWeight === "bold" ? "normal" : "bold";
  activeObj?.set("fontWeight", newFontWeight);
  //   canvas!.renderAll();
};

export const textItalic = (activeObj: fabric.Textbox) => {
  const currentIsItalic = activeObj?.get("fontStyle") as string;
  const newIsItalic = currentIsItalic === "italic" ? "normal" : "italic";
  activeObj?.set("fontStyle", newIsItalic);
  //   canvas!.renderAll();
};

export const textUnderline = (activeObj: fabric.Textbox) => {
  const currentIsUnderline = activeObj?.get("underline") as boolean;
  const newIsUnderline = currentIsUnderline === true ? false : true;
  activeObj?.set("underline", newIsUnderline);
  //   canvas!.renderAll();
};
