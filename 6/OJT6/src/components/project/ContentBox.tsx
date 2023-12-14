import {
  selectedProjectAtom,
  ojt1Atom,
  ojt2Atom,
  ojt3Atom,
  ojt4Atom,
} from "../../store/store";
import { useAtomValue, useSetAtom } from "jotai";

import OJT5 from "./OJT5";

const ContentBox = () => {
  const selectedProject = useAtomValue(selectedProjectAtom);
  const setOjt1 = useSetAtom(ojt1Atom);
  const setOjt2 = useSetAtom(ojt2Atom);
  const setOjt3 = useSetAtom(ojt3Atom);
  const setOjt4 = useSetAtom(ojt4Atom);

  const ojt1CorrectNum = () => {
    setOjt1((prevOjt1) => ({
      ...prevOjt1,
      correctNum: prevOjt1.correctNum + 1,
    }));
  };
  const ojt1WrongNum = () => {
    setOjt1((prevOjt1) => ({
      ...prevOjt1,
      wrongNum: prevOjt1.wrongNum + 1,
    }));
  };
  const ojt2TotalTime = (time) => {
    setOjt2((prevOjt2) => ({
      ...prevOjt2,
      finishedNum: prevOjt2.finishedNum + 1,
      time: prevOjt2.time + time,
    }));
  };
  const ojt3statistics = (getMoney, hitRate, hitBullet, hitBomb, hitMoney) => {
    setOjt3((prevOjt3) => ({
      ...prevOjt3,
      getMoney: prevOjt3.getMoney + getMoney,
      hitRate: prevOjt3.hitRate + hitRate,
      hitBullet: prevOjt3.hitBullet + hitBullet,
      hitBomb: prevOjt3.hitBomb + hitBomb,
      hitMoney: prevOjt3.hitMoney + hitMoney,
    }));
  };

  const iframe = () => {
    window.addEventListener("message", function (event) {
      switch (event.data.type) {
        case "ojt1 correct":
          ojt1CorrectNum();
          console.log("ojt1 correct 실행");
          break;
        case "ojt1 wrong":
          ojt1WrongNum();
          console.log("ojt1 wrong 실행");
          break;
        case "ojt2-1 finish":
          console.log("ojt2-1 finish 실행");
          break;
        case "ojt2-2 finish":
          ojt2TotalTime(event.data.time);
          console.log("ojt2-2 finish 실행");
          break;
        case "ojt3 finish":
          console.log("ojt3 finish 실행");
          ojt3statistics(
            event.data.getMoney,
            event.data.hitRate,
            event.data.hitBullet,
            event.data.hitBomb,
            event.data.hitMoney
          );
          break;
        case "ojt4 finish":
          console.log("ojt4 finish 실행");
          break;
      }
    });

    switch (selectedProject) {
      case "1":
        return (
          <iframe
            src="/projects/ojt1/dist/index.html"
            width="100%"
            height="100%"
            className="shadow-lg drop-shadow-l"
          />
        );
      case "2":
        return (
          <iframe
            src="/projects/ojt2/dist/index.html"
            width="100%"
            height="100%"
            className="shadow-lg drop-shadow-l"
          />
        );

      case "3":
        return (
          <iframe
            src="/projects/ojt3/dist/index.html"
            width="100%"
            height="100%"
          />
        );
      case "4":
        return (
          <iframe
            src="/projects/ojt4/dist/index.html"
            width="100%"
            height="100%"
          />
        );
      case "5":
        return <OJT5 />;
    }
  };

  return <>{iframe()}</>;
};
export default ContentBox;
