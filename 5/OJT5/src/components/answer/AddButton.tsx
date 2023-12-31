import { activeObjectAtom, answerListAtom } from "../../store/store";
import { useAtom, useAtomValue } from "jotai";
import { fabric } from "fabric";
import { useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddButton = () => {
  const activeObject = useAtomValue(activeObjectAtom);
  const [answerList, setAnswerList] = useAtom(answerListAtom);

  /** 선택된 object를 answerList에 추가해주는 함수 */

  const toAnswerList = () => {
    if (activeObject instanceof fabric.Object) {
      const imageDataURL = activeObject.toDataURL({ format: "png" });
      fabric.Image.fromURL(imageDataURL, () => {
        setAnswerList((prev) => [
          ...prev,
          { object: activeObject, imgURL: imageDataURL },
        ]);
      });
    }
  };

  return (
    <div className="flex h-56">
      {activeObject ? (
        // activeObject가 있을 때의 버튼 UI
        <div className="bg-answernumber rounded-xl">
          <IconButton className="w-10 h-56 " onClick={toAnswerList}>
            <AddCircleOutlineIcon
              style={{ color: "white", fontSize: "32px", fontWeight: "bold" }}
            />
          </IconButton>
        </div>
      ) : (
        <IconButton className="w-10 h-56" disabled>
          <AddCircleOutlineIcon style={{ fontSize: "32px" }} />
        </IconButton>
      )}
    </div>
  );
};
export default AddButton;
