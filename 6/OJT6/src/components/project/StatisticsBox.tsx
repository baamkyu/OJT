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
  const storedOjt5Data = localStorage.getItem("ojt5Data");
  const ojt5Data = JSON.parse(storedOjt5Data!);
  console.log("ojt1Data", ojt1Data);
  console.log("ojt2Data", ojt2Data);
  console.log("ojt3Data", ojt3Data);
  console.log("ojt4Data", ojt4Data);
  console.log("ojt5Data", ojt5Data);

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
  const ojt5chart = {
    labels: ["정답", "오답"],
    datasets: [
      {
        data: [ojt5Data.correctNum, ojt5Data.wrongNum],
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
          color: "white",
          font: {
            size: 24,
            weight: 700,
          },
        },
      },
    },
  };

  const ojt1rate =
    Math.round(
      (ojt1Data.correctNum / (ojt1Data.wrongNum + ojt1Data.correctNum)) * 1000
    ) / 10;
  const ojt2AvgTime =
    Math.round((ojt2Data.totalPlayTime / ojt2Data.totalPlayNum) * 10) / 10;

  const ojt3rate =
    Math.round(
      ((ojt3Data.hitBomb + ojt3Data.hitBullet + ojt3Data.hitMoney) /
        ojt3Data.shootCount) *
        1000
    ) / 10;
  const ojt5rate =
    Math.round(
      (ojt5Data.correctNum / (ojt5Data.wrongNum + ojt5Data.correctNum)) * 1000
    ) / 10;

  const secondToMinute = (num: number): string => {
    const time = Math.round(num);
    const min = Math.floor(time / 60);
    const sec = time % 60;

    const formattedMin = min === 0 ? "0" : min < 10 ? `0${min}` : `${min}`;
    const formattedSec = sec < 10 ? `0${sec}` : `${sec}`;

    return `${formattedMin}분 ${formattedSec}초`;
  };
  const statistics = () => {
    switch (selectedProject) {
      case "1":
        return (
          <>
            {ojt1Data.correctNum != 0 || ojt1Data.wrongNum != 0 ? (
              <div className="flex justify-center w-fit bg-green-700 text-2xl mt-10 p-10 rounded-xl">
                <div className="flex flex-col justify-center text-2xl mx-20 text-white font-semibold">
                  <p className="mb-4">맞힌 문제 수 : {ojt1Data.correctNum}</p>
                  <p className="mb-2">틀린 문제 수 : {ojt1Data.wrongNum}</p>
                  <p className="mt-10">정답률 : {ojt1rate}%</p>
                </div>
                {(ojt1Data.correctNum != 0 || ojt1Data.wrongNum != 0) && (
                  <div style={{ width: "240px", height: "240px" }}>
                    <Doughnut data={ojt1chart} options={options} />
                  </div>
                )}
              </div>
            ) : (
              <>기록 없음</>
            )}
          </>
        );

      case "2":
        return (
          <>
            {ojt2Data.totalPlayNum != 0 ? (
              <div className="flex flex-col justify-center w-fit bg-green-700 text-2xl mx-20 mt-10 p-10 rounded-xl">
                <div className="flex flex-row justify-center">
                  <div className="flex flex-col">
                    <div className="mb-2 text-white font-semibold">
                      평균 기록
                    </div>
                    <div className="flex items-center justify-center w-56 h-32 mx-8 bg-black border-8 border-gray-500">
                      <span className="text-red-500 font-bold italic text-4xl">
                        {ojt2AvgTime}초
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-2 text-white font-semibold">
                      최근 기록
                    </div>
                    <div className="flex items-center justify-center w-56 h-32 mx-8 bg-black border-8 border-gray-500">
                      <span className="text-red-500 font-bold italic text-4xl">
                        {ojt2Data.curPlayTime}초
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>기록 없음</>
            )}
          </>
        );
      case "3":
        return (
          <>
            {ojt3rate || ojt3Data.getMoney ? (
              <div className="flex flex-col justify-center w-fit min-w-[400px] bg-green-700 text-2xl mx-20 mt-10 p-10 rounded-xl text-white">
                <div className="text-3xl mb-12 font-bold">전투기 게임 기록</div>
                <div className="text-xl font-semibold w-fit">
                  <p className="mb-8 flex w-fit">
                    <img
                      src="/assets/getMoney.png"
                      alt="getMoney"
                      className="w-10 h-10 inline-block mr-2"
                    />
                    획득 머니 : {ojt3Data.getMoney}
                  </p>
                  <p className="mb-4 flex w-fit">
                    <img
                      src="/assets/bomb.png"
                      alt="hitBomb"
                      className="w-10 h-10 inline-block mr-2"
                    />
                    파괴한 폭탄 수 : {ojt3Data.hitBomb}
                  </p>
                  <p className="mb-8 flex w-fit">
                    <img
                      src="/assets/bullet.png"
                      alt="hitBullet"
                      className="w-10 h-10 inline-block mr-2"
                    />
                    파괴한 총알 수 : {ojt3Data.hitBullet}
                  </p>
                  <p className="flex w-fit">
                    <img
                      src="/assets/hitRate.png"
                      alt="hitRate"
                      className="w-10 h-10 inline-block mr-2"
                    />
                    명중률 : {ojt3rate ? ojt3rate : 0} %
                  </p>
                </div>
              </div>
            ) : (
              <>기록 없음</>
            )}
          </>
          // </div>
        );
      case "4":
        return (
          <>
            {ojt4Data.bestTimeInSeconds != 1000 ? (
              <div className="flex flex-col justify-center w-fit min-w-[400px] bg-green-700 text-2xl mx-20 mt-10 p-10 rounded-xl text-white">
                <div className="text-3xl mb-12 font-bold">레이스 게임 기록</div>
                <div className="text-xl font-semibold w-fit">
                  <p className="mb-8 flex">
                    👑 최고 기록 : {secondToMinute(ojt4Data.bestTimeInSeconds)}
                  </p>
                  <p className="mb-4 flex">
                    🆕 최근 기록 : {secondToMinute(ojt4Data.curTimeInSeconds)}
                  </p>
                  <p className="mb-16 flex">
                    🕟︎ 평균 플레이 타임 :{" "}
                    {secondToMinute(
                      ojt4Data.timeInSeconds / ojt4Data.totalPlayNum
                    )}
                  </p>
                  <p className="mb-4 flex">
                    ♻︎ 누적 플레이 횟수 : {ojt4Data.totalPlayNum}회
                  </p>
                  <p className="mb-8 flex">
                    🕟︎ 누적 플레이 타임 :{" "}
                    {secondToMinute(ojt4Data.timeInSeconds)}
                  </p>
                </div>
              </div>
            ) : (
              <>기록 없음</>
            )}
          </>
        );
      case "5":
        return (
          <>
            {ojt5Data.correctNum != 0 || ojt5Data.wrongNum != 0 ? (
              <div className="flex justify-center w-fit bg-green-700 text-2xl mt-10 p-10 rounded-xl">
                <div className="flex flex-col justify-center text-2xl mx-20 text-white font-semibold">
                  <p className="mb-4">맞힌 문제 수 : {ojt5Data.correctNum}</p>
                  <p className="mb-2">틀린 문제 수 : {ojt5Data.wrongNum}</p>
                  <p className="mt-10">정답률 : {ojt5rate}%</p>
                </div>
                {(ojt5Data.correctNum != 0 || ojt5Data.wrongNum != 0) && (
                  <div style={{ width: "240px", height: "240px" }}>
                    <Doughnut data={ojt5chart} options={options} />
                  </div>
                )}
              </div>
            ) : (
              <>기록 없음</>
            )}
          </>
        );
    }
  };

  return <div className="flex justify-center">{statistics()}</div>;
};
export default StatisticsBox;
