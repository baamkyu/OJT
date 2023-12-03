import { fabric } from "fabric";
import { useAtomValue } from "jotai";
import { answerAtom, canvasAtom } from "../../store/store";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/** 문제 풀 수 있는 모달 */
const Preview = ({ onClose }) => {
  const canvas = useAtomValue(canvasAtom);
  const answer = useAtomValue(answerAtom);
  const canvasJSON = canvas?.toJSON();
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas("previewCanvas", {
      width: 1200,
      height: 675,
      backgroundColor: "#ffffff",
      selection: false,
    });

    newCanvas.loadFromJSON(canvasJSON, function () {
      newCanvas.getObjects().forEach((obj) => {
        obj.selectable = false;
        obj.hoverCursor = "pointer";
      });
      newCanvas.renderAll();
    });

    // 객체 클릭 이벤트 리스너 추가
    newCanvas.on("mouse:down", function (event) {
      const clickedObject = event.target?.toObject();
      const clickX = event.e.clientX; // 마우스 클릭된 x 좌표
      const clickY = event.e.clientY; // 마우스 클릭된 y 좌표

      console.log(clickedObject);
      console.log("answer", answer);
      if (
        clickedObject &&
        clickedObject.fill === answer.fill &&
        clickedObject.height === answer.height &&
        clickedObject.opacity === answer.opacity &&
        clickedObject.width === answer.width &&
        clickedObject.type === answer.type &&
        Math.round(clickedObject.scaleX) == Math.round(answer.scaleX) &&
        Math.round(clickedObject.scaleY) == Math.round(answer.scaleY)
      ) {
        setResult(true);

        setTimeout(() => {
          setResult(null);
        }, 5000);
      } else {
        setResult(false);

        setTimeout(() => {
          setResult(null);
        }, 5000);
      }
      setClickPosition({ x: clickX, y: clickY });
    });
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      newCanvas.off("mouse:down");
    };
  }, []);

  return (
    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded">
      <div className="flex justify-between mb-2 border-b pb-2">
        <div className="p-2">Preview</div>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {result === true ? (
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 150px)",
            top: "calc(50% - 25px)",
            width: "300px",
            height: "50px",
            backgroundColor: "green",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          O
        </div>
      ) : result === false ? (
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 150px)",
            top: "calc(50% - 25px)",
            width: "300px",
            height: "50px",
            backgroundColor: "red",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          X
        </div>
      ) : (
        <div></div>
      )}
      <canvas id="previewCanvas" style={{ width: "800px", height: "500px" }} />
    </div>
    // </div>
  );
};
export default Preview;
