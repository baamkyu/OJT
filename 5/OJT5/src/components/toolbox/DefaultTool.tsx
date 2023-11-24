import { fabric } from "fabric";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { canvasAtom } from "../../store/store";

import IconButton from "@mui/material/IconButton";
import TitleIcon from "@mui/icons-material/Title";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CropDinIcon from "@mui/icons-material/CropDin";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

import PropertyTool from "./PropertyTool";
import FillPalette from "./fillPalette";
import StrokeWidth from "./strokeWidth";
import StrokeDash from "./strokeDash";

const DefaultTool = () => {
  const [canvas] = useAtom(canvasAtom);
  const [fillPaletteOpen, setFillPaletteOpen] = useState<boolean>(false);
  const [strokePaletteOpen, setStrokePaletteOpen] = useState<boolean>(false);
  const [strokeWidthOpen, setStrokeWidthOpen] = useState<boolean>(false);
  const [strokeDashOpen, setStrokeDashOpen] = useState<boolean>(false);

  // const [strokeStyleOpen, setStrokeStyleOpen] = useState<boolean>(false);
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
    console.log("123123");
    if (canvas && activeObject) {
      console.log("go");
      activeObject.set("strokeWidth", strokewidth);
      canvas.renderAll();
      setStrokeWidthOpen(false);
    }
  };

  /** 선 스타일을 고르면 strokewidth 변경해주는 함수 */
  const handleStrokeDash = (strokeDash: Array<number>) => {
    console.log("strokedasharray");
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

  /** fabric에 Text 추가하는 함수 */
  const addImage = () => {};

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

  useEffect(() => {
    console.log(activeObject);
    console.log("renderAll");
    canvas?.renderAll();
    setFillPaletteOpen(false);
    setStrokePaletteOpen(false);
    setStrokeWidthOpen(false);
    setStrokeDashOpen(false);
  }, [activeObject]);

  return (
    <div>
      <span>생성</span>
      <IconButton size="large" onClick={addText}>
        <TitleIcon fontSize="inherit" />
      </IconButton>
      <IconButton size="large" onClick={addImage}>
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
      <span>구분선</span>
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
      />
      {fillPaletteOpen === true ? (
        <div className="absolute top-10 left-[292px] z-10">
          <FillPalette onSelectColor={handleFillColor} />
        </div>
      ) : (
        <></>
      )}
      {strokePaletteOpen === true ? (
        <div className="absolute top-10 left-[348px] z-10">
          <FillPalette onSelectColor={handleStrokeColor} />
        </div>
      ) : (
        <></>
      )}
      {strokeWidthOpen === true ? (
        <div className="absolute top-10 left-[400px] z-10">
          <StrokeWidth onSelectWidth={handleStrokeWidth} />
        </div>
      ) : (
        <></>
      )}
      {strokeDashOpen === true ? (
        <div className="absolute top-10 left-[480px] z-10">
          <StrokeDash onSelectDash={handleStrokeDash} />
        </div>
      ) : (
        <></>
      )}
      <button
        onClick={() => {
          // const g = new fabric.Group(activeObject._objects, {
          //   originX: "center",
          //   originY: "center",
          // });
          // canvas?.add(g);
          // canvas?.remove(activeObject); // 기존 객체는 제거 (선택 해제)
          // canvas?.setActiveObject(g); // 새로운 그룹을 선택 상태로 만듦
          // canvas?.renderAll();
          // const allObjects = canvas?.getObjects();
          // // 그룹으로 묶인 객체 확인
          // const groupedObjects = allObjects?.filter(
          //   (obj) => obj.type === "group"
          // );
          // // 그룹으로 묶인 객체들을 출력
          // console.log(groupedObjects);
        }}
      >
        그룹으로 묶기
      </button>
      {/* {strokeWeightOpen === true ? <div>d</div> : <></>} */}
      {/* {strokeStyleOpen === true ? <div>d</div> : <></>} */}
    </div>
  );
};
export default DefaultTool;
