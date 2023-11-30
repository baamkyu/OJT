import { answer } from "../../store/store";
const GradingButton = (selectedAnswer: string) => {
  const selectedAnswerNum: number = Number(selectedAnswer["selectedAnswer"]);

  const checkAnswer = () => {
    if (answer === selectedAnswerNum) {
      console.log("정답");
    } else {
      console.log(answer, typeof answer);
      console.log(selectedAnswerNum, typeof selectedAnswerNum);
      console.log("selectedAnswer", selectedAnswer);
      console.log("오답");
    }
  };
  return (
    <div className="flex">
      <button
        onClick={checkAnswer}
        className="rounded-2xl bg-black text-white text-xl w-full h-10 mt-1"
      >
        채점하기
      </button>
    </div>
  );
};
export default GradingButton;
