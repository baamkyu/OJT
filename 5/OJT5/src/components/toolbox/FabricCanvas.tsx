import { useEffect, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { fabric } from "fabric";
import { activeObjectAtom, canvasAtom } from "../../store/store";

const FabricCanvas = () => {
  const [canvas, setCanvas] = useAtom(canvasAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeObject = useAtomValue(activeObjectAtom);

  const initCanvas = () =>
    new fabric.Canvas(canvasRef.current, {
      width: 1200,
      height: 675,
      backgroundColor: "#ffffff",
    });

  /** 단축키, 키보드이벤트 세팅 */
  const handleKeyDown = (event) => {
    const pressedKey = event.key;

    if (activeObject) {
      const canvasObjects = activeObject._objects;
      switch (pressedKey) {
        case "Delete":
        case "Backspace":
          if (activeObject instanceof fabric.Textbox && activeObject.isEditing)
            break;

          if (canvasObjects) {
            canvasObjects.forEach((obj) => {
              canvas!.remove(obj);
            });
            canvas!.discardActiveObject();
            canvas!.renderAll();
            break;
          } else {
            canvas!.remove(activeObject);
            canvas!.renderAll();
            break;
          }
        case "ArrowUp":
          activeObject.set("top", (activeObject.top ?? 0) - 1);
          canvas!.renderAll();
          break;
        case "ArrowDown":
          activeObject.set("top", (activeObject.top ?? 0) + 1);
          canvas!.renderAll();
          break;
        case "ArrowLeft":
          activeObject.set("left", (activeObject.left ?? 0) - 1);
          canvas!.renderAll();
          break;
        case "ArrowRight":
          activeObject.set("left", (activeObject.left ?? 0) + 1);
          canvas!.renderAll();
          break;
        case "Escape":
          canvas!.discardActiveObject();
          canvas!.renderAll();
          break;
        default:
          console.log(pressedKey);
          console.log("default");
          break;
      }
    } else {
      console.log("no active object");
    }
  };

  useEffect(() => {
    if (!canvas) {
      setCanvas(initCanvas());
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas, setCanvas, activeObject]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default FabricCanvas;
