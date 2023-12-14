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
