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
import { useAtomValue } from "jotai";
import { activeObjectAtom, canvasAtom } from "../../store/store";

type PropertyButtonProps = {
  modalState: Record<string, boolean>;
  setModalState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  iconPositionRef: {
    fillPalette: React.RefObject<HTMLButtonElement>;
    strokePalette: React.RefObject<HTMLButtonElement>;
    strokeWidth: React.RefObject<HTMLButtonElement>;
    strokeDash: React.RefObject<HTMLButtonElement>;
    opacity: React.RefObject<HTMLButtonElement>;
  };
};

const PropertyTool = ({
  modalState,
  setModalState,
  iconPositionRef,
}: PropertyButtonProps) => {
  const canvas = useAtomValue(canvasAtom);
  const activeObject = useAtomValue(activeObjectAtom);

  /**
   * 모달 오픈 함수
   * @param type
   * fill : 채우기 색상
   * stroke : 테두리 색상
   * strokewidth : 테두리 두께
   * strokedash : 테두리 종류
   * opacity : 투명도
   */
  const paletteOpenState = (type: string) => {
    switch (type) {
      case "fill":
        setModalState((prev: Record<string, boolean>) => ({
          ...prev,
          strokePaletteOpen: false,
          strokeWidthOpen: false,
          strokeDashOpen: false,
          opacityOpen: false,
          fillPaletteOpen: !modalState.fillPaletteOpen,
        }));
        break;
      case "stroke":
        setModalState((prev: Record<string, boolean>) => ({
          ...prev,
          fillPaletteOpen: false,
          strokeWidthOpen: false,
          strokeDashOpen: false,
          opacityOpen: false,
          strokePaletteOpen: !modalState.strokePaletteOpen,
        }));
        break;
      case "strokewidth":
        setModalState((prev: Record<string, boolean>) => ({
          ...prev,
          fillPaletteOpen: false,
          strokePaletteOpen: false,
          strokeDashOpen: false,
          opacityOpen: false,
          strokeWidthOpen: !modalState.strokeWidthOpen,
        }));
        break;
      case "strokedash":
        setModalState((prev: Record<string, boolean>) => ({
          ...prev,
          fillPaletteOpen: false,
          strokePaletteOpen: false,
          strokeWidthOpen: false,
          opacityOpen: false,
          strokeDashOpen: !modalState.strokeDashOpen,
        }));
        break;
      case "opacity":
        setModalState((prev: Record<string, boolean>) => ({
          ...prev,
          fillPaletteOpen: false,
          strokePaletteOpen: false,
          strokeWidthOpen: false,
          strokeDashOpen: false,
          opacityOpen: !modalState.opacityOpen,
        }));
        break;
      default:
        console.log("setModalState error");
    }
  };

  /** rect 속성 변경을 위한 버튼 */
  const rectPropertyButtons = (
    <>
      <IconButton
        size="large"
        onClick={(e) => {
          // e.stopPropagation();

          paletteOpenState("fill");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.fillPalette}
      >
        <FormatColorFillIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("stroke");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokePalette}
      >
        <BorderColorIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("strokewidth");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokeWidth}
      >
        <LineWeightIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("strokedash");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokeDash}
      >
        <LineStyleIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("opacity");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.opacity}
      >
        <OpacityIcon fontSize="inherit" />
      </IconButton>
    </>
  );
  /** circle 속성 변경을 위한 버튼 */
  const circlePropertyButtons = (
    <>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("fill");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.fillPalette}
      >
        <FormatColorFillIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("stroke");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokePalette}
      >
        <BorderColorIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("strokewidth");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokeWidth}
      >
        <LineWeightIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("strokedash");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokeDash}
      >
        <LineStyleIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("opacity");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.opacity}
      >
        <OpacityIcon fontSize="inherit" />
      </IconButton>
    </>
  );
  /** line 속성 변경을 위한 버튼 */
  const linePropertyButtons = (
    <>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("stroke");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokePalette}
      >
        <BorderColorIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("strokewidth");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokeWidth}
      >
        <LineWeightIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("strokedash");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.strokeDash}
      >
        <LineStyleIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("opacity");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.opacity}
      >
        <OpacityIcon fontSize="inherit" />
      </IconButton>
    </>
  );
  /** text 속성 변경을 위한 버튼 */
  const textboxPropertyButtons = (activeObject: fabric.Object) => (
    <>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("fill");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.fillPalette}
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
        onClick={() => {
          paletteOpenState("opacity");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.opacity}
      >
        <OpacityIcon fontSize="inherit" />
      </IconButton>
    </>
  );
  /** image 속성 변경을 위한 버튼 */
  const imagePropertyButtons = (
    <>
      <IconButton
        size="large"
        onClick={() => {
          paletteOpenState("opacity");
          canvas!.renderAll();
        }}
        ref={iconPositionRef.opacity}
      >
        <OpacityIcon fontSize="inherit" />
      </IconButton>
    </>
  );

  let propertyButtons;
  switch (true) {
    case activeObject instanceof fabric.Rect:
      propertyButtons = rectPropertyButtons;
      console.log("Rect");
      break;
    case activeObject instanceof fabric.Circle:
      propertyButtons = circlePropertyButtons;
      console.log("Circle");
      break;
    case activeObject instanceof fabric.Line:
      propertyButtons = linePropertyButtons;
      console.log("Line");
      break;
    case activeObject instanceof fabric.Textbox:
      propertyButtons = textboxPropertyButtons(activeObject!);
      console.log("Textbox");
      break;
    case activeObject instanceof fabric.Image:
      propertyButtons = imagePropertyButtons;
      console.log("Image");
      break;
    default:
      propertyButtons = <></>;
  }
  return propertyButtons;
};
export default PropertyTool;
