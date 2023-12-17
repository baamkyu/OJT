import IconButton from "@mui/material/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useSetAtom } from "jotai";
import { selectedProjectAtom } from "../../store/store";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const isLogin = localStorage.getItem("token");
  const setSelectedProject = useSetAtom(selectedProjectAtom);

  const navigate = useNavigate();
  const location = useLocation();
  const isMyPage = location.pathname === "/mypage";

  const moveToMainPage = () => {
    navigate("/");
    setSelectedProject("");
  };
  const moveToMyPage = () => {
    navigate("/mypage");
    setSelectedProject("");
  };

  return (
    <div className="mt-6 mb-16 px-4 flex justify-between">
      {isMyPage ? (
        <div onClick={moveToMainPage} className="cursor-pointer">
          <IconButton>
            <ArrowBackIcon style={{ width: "40px", height: "40px" }} />
          </IconButton>
        </div>
      ) : (
        <div className="w-14 h-14"></div>
      )}
      <div onClick={moveToMainPage} className="cursor-pointer">
        <Logo />
      </div>
      {isLogin ? (
        <div
          className="flex items-center cursor-pointer"
          onClick={moveToMyPage}
        >
          <IconButton>
            <AccountBoxIcon style={{ width: "40px", height: "40px" }} />
          </IconButton>
          <span className="text-xl underline cursor-pointer">마이페이지</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Header;
