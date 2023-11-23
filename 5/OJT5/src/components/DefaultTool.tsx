import { fabric } from "fabric";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { canvasAtom } from "../store/store";

import IconButton from "@mui/material/IconButton";
import TitleIcon from "@mui/icons-material/Title";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CropDinIcon from "@mui/icons-material/CropDin";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

import PropertyTool from "./PropertyTool";
import FillPalette from "./fillPalette";

const DefaultTool = () => {
  const [canvas] = useAtom(canvasAtom);
  const [fillPaletteOpen, setFillPaletteOpen] = useState<boolean>(false);
  const [strokePaletteOpen, setStrokePaletteOpen] = useState<boolean>(false);
  // const [strokeWeightOpen, setStrokeWeightOpen] = useState<boolean>(false);
  // const [strokeStyleOpen, setStrokeStyleOpen] = useState<boolean>(false);
  const [activeObject, setActiveObject] = useState<any>(
    canvas?.getActiveObject()
  );

  const handleSelection = () => {
    if (!canvas) {
      console.log("canvas 없음");
      return;
    }
    setActiveObject(canvas.getActiveObject());
  };
  const handleFillColor = (color: string) => {
    if (canvas && activeObject) {
      activeObject.set("fill", color);
      canvas.renderAll();
      setFillPaletteOpen(false);
    }
  };
  const handleStrokeColor = (color: string) => {
    if (canvas && activeObject) {
      activeObject.set("stroke", color);
      canvas.renderAll();
      setStrokePaletteOpen(false);
    }
  };
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

  const addImage = () => {};

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
    console.log("renderAll");
    canvas?.renderAll();
    setFillPaletteOpen(false);
    setStrokePaletteOpen(false);
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
      {/* {strokeWeightOpen === true ? <div>d</div> : <></>} */}
      {/* {strokeStyleOpen === true ? <div>d</div> : <></>} */}
    </div>
  );
};
export default DefaultTool;
