import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";

function App() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");

  /** 로그인 여부 판별 후 리다이렉트 */
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    } else {
      navigate("/");
      if (!localStorage.getItem("ojt1Data")) {
        const data = { solvedNum: 0, wrongNum: 0, correctNum: 0 };
        localStorage.setItem("ojt1Data", JSON.stringify(data));
      }
      if (!localStorage.getItem("ojt2Data")) {
        const data = { totalPlayNum: 0, totalPlayTime: 0, curPlayTime: 0 };
        localStorage.setItem("ojt2Data", JSON.stringify(data));
      }
      if (!localStorage.getItem("ojt3Data")) {
        const data = {
          getMoney: 0,
          shootCount: 0,
          hitCount: 0,
          hitBullet: 0,
          hitBomb: 0,
          hitMoney: 0,
        };
        localStorage.setItem("ojt3Data", JSON.stringify(data));
      }
      if (!localStorage.getItem("ojt4Data")) {
        const data = {
          totalPlayNum: 0,
          timeInSeconds: 0,
          bestTimeInSeconds: 1000,
          curTimeInSeconds: 0,
        };
        localStorage.setItem("ojt4Data", JSON.stringify(data));
      }

      if (!localStorage.getItem("ojt5Data")) {
        const data = { solvedNum: 0, wrongNum: 0, correctNum: 0 };
        localStorage.setItem("ojt5Data", JSON.stringify(data));
      }
      return;
    }
  }, [isLogin]);

  return (
    <div className="flex justify-center text-center">
      <div className="w-[1172px] flex justify-center flex-col">
        <Routes>
          <Route path="" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
