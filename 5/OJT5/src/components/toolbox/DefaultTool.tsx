import { fabric } from "fabric";
import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { canvasAtom, images } from "../../store/store";

import IconButton from "@mui/material/IconButton";
import TitleIcon from "@mui/icons-material/Title";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CropDinIcon from "@mui/icons-material/CropDin";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import SaveIcon from "@mui/icons-material/Save";

import PropertyTool from "./PropertyTool";
import FillPalette from "../modal/fillPalette";
import StrokeWidth from "../modal/strokeWidth";
import StrokeDash from "../modal/strokeDash";
import ImageSelector from "../modal/imageSelector";

const DefaultTool = () => {
  const [canvas] = useAtom(canvasAtom);
  const [fillPaletteOpen, setFillPaletteOpen] = useState<boolean>(false);
  const [strokePaletteOpen, setStrokePaletteOpen] = useState<boolean>(false);
  const [strokeWidthOpen, setStrokeWidthOpen] = useState<boolean>(false);
  const [strokeDashOpen, setStrokeDashOpen] = useState<boolean>(false);
  const [imageSelectorOpen, setImageSelectorOpen] = useState<boolean>(false);
  const [positions, setPositions] = useState({
    fillPalette: 0,
    strokePalette: 0,
    strokeWidth: 0,
    strokeDash: 0,
  });

  const fillPaletteRef = useRef<HTMLDivElement>(null);
  const strokePaletteRef = useRef<HTMLDivElement>(null);
  const strokeWidthRef = useRef<HTMLDivElement>(null);
  const strokeDashRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef<HTMLDivElement>(null);

  const [activeObject, setActiveObject] = useState<any>(
    canvas?.getActiveObject()
  );

  /** 선택된 객체를 state로 관리하는 함수 */
  const handleSelection = () => {
    if (!canvas) return;
    setActiveObject(canvas.getActiveObject());
  };

  /** 색깔을 고르면 fill 변경해주는 함수 */
  const handleFillColor = (color: string) => {
    if (canvas && activeObject) {
      activeObject.set("fill", color);
      canvas.renderAll();
      setFillPaletteOpen(false);
    }
  };

  /** 색깔을 고르면 stroke 변경해주는 함수 */
  const handleStrokeColor = (color: string) => {
    if (canvas && activeObject) {
      activeObject.set("stroke", color);
      canvas.renderAll();
      setStrokePaletteOpen(false);
    }
  };

  /** 선 두께를 고르면 strokewidth 변경해주는 함수 */
  const handleStrokeWidth = (strokewidth: number) => {
    if (canvas && activeObject) {
      activeObject.set("strokeWidth", strokewidth);
      canvas.renderAll();
      setStrokeWidthOpen(false);
    }
  };

  /** 선 스타일을 고르면 strokewidth 변경해주는 함수 */
  const handleStrokeDash = (strokeDash: Array<number>) => {
    if (canvas && activeObject) {
      activeObject.set("strokeDashArray", strokeDash);
      canvas.renderAll();
      setStrokeDashOpen(false);
    }
  };

  /** fabric에 Text 추가하는 함수 */
  const addText = () => {
    if (canvas) {
      const text = new fabric.Textbox("텍스트를 입력하세요.", {
        fontFamily: "Arial",
        fontSize: 40,
        fill: "black",
        fontWeight: "normal",
        left: 50,
        top: 50,
      });
      canvas.add(text);
      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:cleared", handleSelection);
    }
  };

  /** fabric에 Image 추가하는 함수 */
  const addImage = (selectedImage: string) => {
    if (canvas) {
      fabric.Image.fromURL(selectedImage, (img) => {
        canvas.add(img);
        setImageSelectorOpen(false);
      });
      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:cleared", handleSelection);
    }
  };

  /** fabric에 Rect 추가하는 함수 */
  const addRect = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        width: 50,
        height: 50,
        fill: "black",
        left: 10,
        top: 10,
      });
      canvas.add(rect);
      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:cleared", handleSelection);
    }
  };

  /** fabric에 Circle 추가하는 함수 */
  const addCircle = () => {
    if (canvas) {
      const circle = new fabric.Circle({
        radius: 25,
        fill: "black",
        left: 50,
        top: 50,
      });
      canvas.add(circle);
      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:cleared", handleSelection);
    }
  };

  /** fabric에 Line 추가하는 함수 */
  const addLine = () => {
    if (canvas) {
      const line = new fabric.Line([50, 50, 100, 50], {
        stroke: "blue",
        strokeWidth: 8,
      });
      canvas.add(line);
      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:cleared", handleSelection);
    }
  };

  const getPosition = (ref) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      return rect.left; // 또는 다른 필요한 좌표 값
    }
    return 100; // 만약 ref가 null인 경우 기본값
  };

  useEffect(() => {
    console.log(activeObject);
    console.log("renderAll");
    canvas?.renderAll();
    setFillPaletteOpen(false);
    setStrokePaletteOpen(false);
    setStrokeWidthOpen(false);
    setStrokeDashOpen(false);
    canvas?.renderAll();
    console.log(positions);
  }, [activeObject]);

  return (
    <div className="ml-2">
      <IconButton size="large">
        <SaveIcon fontSize="inherit" />
      </IconButton>
      <div className="inline-block ml-4">
        <IconButton size="large" onClick={addText}>
          <TitleIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="large" onClick={() => setImageSelectorOpen(true)}>
          <AddPhotoAlternateIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="large" onClick={addRect}>
          <CropDinIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="large" onClick={addCircle}>
          <PanoramaFishEyeIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="large" onClick={addLine}>
          <HorizontalRuleIcon fontSize="inherit" />
        </IconButton>
      </div>
      <PropertyTool
        canvas={canvas}
        activeObject={activeObject}
        fillPaletteOpen={fillPaletteOpen}
        setFillPaletteOpen={setFillPaletteOpen}
        strokePaletteOpen={strokePaletteOpen}
        setStrokePaletteOpen={setStrokePaletteOpen}
        strokeWidthOpen={strokeWidthOpen}
        setStrokeWidthOpen={setStrokeWidthOpen}
        strokeDashOpen={strokeDashOpen}
        setStrokeDashOpen={setStrokeDashOpen}
        fillPaletteRef={fillPaletteRef}
        strokePaletteRef={strokePaletteRef}
        strokeWidthRef={strokeWidthRef}
        strokeDashRef={strokeDashRef}
        opacityRef={opacityRef}
      />

      {/* 모달창 */}
      {imageSelectorOpen === true ? (
        <ImageSelector
          images={images}
          addImage={addImage}
          onClose={() => setImageSelectorOpen(false)}
        />
      ) : (
        <></>
      )}
      {fillPaletteOpen === true ? (
        <div
          className={`absolute top-10 left-[${positions.fillPalette}px] z-10`}
          // ref={fillPaletteRef}
        >
          <FillPalette onSelectColor={handleFillColor} />
        </div>
      ) : (
        <></>
      )}
      {strokePaletteOpen === true ? (
        <div
          className={`absolute top-10 left-[${positions.strokePalette}px] z-10`}
          // ref={strokePaletteRef}
        >
          <FillPalette onSelectColor={handleStrokeColor} />
        </div>
      ) : (
        <></>
      )}
      {strokeWidthOpen === true ? (
        <div
          className={`absolute top-10 left-[${positions.strokeWidth}px] z-10`}
          // ref={strokeWidthRef}
        >
          <StrokeWidth
            onSelectWidth={handleStrokeWidth}
            setStrokeWidthOpen={setStrokeWidthOpen}
          />
        </div>
      ) : (
        <></>
      )}
      {strokeDashOpen === true ? (
        <div
          className={`absolute top-10 left-[${positions.strokeDash}px] z-10`}
          // ref={strokeDashRef}
        >
          <StrokeDash onSelectDash={handleStrokeDash} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default DefaultTool;
