import Header from "../components/header/Header";
import LoginBox from "../components/login/LoginBox";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[800px]  bg-blue-100 rounded-2xl">
        <LoginBox />
      </div>
      <Link to="/" className="button">
        이동하기
      </Link>
    </>
  );
};

export default LoginPage;
