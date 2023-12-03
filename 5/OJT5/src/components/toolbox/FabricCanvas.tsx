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

  const handleKeyDown = (event) => {
    const pressedKey = event.key;

    if (activeObject) {
      const canvasObjects = activeObject._objects;
      switch (pressedKey) {
        case "Delete":
        case "Backspace":
          if (
            activeObject instanceof fabric.Textbox &&
            activeObject.isEditing
          ) {
            // activeObject.setSelectionStyles()
            break;
          }

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
  // useEffect(() => {
  //   // Force a re-render when activeObject changes
  // }, [activeObject]);

  useEffect(() => {
    if (!canvas) {
      setCanvas(initCanvas());
    }
    document.addEventListener("keydown", handleKeyDown);

    // document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // document.body.style.overflow = "visible";
    };
  }, [canvas, setCanvas, activeObject]);

  return (
    <div className="h-screen">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default FabricCanvas;
