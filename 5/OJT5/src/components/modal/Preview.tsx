import { fabric } from "fabric";
import { useAtomValue } from "jotai";
import { canvasAtom } from "../../store/store";
import { useEffect } from "react";
/**
 * new canvas load
 * choice로 등로한 오브젝트를 찾아
 * 오브젝트 마우스 다운 이벤트 등록해
 * 마우스 다운 이벤트 들어올때마다 정답 체크해
 *
 *
 */
const Preview = () => {
  const canvas = useAtomValue(canvasAtom);
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
  }, []);

  return (
    // <div className="bg-black opacity-60 z-10 w-screen h-screen">
    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded">
      <div className="flex justify-between mb-2 border-b pb-2">
        <div className="p-2">Preview</div>
        <button className="p-2">X</button>
      </div>
      <canvas id="previewCanvas" style={{ width: "800px", height: "500px" }} />
    </div>
    // </div>
  );
};
export default Preview;
