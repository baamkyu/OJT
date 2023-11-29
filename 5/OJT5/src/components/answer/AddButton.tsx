import { activeObjectAtom, answerListAtom } from "../../store/store";
import { useAtom, useAtomValue } from "jotai";
import { fabric } from "fabric";

const AddButton = () => {
  const activeObject = useAtomValue(activeObjectAtom);
  const [answerList, setAnswerList] = useAtom(answerListAtom);

  const toAnswerList = () => {
    console.log(activeObject);
    if (activeObject instanceof fabric.Object) {
      const imageDataURL = activeObject.toDataURL({ format: "png" });
      fabric.Image.fromURL(imageDataURL, () => {
        if (answerList.length < 4) {
          setAnswerList((prev) => [...prev, imageDataURL]);
        }
      });
    }
  };

  return (
    <>
      <button
        className="w-10 h-10 bg-red-700 text-white"
        onClick={toAnswerList}
      >
        +
      </button>
    </>
  );
};
export default AddButton;
