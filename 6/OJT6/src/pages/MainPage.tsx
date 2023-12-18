import Header from "../components/header/Header";
import ContentBox from "../components/project/ContentBox";
import Category from "../components/category/Category";

const MainPage = () => {
  // 초기 값을 설정합니다.
  let ojt1Data: { solvedNum: number; wrongNum: number; correctNum: number } = {
    solvedNum: 0,
    wrongNum: 0,
    correctNum: 0,
  };
  let ojt2Data: {
    totalPlayNum: number;
    totalPlayTime: number;
    curPlayTime: number;
  } = { totalPlayNum: 0, totalPlayTime: 0, curPlayTime: 0 };
  let ojt3Data: {
    getMoney: number;
    hitBomb: number;
    hitBullet: number;
    hitCount: number;
    hitMoney: number;
    shootCount: number;
  } = {
    getMoney: 0,
    hitBomb: 0,
    hitBullet: 0,
    hitCount: 0,
    hitMoney: 0,
    shootCount: 0,
  };
  let ojt4Data: {
    totalPlayNum: number;
    timeInSeconds: number;
    bestTimeInSeconds: number;
    curTimeInSeconds: number;
  } = {
    totalPlayNum: 0,
    timeInSeconds: 0,
    bestTimeInSeconds: 1000,
    curTimeInSeconds: 0,
  };
  let ojt5Data: { solvedNum: number; wrongNum: number; correctNum: number } = {
    solvedNum: 0,
    wrongNum: 0,
    correctNum: 0,
  };

  /** 로컬 스토리지에서 데이터 가져오기 */
  const ojt1DataString = localStorage.getItem("ojt1Data");
  const ojt2DataString = localStorage.getItem("ojt2Data");
  const ojt3DataString = localStorage.getItem("ojt3Data");
  const ojt4DataString = localStorage.getItem("ojt4Data");
  const ojt5DataString = localStorage.getItem("ojt5Data");

  /** 가져온 JSON 데이터 string -> 알맞은 타입으로 파싱 */
  if (ojt1DataString) {
    ojt1Data = JSON.parse(ojt1DataString);
  }
  if (ojt2DataString) {
    ojt2Data = JSON.parse(ojt2DataString);
  }
  if (ojt3DataString) {
    ojt3Data = JSON.parse(ojt3DataString);
  }
  if (ojt4DataString) {
    ojt4Data = JSON.parse(ojt4DataString);
  }
  if (ojt5DataString) {
    ojt5Data = JSON.parse(ojt5DataString);
  }

  const ojtData = { ojt1Data, ojt2Data, ojt3Data, ojt4Data, ojt5Data };
  return (
    <>
      <Header />
      <Category />
      {/* <div className="flex justify-center h-[800px] w-full mt-4 bg-blue-100 rounded-2xl"> */}
      <div className="h-[800px] w-full mt-4">
        <ContentBox data={ojtData} />
      </div>
    </>
  );
};

export default MainPage;
