import { answerListAtom } from "../../store/store";
import { useAtom } from "jotai";
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const AnswerBox = () => {
  const [answerList, setAnswerList] = useAtom(answerListAtom);

  const removeFromAnswerList = (idxToRemove: number) => {
    setAnswerList((prevList) =>
      prevList.filter((_, index) => index !== idxToRemove)
    );
  };

  return (
    <div className="flex flex-row">
      {answerList.map((imageURL: string, index: number) => (
        <div
          key={index}
          className="w-28 m-2 flex relative flex-wrap justify-center items-center"
        >
          <div className="w-24 h-8 my-2 flex justify-center items-center bg-blue-500 text-white rounded-2xl">{`${
            index + 1
          }`}</div>
          <img src={imageURL} alt={`${index + 1}`} className="w-24 h-24" />

          {/* 삭제 버튼 */}
          <IconButton
            onClick={() => removeFromAnswerList(index)}
            style={{
              position: "absolute",
              top: "28px",
              right: "-8px",
            }}
          >
            <DeleteForeverOutlinedIcon
              style={{
                fill: "red",
                width: "28px",
                height: "28px",
              }}
            />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
export default AnswerBox;
