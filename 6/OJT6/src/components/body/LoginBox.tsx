import { useState } from "react";
import Swal from "sweetalert2";

import TryGoogleLogin from "../GoogleLogin";

const Login = () => {
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");

  const tryLogin = () => {
    console.log("inputId", inputId);
    console.log("inputPw", inputPw);
    Swal.fire("로그인 시도");
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
