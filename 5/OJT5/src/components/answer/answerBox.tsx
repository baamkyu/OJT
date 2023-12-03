import { answerAtom, answerListAtom } from "../../store/store";
import { useAtom } from "jotai";

import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const AnswerBox = () => {
  const [answerList, setAnswerList] = useAtom(answerListAtom);
  const [answer, setAnswer] = useAtom(answerAtom);

  const removeFromAnswerList = (idxToRemove: number) => {
    setAnswerList((prevList) =>
      prevList.filter((_, index) => index !== idxToRemove)
    );
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(answerList[Number(event.target.value) - 1].object);
  };

  return (
    <div className="bg-F2F5F5">
      <div
        className="flex flex-row h-60 rounded-2xl shadow-md"
        style={{ backgroundColor: "#E5E9EC" }}
      >
        <RadioGroup onChange={handleRadioChange}>
          <div className="flex flex-row">
            {answerList.map(
              (
                answerListItem: { object: fabric.Object; imgURL: string },
                index: number
              ) => (
                <div
                  key={index}
                  className="m-2 flex relative flex-col flex-wrap justify-center items-center"
                >
                  <div className="w-24 h-8 my-2 flex justify-center items-center bg-answernumber text-white rounded-2xl">{`${
                    index + 1
                  }`}</div>
                  <div className="h-32 w-24 p-2 flex justify-center items-center border-2 border-gray-400">
                    <img
                      src={answerListItem.imgURL}
                      alt={`${index + 1}`}
                      className="block max-w-full max-h-full"
                    />
                  </div>
                  <Radio value={`${index + 1}`} />
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
              )
            )}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
export default AnswerBox;
