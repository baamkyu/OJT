import { fabric } from "fabric";
import { useAtomValue } from "jotai";
import { answerAtom, canvasAtom } from "../../store/store";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/** 문제 풀 수 있는 모달 */
const Preview = ({ onClose }: { onClose: () => void }) => {
  const canvas = useAtomValue(canvasAtom);
  const answer = useAtomValue(answerAtom);
  const [result, setResult] = useState<boolean | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const canvasJSON = canvas?.toJSON();

  function isArraySame(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (Math.abs(arr1[i] - arr2[i]) > 1) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    console.log(canvasJSON);
    console.log(answer);
    const newCanvas = new fabric.Canvas("previewCanvas", {
      width: 1200,
      height: 675,
      backgroundColor: "#ffffff",
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
      // console.log("window", window.innerWidth, window.innerHeight);
      // console.log("click", clickX, clickY);

      /** 이미지인 경우 */
      if (event.target?.type === "image") {
        if (
          answer?.ownMatrixCache.key.substring(0, 2) ===
            event.target.ownMatrixCache.key.substring(0, 2) &&
          isArraySame(
            answer?.ownMatrixCache.value,
            event.target.ownMatrixCache.value
          )
        ) {
          setResult(true);
          setTimeout(() => {
            setResult(null);
          }, 3000);
        } else {
          setResult(false);

          setTimeout(() => {
            setResult(null);
          }, 1500);
        }
      } else if (
        clickedObject &&
        answer &&
        clickedObject.fill === answer.fill &&
        clickedObject.height === answer.height &&
        clickedObject.opacity === answer.opacity &&
        clickedObject.width === answer.width &&
        clickedObject.type === answer.type &&
        clickedObject.stroke === answer.stroke &&
        clickedObject.strokeWidth === answer.strokeWidth &&
        clickedObject.strokeDashArray === answer.strokeDashArray &&
        Math.round(clickedObject.scaleX) === Math.round(answer.scaleX || 0) &&
        Math.round(clickedObject.scaleY) === Math.round(answer.scaleY || 0)
      ) {
        setResult(true);

        setTimeout(() => {
          setResult(null);
        }, 3000);
      } else {
        setResult(false);

        setTimeout(() => {
          setResult(null);
        }, 1500);
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
            left: `calc(${clickPosition.x - window.innerWidth / 2 + 600}px)`,
            top: `calc(${clickPosition.y - window.innerHeight / 2 + 338}px)`,
            width: "100px",
            height: "50px",
            backgroundColor: "green",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            borderRadius: "16px",
            zIndex: 50,
          }}
        >
          정답!
        </div>
      ) : result === false ? (
        <div
          style={{
            position: "absolute",
            left: `calc(${clickPosition.x - window.innerWidth / 2 + 600}px)`,
            top: `calc(${clickPosition.y - window.innerHeight / 2 + 338}px)`,
            width: "70px",
            height: "50px",
            backgroundColor: "red",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            fontSize: "24px",
            borderRadius: "16px",
          }}
        >
          오답
        </div>
      ) : (
        <div></div>
      )}
      <canvas id="previewCanvas" />
    </div>
    // </div>
  );
};
export default Preview;
