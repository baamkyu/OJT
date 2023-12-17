import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TryGoogleLogin from "./GoogleLogin";

const Login = () => {
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const navigate = useNavigate();

  /** msw를 활용하여 로그인을 시도하는 함수 */
  const tryLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputId: inputId,
          inputPw: inputPw,
        }),
      });
      const result = await response.json();
      /** 로그인 결과에 따른 로직 */
      result.login &&
        (localStorage.setItem("token", result.token),
        localStorage.setItem("userName", result.userName));
      navigate("/");
    } catch (error) {
      console.error("Login API Error", error);
    }
  };

  return (
    <div className="w-[640px] h-[696px] bg-white px-32 py-20">
      <h1 className="text-5xl mb-20">L O G I N</h1>
      <form className="flex flex-col text-left text-lg">
        <p>아이디</p>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          onChange={(e) => setInputId(e.target.value)}
          className="mb-10 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></input>
        <p>비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setInputPw(e.target.value)}
          className="mb-10 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></input>
      </form>
      <button
        onClick={tryLogin}
        className="bg-black text-white text-lg w-full h-11 rounded-lg"
      >
        로그인
      </button>
      <div className="flex items-center text-gray-400 text-md px-4 mt-5 mb-1.5">
        <div className="flex-grow bg-gray-400 h-px"></div>
        <div className="mx-4">또는</div>
        <div className="flex-grow bg-gray-400 h-px"></div>
      </div>
      <TryGoogleLogin />
    </div>
  );
};
export default Login;
