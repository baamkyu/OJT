import { fabric } from "fabric";
import { useAtomValue } from "jotai";
import { answerAtom, canvasAtom } from "../../store/store";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/** 문제 풀 수 있는 모달 */
const Preview = ({ onClose }) => {
  const canvas = useAtomValue(canvasAtom);
  const answer = useAtomValue(answerAtom);
  const canvasJSON = canvas?.toJSON();

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
      const clickedObject = event.target;

      // 클릭된 객체의 속성들을 가져오는 부분 수정
      const clickedObjectProps = clickedObject?.toObject();
      console.log(clickedObjectProps);
      console.log("answer", answer);
      if (
        clickedObjectProps &&
        clickedObjectProps.fill === answer.fill &&
        clickedObjectProps.height === answer.height &&
        clickedObjectProps.opacity === answer.opacity &&
        clickedObjectProps.width === answer.width &&
        clickedObjectProps.type === answer.type &&
        Math.round(clickedObjectProps.scaleX) == Math.round(answer.scaleX) &&
        Math.round(clickedObjectProps.scaleY) == Math.round(answer.scaleY)
      ) {
        console.log("Attributes match!");
      }
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
      <canvas id="previewCanvas" style={{ width: "800px", height: "500px" }} />
    </div>
    // </div>
  );
};
export default Preview;
