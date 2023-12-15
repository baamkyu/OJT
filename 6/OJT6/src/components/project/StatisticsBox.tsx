import { selectedProjectAtom } from "../../store/store";
import { useAtomValue } from "jotai";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsBox = () => {
  const selectedProject = useAtomValue(selectedProjectAtom);

  const storedOjt1Data = localStorage.getItem("ojt1Data");
  const ojt1Data = JSON.parse(storedOjt1Data!);
  const storedOjt2Data = localStorage.getItem("ojt2Data");
  const ojt2Data = JSON.parse(storedOjt2Data!);
  const storedOjt3Data = localStorage.getItem("ojt3Data");
  const ojt3Data = JSON.parse(storedOjt3Data!);
  const storedOjt4Data = localStorage.getItem("ojt4Data");
  const ojt4Data = JSON.parse(storedOjt4Data!);
  console.log("ojt1Data", ojt1Data);
  console.log("ojt2Data", ojt2Data);
  console.log("ojt3Data", ojt3Data);
  console.log("ojt4Data", ojt4Data);

  const ojt1chart = {
    labels: ["정답", "오답"],
    datasets: [
      {
        data: [ojt1Data.correctNum, ojt1Data.wrongNum],
        backgroundColor: ["rgb(99, 255, 132)", "rgb(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // 차트의 크기를 유지하지 않음
    responsive: true, // 반응형으로 크기 조절
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 24, // 글자 크기 조절
          },
        },
      },
    },
  };

  const ojt1rate =
    Math.round(
      (ojt1Data.correctNum / (ojt1Data.wrongNum + ojt1Data.correctNum)) * 1000
    ) / 10;

  const ojt3rate =
    Math.round(
      ((ojt3Data.hitBomb + ojt3Data.hitBullet + ojt3Data.hitMoney) /
        ojt3Data.shootCount) *
        1000
    ) / 10;

  const statistics = () => {
    switch (selectedProject) {
      case "1":
        return (
          <div className="flex justify-center w-full mt-10">
            <div className="flex flex-col justify-center text-2xl mx-20">
              <p className="mb-4">맞춘 문제 수 {ojt1Data.correctNum}</p>
              <p className="mb-2">틀린 문제 수 {ojt1Data.wrongNum}</p>
              <p className="mt-10">정답률 {ojt1rate}%</p>
            </div>
            <div style={{ width: "240px", height: "240px" }}>
              <Doughnut data={ojt1chart} options={options} />
            </div>
          </div>
        );
      case "2":
        return (
          <div className="flex flex-col justify-center text-2xl mx-20 mt-10">
            <p className="mb-4">총 횟수 {ojt2Data.totalPlayNum}</p>
            <p className="mb-2">
              평균 {ojt2Data.totalPlayTime / ojt2Data.totalPlayNum}
            </p>
            <p className="mt-10">최근 기록{ojt2Data.curPlayTime}</p>
          </div>
        );
      case "3":
        return (
          <div>
            총/최대/평균 플레이 시간, 획득 머니, 적중률, 파괴아이템
            <div className="flex flex-col justify-center text-2xl mx-20">
              <p>총 플레이 시간</p>

              <p>평균 플레이 시간 (판수도 기록해야겠네?)</p>
              <p>최대 플레이 시간</p>
              <br />
              <hr />
              <br />
              <p className="mb-4">총 획득한 머니 {ojt3Data.getMoney}</p>
              <p className="mb-4">파괴한 폭탄 수 {ojt3Data.hitBomb}</p>
              <p className="mb-4">파괴한 총알 수 {ojt3Data.hitBullet}</p>
              <p className="mb-4">파괴한 머니 수 {ojt3Data.hitMoney}</p>
              <p className="mt-10">명중률 {ojt3rate}%</p>
            </div>
          </div>
        );
      case "4":
        return (
          <div className="flex flex-col justify-center items-center text-2xl m-20">
            <p className="mb-4">최고 기록 {ojt4Data.bestTimeInSeconds}</p>
            <p className="mb-4">누적 플레이 횟수 {ojt4Data.totalPlayNum}</p>
            <p className="mb-4">누적 플레이 타임 {ojt4Data.timeInSeconds}</p>
            <p className="mb-4">최근 기록 {ojt4Data.curTimeInSeconds}</p>
          </div>
        );
      case "5":
        return <div>총 푼 문제 수, 틀린 문제 수, 맞춘 문제 수, 정답률</div>;
    }
  };

  return <>{statistics()}</>;
};
export default StatisticsBox;
