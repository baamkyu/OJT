import { useAtomValue } from "jotai";
import { canvasAtom } from "../store/store";

const ExportCanvas = () => {
  const canvas = useAtomValue(canvasAtom);
  if (!canvas) {
    // canvas가 null 또는 undefined일 때의 처리
    return null; // 또는 다른 처리
  }
  // fabric.js Canvas 객체를 JSON으로 변환
  const canvasJSON = canvas.toJSON();
  console.log(canvasJSON);
  return canvasJSON;
};

//   console.log(
//     "JSON with additional properties included: ",
//     canvas?.toJSON([
//       "lockMovementX",
//       "lockMovementY",
//       "lockRotation",
//       "lockScalingX",
//       "lockScalingY",
//       "lockUniScaling",
//     ])
//   );
// 나머지 컴포넌트 로직...
//   console.log(JSON.stringify(canvas));
// };
export default ExportCanvas;
