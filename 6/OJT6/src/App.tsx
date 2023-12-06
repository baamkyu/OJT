// import Header from "./components/header/Header";
// import Body from "./components/body/Body";
// import LoginPage from "./pages/LoginPage";
// import Transition from "./Transition";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

import { isLogin } from "./store/store";
import { useAtomValue } from "jotai";

function App() {
  const isLoginState = useAtomValue(isLogin);
  const navigate = useNavigate();

  /** 로그인 여부 판별 후 리다이렉트 */
  useEffect(() => {
    if (!isLoginState) {
      navigate("/login");
      return;
    } else {
      navigate("/");
      return;
    }
  }, [isLoginState]);

  return (
    <div className="flex justify-center text-center">
      <div className="w-[1172px] flex justify-center flex-col">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
