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
import OpacityIcon from "@mui/icons-material/Opacity";

import { textBold, textItalic, textUnderline } from "../../util/textbox";
import { useEffect } from "react";

type PropertyButtonProps = {
  canvas: fabric.Canvas | null;
  activeObject:
    | fabric.Rect
    | fabric.Circle
    | fabric.Line
    | fabric.Textbox
    | fabric.Image
    | undefined;
  fillPaletteOpen: boolean;
  setFillPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  strokePaletteOpen: boolean;
  setStrokePaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  strokeWidthOpen: boolean;
  setStrokeWidthOpen: React.Dispatch<React.SetStateAction<boolean>>;
  strokeDashOpen: boolean;
  setStrokeDashOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fillPaletteRef: any;
  strokePaletteRef: any;
  strokeWidthRef: any;
  strokeDashRef: any;
  opacityRef: any;
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
  fillPaletteRef,
  strokePaletteRef,
  strokeWidthRef,
  strokeDashRef,
  opacityRef,
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
    } else {
      console.log("error");
    }
  };

  if (activeObject instanceof fabric.Rect) {
    return (
      <div className="inline-block ml-4">
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("fill", fillPaletteOpen);
            canvas!.renderAll();
          }}
          ref={fillPaletteRef}
        >
          <FormatColorFillIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("stroke", strokePaletteOpen);
            canvas!.renderAll();
          }}
          ref={strokePaletteRef}
        >
          <BorderColorIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokewidth", strokeWidthOpen);
            canvas!.renderAll();
          }}
          ref={strokeWidthRef}
        >
          <LineWeightIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokedash", strokeDashOpen);
            canvas!.renderAll();
          }}
          ref={strokeDashRef}
        >
          <LineStyleIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => console.log("opacity")}
          ref={opacityRef}
        >
          <OpacityIcon fontSize="inherit" />
        </IconButton>
      </div>
    );
  } else if (activeObject instanceof fabric.Circle) {
    return (
      <div className="inline-block ml-4">
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("fill", fillPaletteOpen);
            canvas!.renderAll();
          }}
          ref={fillPaletteRef}
        >
          <FormatColorFillIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("stroke", strokePaletteOpen);
            canvas!.renderAll();
          }}
          ref={strokePaletteRef}
        >
          <BorderColorIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokewidth", strokeWidthOpen);
            canvas!.renderAll();
          }}
          ref={strokeWidthRef}
        >
          <LineWeightIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokedash", strokeDashOpen);
            canvas!.renderAll();
          }}
          ref={strokeDashRef}
        >
          <LineStyleIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => console.log("opacity")}
          ref={opacityRef}
        >
          <OpacityIcon fontSize="inherit" />
        </IconButton>
      </div>
    );
  } else if (activeObject instanceof fabric.Line) {
    return (
      <div className="inline-block ml-4">
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("stroke", strokePaletteOpen);
            canvas!.renderAll();
          }}
          ref={strokePaletteRef}
        >
          <BorderColorIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokewidth", strokeWidthOpen);
            canvas!.renderAll();
          }}
          ref={strokeWidthRef}
        >
          <LineWeightIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("strokedash", strokeDashOpen);
            canvas!.renderAll();
          }}
          ref={strokeDashRef}
        >
          <LineStyleIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => console.log("opacity")}
          ref={opacityRef}
        >
          <OpacityIcon fontSize="inherit" />
        </IconButton>
      </div>
    );
  } else if (activeObject instanceof fabric.Textbox) {
    return (
      <div className="inline-block ml-4">
        <IconButton
          size="large"
          onClick={() => {
            paletteOpenState("fill", fillPaletteOpen);
            canvas!.renderAll();
          }}
          ref={fillPaletteRef}
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
        <IconButton
          size="large"
          onClick={() => console.log("opacity")}
          ref={opacityRef}
        >
          <OpacityIcon fontSize="inherit" />
        </IconButton>
      </div>
    );
  } else if (activeObject instanceof fabric.Image) {
    return (
      <div className="inline-block ml-4">
        <IconButton
          size="large"
          onClick={() => console.log("opacity")}
          ref={opacityRef}
        >
          <OpacityIcon fontSize="inherit" />
        </IconButton>
      </div>
    );
  } else {
    <></>;
  }
};
export default PropertyTool;
