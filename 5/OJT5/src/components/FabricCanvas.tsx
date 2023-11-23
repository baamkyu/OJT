import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { fabric } from "fabric";
import { canvasAtom } from "../store/store";

const FabricCanvas = () => {
  const [canvas, setCanvas] = useAtom(canvasAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initCanvas = () =>
    new fabric.Canvas(canvasRef.current, {
      width: 1600,
      height: 900,
      backgroundColor: "#d9d9d9",
    });

  useEffect(() => {
    if (!canvas) {
      setCanvas(initCanvas());
    }
  }, [canvas, setCanvas]);

  return <canvas ref={canvasRef}></canvas>;
};

export default FabricCanvas;
