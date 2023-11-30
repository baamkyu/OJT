import { answerListAtom } from "../../store/store";
import { useState } from "react";
import { useAtom } from "jotai";
import GradingButton from "./GradingButton";

import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const AnswerBox = () => {
  const [answerList, setAnswerList] = useAtom(answerListAtom);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const removeFromAnswerList = (idxToRemove: number) => {
    setAnswerList((prevList) =>
      prevList.filter((_, index) => index !== idxToRemove)
    );
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedAnswer(event.target.value);
  };

  console.log("ok");
  return (
    <div className="flex flex-col  w-[520px] h-60">
      <div
        className="flex flex-row w-[520px] h-60 rounded-2xl border-2 shadow-md"
        style={{ backgroundColor: "#E5E9EC" }}
      >
        <RadioGroup value={selectedAnswer} onChange={handleRadioChange}>
          {answerList.map((imageURL: string, index: number) => (
            <div
              key={index}
              className="w-28 h-36 m-2 flex relative flex-wrap justify-center items-center"
            >
              <div className="w-24 h-8 my-2 flex justify-center items-center bg-answernumber text-white rounded-2xl">{`${
                index + 1
              }`}</div>
              <div className="h-32 w-24 p-2 overflow-hidden flex justify-center items-center border-2 border-gray-400">
                <img
                  src={imageURL}
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
          ))}
        </RadioGroup>
      </div>
      <div className="mt-4">
        {answerList.length >= 4 && (
          <GradingButton selectedAnswer={selectedAnswer} />
        )}
      </div>
    </div>
  );
};
export default AnswerBox;
