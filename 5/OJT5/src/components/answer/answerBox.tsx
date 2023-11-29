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

  console.log("ok");
  return (
    <div
      className="flex flex-row w-[520px] h-60 rounded-2xl border-2 shadow-md"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      {answerList.map((imageURL: string, index: number) => (
        <div
          key={index}
          className="w-28 h-36 m-2 flex relative flex-wrap justify-center items-center"
        >
          <div className="w-24 h-8 my-2 flex justify-center items-center bg-red-700 text-white rounded-2xl">{`${
            index + 1
          }`}</div>
          <div className="h-24 w-24 overflow-hidden flex justify-center items-center">
            <img
              src={imageURL}
              alt={`${index + 1}`}
              className="block max-w-full max-h-full"
            />
          </div>

          {/* 삭제 버튼 */}
          <IconButton
            onClick={() => removeFromAnswerList(index)}
            style={{
              position: "absolute",
              top: "40px",
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
