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
import HeightIcon from "@mui/icons-material/Height";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";

import { textBold, textItalic, textUnderline } from "../../util/textbox";

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
  strokeWidthOpen: boolean;
  setStrokeWidthOpen: React.Dispatch<React.SetStateAction<boolean>>;
  strokeDashOpen: boolean;
  setStrokeDashOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PropertyTool = ({
  canvas,
  activeObject,
  fillPaletteOpen,
  setFillPaletteOpen,
  strokePaletteOpen,
  setStrokePaletteOpen,
  strokeWidthOpen,
  setStrokeWidthOpen,
  strokeDashOpen,
  setStrokeDashOpen,
}: PropertyButtonProps) => {
  const paletteOpenState = (type: string, openState: boolean) => {
    if (type === "fill") {
      setStrokePaletteOpen(false);
      setStrokeWidthOpen(false);
      setStrokeDashOpen(false);
      setFillPaletteOpen(!openState);
    } else if (type === "stroke") {
      setFillPaletteOpen(false);
      setStrokeWidthOpen(false);
      setStrokeDashOpen(false);
      setStrokePaletteOpen(!openState);
    } else if (type === "strokewidth") {
      setFillPaletteOpen(false);
      setStrokePaletteOpen(false);
      setStrokeDashOpen(false);
      setStrokeWidthOpen(!openState);
    } else if (type === "strokedash") {
      setFillPaletteOpen(false);
      setStrokePaletteOpen(false);
      setStrokeWidthOpen(false);
      setStrokeDashOpen(!openState);
    }
  };

  if (activeObject instanceof fabric.Rect) {
    console.log("selectedType RECT");
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
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokewidth", strokeWidthOpen);
            canvas!.renderAll();
          }}
        >
          <LineWeightIcon fontSize="inherit" />
        </IconButton>
        {/* <IconButton
          size="large"
          onClick={() => {
            activeObject.set("height", 120);
            canvas!.renderAll();
          }}
        >
          <HeightIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            activeObject.set("width", 125);
            canvas!.renderAll();
          }}
        >
          <SettingsEthernetIcon fontSize="inherit" />
        </IconButton> */}

        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokedash", strokeDashOpen);
            canvas!.renderAll();
          }}
        >
          <LineStyleIcon fontSize="inherit" />
        </IconButton>

        {/* <InputNumber /> */}
      </>
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

        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokewidth", strokeWidthOpen);
            canvas!.renderAll();
          }}
        >
          <LineWeightIcon fontSize="inherit" />
        </IconButton>

        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokedash", strokeDashOpen);
            canvas!.renderAll();
          }}
        >
          <LineStyleIcon fontSize="inherit" />
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
            paletteOpenState("strokewidth", strokeWidthOpen);
            canvas!.renderAll();
          }}
        >
          <LineWeightIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokedash", strokeDashOpen);
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
