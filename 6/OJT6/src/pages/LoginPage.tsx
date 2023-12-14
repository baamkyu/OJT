import Header from "../components/header/Header";
import LoginBox from "../components/login/LoginBox";

const LoginPage = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-[800px]  bg-blue-100 rounded-2xl">
        <LoginBox />
      </div>
    </>
  );
};

export default LoginPage;
