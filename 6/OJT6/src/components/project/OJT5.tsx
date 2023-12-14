import {
  contentJSONAtom,
  answerJSONAtom,
  problemNumAtom,
} from "../../store/store";
import { useAtom, useAtomValue } from "jotai";
import { fabric } from "fabric";
import { useEffect, useState, useRef } from "react";

const OJT5 = () => {
  const contentJSON = useAtomValue(contentJSONAtom);
  const answerJSON = useAtomValue(answerJSONAtom);
  const [problemNum, setProblemNum] = useAtom(problemNumAtom);

  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [result, setResult] = useState<boolean | null>(null);

  const [newCanvas, setNewCanvas] = useState<fabric.Canvas | null>(null);
  const lastCanvasRef = useRef<null | fabric.Canvas>(null);

  useEffect(() => {
    if (!newCanvas) {
      setNewCanvas(
        new fabric.Canvas("previewCanvas", {
          width: 1200,
          height: 675,
          backgroundColor: "#ffffff",
        })
      );
    }
  }, [newCanvas]);

  useEffect(() => {
    if (newCanvas) {
      newCanvas.loadFromJSON(contentJSON[problemNum], function () {
        newCanvas.getObjects().forEach((obj) => {
          obj.selectable = false;
          obj.hoverCursor = "pointer";
        });
        newCanvas.renderAll();
        lastCanvasRef.current = newCanvas; // Update the lastCanvasRef
      });
      newCanvas.on("mouse:down", function (event) {
        if (event.target) {
          const clickedObject = event.target?.toObject();
          const clickX = event.e.clientX; // 마우스 클릭된 x 좌표
          const clickY = event.e.clientY; // 마우스 클릭된 y 좌표
          console.log(clickedObject, answerJSON[problemNum]);
          /** 정답 확인
           * 이미지인 경우
           * 이미지가 아닌 경우
           * 두 가지로 분류해서 같은 객체인지 비교
           */
          if (event.target?.type === "image") {
            if (
              event.target?.height === answerJSON[problemNum].height &&
              event.target?.left === answerJSON[problemNum].left &&
              event.target?.top === answerJSON[problemNum].top &&
              event.target?.width === answerJSON[problemNum].width &&
              event.target?.angle === answerJSON[problemNum].angle &&
              event.target?.type === answerJSON[problemNum].type
            ) {
              setResult(true);
              setTimeout(() => {
                setResult(null);
              }, 3000);
              console.log("answer Image", problemNum);
            } else {
              setResult(false);
              setTimeout(() => {
                setResult(null);
              }, 1500);
            }
          } else if (
            clickedObject &&
            answerJSON &&
            clickedObject.fill === answerJSON[problemNum].fill &&
            clickedObject.height === answerJSON[problemNum].height &&
            clickedObject.width === answerJSON[problemNum].width &&
            clickedObject.opacity === answerJSON[problemNum].opacity &&
            clickedObject.type === answerJSON[problemNum].type &&
            clickedObject.stroke === answerJSON[problemNum].stroke &&
            clickedObject.strokeWidth === answerJSON[problemNum].strokeWidth &&
            clickedObject.strokeDashArray ===
              answerJSON[problemNum].strokeDashArray
          ) {
            console.log("answer Object", problemNum);
            setResult(true);

            setTimeout(() => {
              setResult(null);
            }, 3000);
          } else if (clickedObject === undefined) {
            console.log("undefinedzzz");
          } else {
            console.log("no answer");
            setResult(false);

            setTimeout(() => {
              setResult(null);
            }, 1500);
          }
          setClickPosition({ x: clickX, y: clickY });
        }
      });
      return () => {
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        newCanvas.off("mouse:down");
      };
    }
  }, [problemNum, newCanvas]);

  return (
    <>
      <div className="shadow-lg drop-shadow-l">
        {result === true ? (
          <div
            style={{
              position: "absolute",
              left: `calc(${clickPosition.x}px + 24px)`,
              top: `calc(${clickPosition.y}px)`,
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
              left: `calc(${clickPosition.x}px + 24px)`,
              top: `calc(${clickPosition.y}px)`,
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

      <div className="flex flex-col items-center">
        <button
          onClick={() => setProblemNum(0)}
          className="w-1/2 h-10 text-lg text-white bg-black rounded-lg mt-8 hover:bg-gray-100 hover:text-gray-800 hover:font-bold transition duration-300 border border-solid border-gray-800 shadow-inner"
        >
          문제 1
        </button>
        <button
          onClick={() => setProblemNum(1)}
          className="w-1/2 h-10 text-lg text-white bg-black rounded-lg mt-4 hover:bg-gray-100 hover:text-gray-800 hover:font-bold transition duration-300 border border-solid border-gray-800 shadow-inner"
        >
          문제 2
        </button>
        <button className="w-1/2 h-10 text-lg text-white bg-black rounded-lg mt-4 hover:bg-gray-100 hover:text-gray-800 hover:font-bold transition duration-300 border border-solid border-gray-800 shadow-inner">
          문제 3
        </button>
        <button className="w-1/2 h-10 text-lg text-white bg-black rounded-lg mt-4 hover:bg-gray-100 hover:text-gray-800 hover:font-bold transition duration-300 border border-solid border-gray-800 shadow-inner">
          문제 4
        </button>
      </div>
    </>
  );
};

export default OJT5;
