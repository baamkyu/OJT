import { selectedProjectAtom } from "../../store/store";
import { useAtomValue } from "jotai";

import OJT5 from "./OJT5";
import { useEffect } from "react";
interface ContentBoxProps {
  data: {
    ojt1Data: { solvedNum: number; wrongNum: number; correctNum: number };
    ojt2Data: {
      totalPlayNum: number;
      totalPlayTime: number;
      curPlayTime: number;
    };
    ojt3Data: {
      getMoney: number;
      hitBomb: number;
      hitBullet: number;
      hitCount: number;
      hitMoney: number;
      shootCount: number;
    };
    ojt4Data: {
      totalPlayNum: number;
      timeInSeconds: number;
      bestTimeInSeconds: number;
      curTimeInSeconds: number;
    };
    ojt5Data: { solvedNum: number; wrongNum: number; correctNum: number };
  };
}

const ContentBox = ({ data }: ContentBoxProps) => {
  const selectedProject = useAtomValue(selectedProjectAtom);
  const ojt1Data = data.ojt1Data;
  const ojt2Data = data.ojt2Data;
  const ojt3Data = data.ojt3Data;
  const ojt4Data = data.ojt4Data;
  const ojt5Data = data.ojt5Data;

  useEffect(() => {
    const handler = function (event: MessageEvent) {
      switch (event.data.type) {
        case "ojt1 correct":
          ojt1Data.solvedNum += 1;
          ojt1Data.correctNum += 1;
          localStorage.setItem("ojt1Data", JSON.stringify(ojt1Data));
          console.log("ojt1 correct 실행");
          break;
        case "ojt1 wrong":
          ojt1Data.solvedNum += 1;
          ojt1Data.wrongNum += 1;
          localStorage.setItem("ojt1Data", JSON.stringify(ojt1Data));
          console.log("ojt1 wrong 실행");
          break;
        case "ojt2-1 finish":
          console.log("ojt2-1 finish 실행");
          break;
        case "ojt2-2 finish":
          ojt2Data.curPlayTime = event.data.time;
          ojt2Data.totalPlayTime += event.data.time;
          ojt2Data.totalPlayNum += 1;
          localStorage.setItem("ojt2Data", JSON.stringify(ojt2Data));
          break;
        case "ojt3 finish":
          console.log("ojt3 finish 실행");
          ojt3Data.getMoney += event.data.getMoney;
          ojt3Data.shootCount += event.data.shootCount;
          ojt3Data.hitBullet += event.data.hitBullet;
          ojt3Data.hitBomb += event.data.hitBomb;
          ojt3Data.hitMoney += event.data.hitMoney;
          localStorage.setItem("ojt3Data", JSON.stringify(ojt3Data));
          break;
        case "ojt4 finish":
          console.log("ojt4 finish 실행");
          console.log(ojt4Data);
          ojt4Data.totalPlayNum += 1;
          ojt4Data.timeInSeconds += event.data.timeInSeconds;
          ojt4Data.curTimeInSeconds = event.data.timeInSeconds;
          if (event.data.timeInSeconds < ojt4Data.bestTimeInSeconds)
            ojt4Data.bestTimeInSeconds = event.data.timeInSeconds;
          localStorage.setItem("ojt4Data", JSON.stringify(ojt4Data));
          break;
        case "ojt5 correct":
          console.log("ojt5 correct");
          ojt5Data.correctNum += 1;
          ojt5Data.solvedNum += 1;
          localStorage.setItem("ojt5Data", JSON.stringify(ojt5Data));
          break;
        case "ojt5 wrong":
          console.log("ojt5 wrong");
          ojt5Data.wrongNum += 1;
          ojt5Data.solvedNum += 1;
          localStorage.setItem("ojt5Data", JSON.stringify(ojt5Data));
          break;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  if (!selectedProject) return null;
  if (selectedProject === "5") return <OJT5 />;
  return (
    <iframe
      src={`/projects/ojt${selectedProject}/dist/index.html`}
      width="100%"
      height="100%"
    />
  );
};
export default ContentBox;
