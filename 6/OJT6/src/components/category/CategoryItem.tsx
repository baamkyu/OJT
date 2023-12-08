import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";

import PjtExplainModal from "../modal/PjtExplainModal";

import { useState } from "react";

const CategoryItem = ({ id, onClick }) => {
  const [pjtTitle, setPjtTitle] = useState("");
  const [pjtDetail, setPjtDetail] = useState("");
  const [pjtUseTool, setPjtUseTool] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const explainProject = () => {
    switch (id) {
      case "1":
        setPjtTitle("덧셈 뺄셈 문제");
        setPjtUseTool("SVG");
        setPjtDetail("자바스크립트를 사용하여 동적인 콘텐츠 제작");
        setModalOpen(true);
        break;
      case "2":
        setPjtTitle("원 따라 그리기");
        setPjtUseTool("SVG Animation");
        setPjtDetail("패스 애니메이션 제작");
        setModalOpen(true);
        break;
      case "3-ex":
        setPjtTitle("벽돌깨기 게임");
        setPjtUseTool("CANVAS");
        setPjtDetail("캔버스로 벽돌깨기 게임 제작");
        setModalOpen(true);
        break;
      case "3":
        setPjtTitle("전투기 게임");
        setPjtUseTool("CANVAS");
        setPjtDetail("캔버스로 전투기 게임 제작");
        setModalOpen(true);
        break;
      case "4":
        setPjtTitle("레이스");
        setPjtUseTool("Phaser");
        setPjtDetail("Phaser 라이브러리 활용한 게임 개발");
        setModalOpen(true);
        break;
      case "5":
        setPjtTitle("저작도구");
        setPjtUseTool("저작도구 및 렌더링 엔진 개발");
        setPjtDetail("fabricjs를 이용한 저작도구 및 렌더링 엔진 개발");
        setModalOpen(true);
        break;
    }
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-40 h-32 bg-gray-100 rounded-lg flex justify-center items-center cursor-pointer shadow-md relative">
        <img
          src={`/assets/ojt${id}.png`}
          alt={`ojt${id}`}
          className="p-4 h-full"
          onClick={onClick}
        />
        <IconButton
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={explainProject}
        >
          <HelpIcon />
        </IconButton>
      </div>
      {modalOpen && (
        <>
          <div
            className="z-10 h-full w-full absolute top-0 bg-black opacity-60"
            onClick={onClose}
          ></div>
          <PjtExplainModal
            title={pjtTitle}
            usetool={pjtUseTool}
            detail={pjtDetail}
            onClose={onClose}
          />
        </>
      )}
    </>
  );
};
export default CategoryItem;
