import { fabric } from "fabric";
import { useAtomValue } from "jotai";
import { answerAtom, canvasAtom } from "../../store/store";
import { useEffect } from "react";
/**
 * new canvas load
 * choice로 등로한 오브젝트를 찾아 (answerList)
 * 오브젝트 마우스 다운 이벤트 등록해 (정답 체크 함수)
 * 마우스 다운 이벤트 들어올때마다 정답 체크해
 *
 *
 */
const Preview = ({ onClose }) => {
  const canvas = useAtomValue(canvasAtom);
  const answer = useAtomValue(answerAtom);
  const canvasJSON = canvas?.toJSON();

  useEffect(() => {
    const newCanvas = new fabric.Canvas("previewCanvas", {
      width: 1200,
      height: 675,
      backgroundColor: "#ffffff",
    });

    newCanvas.loadFromJSON(canvasJSON, function () {
      // 로드 완료
      newCanvas.renderAll();
    });

    // 객체 클릭 이벤트 리스너 추가
    newCanvas.on("mouse:down", function (event) {
      const clickedObject = event.target;

      // 클릭된 객체의 속성들을 가져오는 부분 수정
      const clickedObjectProps = clickedObject?.toObject();
      console.log(clickedObjectProps);
      if (
        clickedObjectProps &&
        clickedObjectProps.fill === answer.fill &&
        clickedObjectProps.height === answer.height &&
        clickedObjectProps.opacity === answer.opacity &&
        clickedObjectProps.width === answer.width &&
        clickedObjectProps.type === answer.type
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
    // <div className="bg-black opacity-60 z-10 w-screen h-screen">
    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded">
      <div className="flex justify-between mb-2 border-b pb-2">
        <div className="p-2">Preview</div>
        <button className="p-2" onClick={onClose}>
          X
        </button>
      </div>
      <canvas id="previewCanvas" style={{ width: "800px", height: "500px" }} />
    </div>
    // </div>
  );
};
export default Preview;
