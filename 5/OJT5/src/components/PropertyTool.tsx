import { fabric } from "fabric";
import IconButton from "@mui/material/IconButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import LineStyleIcon from "@mui/icons-material/LineStyle";

import { textBold, textItalic, textUnderline } from "../util/textbox";

type PropertyButtonProps = {
  canvas: fabric.Canvas | null;
  activeObject:
    | fabric.Rect
    | fabric.Circle
    | fabric.Line
    | fabric.Textbox
    | undefined;
  fillPaletteOpen: boolean;
  setFillPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  strokePaletteOpen: boolean;
  setStrokePaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PropertyTool = ({
  canvas,
  activeObject,
  fillPaletteOpen,
  setFillPaletteOpen,
  strokePaletteOpen,
  setStrokePaletteOpen,
}: PropertyButtonProps) => {
  const paletteOpenState = (type: string, paletteState: boolean) => {
    if (type === "fill") {
      setStrokePaletteOpen(false);
      setFillPaletteOpen(!paletteState);
    } else if (type === "stroke") {
      setFillPaletteOpen(false);
      setStrokePaletteOpen(!paletteState);
    }
  };

  if (activeObject instanceof fabric.Rect) {
    console.log("selectedType RECT");
    console.log(activeObject);
    return (
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("fill", fillPaletteOpen);
          canvas!.renderAll();
        }}
      >
        <FormatColorFillIcon fontSize="inherit" />
      </IconButton>
    );
  } else if (activeObject instanceof fabric.Circle) {
    console.log("selectedType CIRCLE");
    console.log(activeObject);
    return (
      <>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("fill", fillPaletteOpen);
            canvas!.renderAll();
          }}
        >
          <FormatColorFillIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("stroke", strokePaletteOpen);
            canvas!.renderAll();
          }}
        >
          <BorderColorIcon fontSize="inherit" />
        </IconButton>
      </>
    );
  } else if (activeObject instanceof fabric.Line) {
    console.log("selectedType LINE");
    console.log(activeObject);
    return (
      <>
        {" "}
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("stroke", strokePaletteOpen);
            canvas!.renderAll();
          }}
        >
          <BorderColorIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            console.log("weight");
            canvas!.renderAll();
          }}
        >
          <LineWeightIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            console.log("linestyle");
            canvas!.renderAll();
          }}
        >
          <LineStyleIcon fontSize="inherit" />
        </IconButton>
      </>
    );
  } else if (activeObject instanceof fabric.Textbox) {
    console.log("selectedType textbox");
    console.log(activeObject);
    return (
      <>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("fill", fillPaletteOpen);
            canvas!.renderAll();
          }}
        >
          <FormatColorTextIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            textBold(activeObject);
            canvas?.renderAll();
          }}
        >
          <FormatBoldIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            textItalic(activeObject);
            canvas?.renderAll();
          }}
        >
          <FormatItalicIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            textUnderline(activeObject);
            canvas?.renderAll();
          }}
        >
          <FormatUnderlinedIcon fontSize="inherit" />
        </IconButton>
      </>
    );
  }
};
export default PropertyTool;
