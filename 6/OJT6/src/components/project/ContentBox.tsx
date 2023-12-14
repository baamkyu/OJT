import {
  selectedProjectAtom,
  ojt1Atom,
  ojt2Atom,
  ojt3Atom,
  ojt4Atom,
} from "../../store/store";
import { useAtomValue, useSetAtom } from "jotai";

import OJT5 from "./OJT5";
import { useEffect } from "react";

const ContentBox = () => {
  const selectedProject = useAtomValue(selectedProjectAtom);
  const setOjt1 = useSetAtom(ojt1Atom);
  const setOjt2 = useSetAtom(ojt2Atom);
  const setOjt3 = useSetAtom(ojt3Atom);
  const setOjt4 = useSetAtom(ojt4Atom);

  useEffect(() => {
    const handler = function (event: MessageEvent) {
      switch (event.data.type) {
        case "ojt1 correct":
          setOjt1((prevOjt1) => ({
            ...prevOjt1,
            correctNum: prevOjt1.correctNum + 1,
          }));
          console.log("ojt1 correct 실행");
          break;
        case "ojt1 wrong":
          setOjt1((prevOjt1) => ({
            ...prevOjt1,
            wrongNum: prevOjt1.wrongNum + 1,
          }));
          console.log("ojt1 wrong 실행");
          break;
        case "ojt2-1 finish":
          console.log("ojt2-1 finish 실행");
          break;
        case "ojt2-2 finish":
          setOjt2((prevOjt2) => ({
            ...prevOjt2,
            finishedNum: prevOjt2.finishedNum + 1,
            time: prevOjt2.time + event.data.time,
          }));
          console.log("ojt2-2 finish 실행");
          break;
        case "ojt3 finish":
          console.log("ojt3 finish 실행");
          setOjt3((prevOjt3) => ({
            ...prevOjt3,
            getMoney: prevOjt3.getMoney + event.data.getMoney,
            hitRate: prevOjt3.hitRate + event.data.hitRate,
            hitBullet: prevOjt3.hitBullet + event.data.hitBullet,
            hitBomb: prevOjt3.hitBomb + event.data.hitBomb,
            hitMoney: prevOjt3.hitMoney + event.data.hitMoney,
          }));
          break;
        case "ojt4 finish":
          console.log("ojt4 finish 실행");
          break;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setOjt1, setOjt2, setOjt3]);

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
