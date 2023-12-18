import Header from "../components/header/Header";
import Category from "../components/category/Category";
import StatisticsBox from "../components/project/StatisticsBox";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedProjectAtom } from "../store/store";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MyPage = () => {
  const [selectedProject, setSelectedProject] = useAtom(selectedProjectAtom);

  const [isStatisticsOpen, setIsStatisticsOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedProject("");
  }, []);

  const doLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "정말 로그아웃 하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "아니오",
      denyButtonText: "로그아웃 하기",
    }).then((result) => {
      if (result.isDenied) {
        localStorage.clear();
        setSelectedProject("");
        navigate("/login");
        Swal.fire("로그아웃 되었습니다.", "", "success");
      }
    });
  };

  return (
    <>
      <Header />
      <div className="flex items-center">
        <p className="ml-8 text-2xl font-bold">프로젝트</p>
        <IconButton onClick={() => setIsStatisticsOpen(!isStatisticsOpen)}>
          {isStatisticsOpen ? (
            <KeyboardArrowDownIcon style={{ width: "40px", height: "40px" }} />
          ) : (
            <KeyboardArrowUpIcon style={{ width: "40px", height: "40px" }} />
          )}
        </IconButton>
      </div>

      {isStatisticsOpen && (
        <>
          <Category />
        </>
      )}
      {selectedProject && (
        <div>
          <p className="flex mt-8 ml-8 text-2xl font-bold">
            OJT{selectedProject} 기록
          </p>
          <StatisticsBox />
        </div>
      )}
      <div className="flex justify-center mt-56">
        <button
          onClick={doLogout}
          className="bg-red-50 text-red-600 border-red-300 border rounded-lg w-1/5 h-10 hover:bg-red-700 hover:text-white transition duration-300"
        >
          로그아웃
        </button>
      </div>
    </>
  );
};
export default MyPage;
