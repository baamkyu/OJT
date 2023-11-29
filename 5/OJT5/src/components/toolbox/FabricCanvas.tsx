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
      backgroundColor: "#f0f0f0",
    });

  useEffect(() => {
    if (!canvas) {
      setCanvas(initCanvas());
    }
  }, [canvas, setCanvas]);

  return <canvas ref={canvasRef}></canvas>;
};

export default FabricCanvas;
