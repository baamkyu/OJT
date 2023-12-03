import { fabric } from "fabric";
import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect, useRef } from "react";
import { canvasAtom, images, activeObjectAtom } from "../../store/store";

import IconButton from "@mui/material/IconButton";
import TitleIcon from "@mui/icons-material/Title";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CropDinIcon from "@mui/icons-material/CropDin";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

import PropertyTool from "./PropertyTool";
import FillPalette from "../modal/fillPalette";
import StrokeWidth from "../modal/strokeWidth";
import StrokeDash from "../modal/strokeDash";
import ImageSelector from "../modal/imageSelector";
import Opacity from "../modal/opacity";
import Preview from "../modal/Preview";

const ToolBox = () => {
  const canvas = useAtomValue(canvasAtom);
  const [activeObject, setActiveObject] = useAtom(activeObjectAtom);

  const [modalState, setModalState] = useState<Record<string, boolean>>({
    fillPaletteOpen: false,
    strokePaletteOpen: false,
    strokeWidthOpen: false,
    strokeDashOpen: false,
    imageSelectorOpen: false,
    opacityOpen: false,
  });
  const [positions, setPositions] = useState<Record<string, number>>({
    fillPalette: 0,
    strokePalette: 0,
    strokeWidth: 0,
    strokeDash: 0,
    opacity: 0,
  });

  const iconPositionRef = {
    fillPalette: useRef<HTMLButtonElement>(null),
    strokePalette: useRef<HTMLButtonElement>(null),
    strokeWidth: useRef<HTMLButtonElement>(null),
    strokeDash: useRef<HTMLButtonElement>(null),
    opacity: useRef<HTMLButtonElement>(null),
  };

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  /** 색깔을 고르면 fill 변경해주는 함수 */
  const handleFillColor = (color: string) => {
    if (canvas && activeObject) {
      activeObject.set("fill", color);
      canvas.renderAll();
      setModalState((prev) => ({
        ...prev,
        fillPaletteOpen: false,
      }));
    }
  };

  /** 색깔을 고르면 stroke 변경해주는 함수 */
  const handleStrokeColor = (color: string) => {
    if (canvas && activeObject) {
      activeObject.set("stroke", color);
      canvas.renderAll();
      setModalState((prev) => ({
        ...prev,
        strokePaletteOpen: false,
      }));
    }
  };

  /** 선 두께를 고르면 strokewidth 변경해주는 함수 */
  const handleStrokeWidth = (strokewidth: number) => {
    if (canvas && activeObject) {
      activeObject.set("strokeWidth", strokewidth);
      canvas.renderAll();
      setModalState((prev) => ({
        ...prev,
        strokeWidthOpen: false,
      }));
    }
  };

  /** 선 스타일을 고르면 strokewidth 변경해주는 함수 */
  const handleStrokeDash = (strokeDash: Array<number>) => {
    if (canvas && activeObject) {
      activeObject.set("strokeDashArray", strokeDash);
      canvas.renderAll();
      setModalState((prev) => ({
        ...prev,
        strokeDashOpen: false,
      }));
    }
  };

  /** 투명도를 고르면 opcaity 변경해주는 함수 */
  const handleOpacity = (opacity: number) => {
    if (canvas && activeObject) {
      activeObject.set("opacity", opacity);
      canvas.renderAll();
      setModalState((prev) => ({
        ...prev,
        opacityOpen: false,
      }));
    }
  };

  /** fabric에 Text 추가하는 함수 */
  const addText = () => {
    if (!canvas) return;
    const text = new fabric.Textbox("텍스트를 입력하세요.", {
      fontFamily: "Arial",
      fontSize: 40,
      fill: "black",
      fontWeight: "normal",
      left: 50,
      top: 50,
    });
    canvas.add(text);

    canvas.on("selection:created", updateActiveObject);
  };

  /** fabric에 Image 추가할 때 CORS 정책 우회하기 위한 함수 */
  const corsURL = (imageURL: string) => {
    fetch(imageURL)
      .then((response) => response.blob())
      .then((blob) => {
        const imageDataURL = URL.createObjectURL(blob);
        fabric.Image.fromURL(imageDataURL, (img) => {
          canvas?.add(img);
        });
      })
      .catch((error) => {
        console.log("error corsURL", error);
      });
  };
  /** fabric에 Image 추가하는 함수 */
  const addImage = (selectedImage: string) => {
    if (!canvas) return;
    fabric.Image.fromURL(selectedImage, () => {
      corsURL(selectedImage);
      setModalState((prev) => ({
        ...prev,
        imageSelectorOpen: false,
      }));
    });
    canvas.on("selection:created", updateActiveObject);
  };

  /** fabric에 Rect 추가하는 함수 */
  const addRect = () => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      fill: "black",
      left: 10,
      top: 10,
    });
    canvas.add(rect);
    canvas.on("selection:created", updateActiveObject);
  };

  /** fabric에 Circle 추가하는 함수 */
  const addCircle = () => {
    if (!canvas) return;
    const circle = new fabric.Circle({
      radius: 25,
      fill: "black",
      left: 50,
      top: 50,
    });
    canvas.add(circle);
    canvas.on("selection:created", updateActiveObject);
  };
  /** fabric에 Line 추가하는 함수 */
  const addLine = () => {
    if (!canvas) return;
    const line = new fabric.Line([50, 50, 100, 50], {
      stroke: "blue",
      strokeWidth: 8,
    });
    canvas.add(line);
    canvas.on("selection:created", updateActiveObject);
  };

  const getPosition = (ref) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      return rect.left; // 또는 다른 필요한 좌표 값
    }
    return 0; // 만약 ref가 null인 경우 기본값
  };

  /** 선택된 object를 전역에서 관리하기 위한 함수 */
  const updateActiveObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    setActiveObject(activeObject);
    console.log("updateActiveObject", activeObject);
  };

  useEffect(() => {
    if (!canvas) {
      console.log("no canvas");
      return;
    }
    console.log("renderAll");

    setModalState({
      fillPaletteOpen: false,
      strokePaletteOpen: false,
      strokeWidthOpen: false,
      strokeDashOpen: false,
      imageSelectorOpen: false,
      opacityOpen: false,
    });

    const strokePalettePos = getPosition(iconPositionRef.strokePalette);
    const fillPalettePos = getPosition(iconPositionRef.fillPalette);
    const strokeWidthPos = getPosition(iconPositionRef.strokeWidth);
    const strokeDashPos = getPosition(iconPositionRef.strokeDash);
    const opacityPos = getPosition(iconPositionRef.opacity);
    setPositions({
      strokePalette: strokePalettePos,
      fillPalette: fillPalettePos,
      strokeWidth: strokeWidthPos,
      strokeDash: strokeDashPos,
      opacity: opacityPos,
    });

    canvas.on("selection:created", updateActiveObject);
    canvas.on("selection:updated", updateActiveObject);
    canvas.on("selection:cleared", updateActiveObject);
    canvas.on("selection:scaling", updateActiveObject);
    canvas.on("selection:rotating", updateActiveObject);

    return () => {
      canvas.off("selection:created", updateActiveObject);
      canvas.off("selection:updated", updateActiveObject);
      canvas.off("selection:cleared", updateActiveObject);
      canvas.off("selection:scaling", updateActiveObject);
      canvas.off("selection:rotating", updateActiveObject);
    };
  }, [activeObject]);

  return (
    // <div className="bg-F2F5F5 w-full">
    <div>
      <div className="inline-block ml-4">
        <IconButton size="large" onClick={() => setPreviewOpen(!previewOpen)}>
          <SystemUpdateAltIcon fontSize="inherit" />
        </IconButton>
        <div className="inline-block ml-4">
          <IconButton size="large" onClick={addText}>
            <TitleIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => setModalState({ imageSelectorOpen: true })}
          >
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
      </div>
      <div className="ml-4 inline-block">
        <PropertyTool
          modalState={modalState}
          setModalState={setModalState}
          iconPositionRef={iconPositionRef}
        />
      </div>
      {/* 모달창 */}
      {modalState.imageSelectorOpen && (
        <ImageSelector
          images={images}
          addImage={addImage}
          onClose={() =>
            setModalState((prev) => ({
              ...prev,
              imageSelectorOpen: false,
            }))
          }
        />
      )}
      {modalState.fillPaletteOpen && (
        <div
          style={{
            position: "fixed",
            top: "44px",
            left: `${positions.fillPalette}px`,
            zIndex: 10,
          }}
        >
          <FillPalette onSelectColor={handleFillColor} />
        </div>
      )}
      {modalState.strokePaletteOpen && (
        <div
          style={{
            position: "fixed",
            top: "44px",
            left: `${positions.strokePalette}px`,
            zIndex: 10,
          }}
        >
          <FillPalette onSelectColor={handleStrokeColor} />
        </div>
      )}
      {modalState.strokeWidthOpen && (
        <div
          style={{
            position: "fixed",
            top: "44px",
            left: `${positions.strokeWidth}px`,
            zIndex: 10,
          }}
        >
          <StrokeWidth onSelectWidth={handleStrokeWidth} />
        </div>
      )}
      {modalState.strokeDashOpen && (
        <div
          style={{
            position: "fixed",
            top: "44px",
            left: `${positions.strokeDash}px`,
            zIndex: 10,
          }}
        >
          <StrokeDash onSelectDash={handleStrokeDash} />
        </div>
      )}
      {modalState.opacityOpen && (
        <div
          style={{
            position: "fixed",
            top: "44px",
            left: `${positions.opacity}px`,
            zIndex: 10,
          }}
        >
          <Opacity onSelectOpacity={handleOpacity} />
        </div>
      )}

      {previewOpen && (
        <>
          <div
            className="absolute w-full h-full top-0 opacity-60 z-10 bg-black"
            onClick={() => setPreviewOpen(!previewOpen)}
          ></div>
          <Preview onClose={() => setPreviewOpen(!previewOpen)} />
        </>
      )}
    </div>
  );
};
export default ToolBox;
