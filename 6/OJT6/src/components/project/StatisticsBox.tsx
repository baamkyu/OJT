import {
  selectedProjectAtom,
  ojt1Atom,
  ojt2Atom,
  ojt3Atom,
  ojt4Atom,
} from "../../store/store";
import { useAtomValue } from "jotai";

const StatisticsBox = () => {
  const selectedProject = useAtomValue(selectedProjectAtom);

  const ojt1 = useAtomValue(ojt1Atom);
  const ojt2 = useAtomValue(ojt2Atom);
  const ojt3 = useAtomValue(ojt3Atom);
  const ojt4 = useAtomValue(ojt4Atom);
  const statistics = () => {
    switch (selectedProject) {
      case "1":
        return (
          <div>
            총 푼 문제 수, 맞춘 문제 수, 틀린 문제 수, 정답률
            <p>
              {ojt1.solvedNum}, {ojt1.correctNum}, {ojt1.wrongNum}
            </p>
          </div>
        );
      case "2":
        return (
          <div>
            총 횟수, 평균 걸린 시간
            <p>
              {ojt2.finishedNum}, {ojt2.time}
            </p>
          </div>
        );
      case "3":
        return (
          <div>
            총/최대/평균 플레이 시간, 획득 머니, 적중률, 파괴아이템
            <p>
              {ojt3.totalPlayTime}, {ojt3.maxPlayTime}, {ojt3.avgPlayTime},
              {ojt3.getMoney}, {ojt3.targetPercent}
            </p>
          </div>
        );
      case "4":
        return <div>총/최소/평균 플레이 시간</div>;
      case "5":
        return <div>총 푼 문제 수, 틀린 문제 수, 맞춘 문제 수, 정답률</div>;
    }
  };

  return <>{statistics()}</>;
};
export default StatisticsBox;
