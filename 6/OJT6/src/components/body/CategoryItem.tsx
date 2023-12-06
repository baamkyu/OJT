import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";

import { useState } from "react";

const CategoryItem = ({ id, onClick }) => {
  const [pjtTitle, setPjtTitle] = useState("");
  const [pjtDetail, setPjtDetail] = useState("");
  const [pjtUseTool, setPjtUseTool] = useState("");

  const explainProject = () => {
    switch (id) {
      case "1":
        setPjtTitle("pjt1");
        setPjtDetail("pjt1 내용");
        setPjtUseTool("pjt1 사용도구");
        break;
      case "2":
        setPjtTitle("pjt1");
        setPjtDetail("pjt1 내용");
        setPjtUseTool("pjt1 사용도구");
        break;
      case "3-ex":
        setPjtTitle("pjt1");
        setPjtDetail("pjt1 내용");
        setPjtUseTool("pjt1 사용도구");
        break;
      case "3":
        setPjtTitle("pjt1");
        setPjtDetail("pjt1 내용");
        setPjtUseTool("pjt1 사용도구");
        break;
      case "4":
        setPjtTitle("pjt1");
        setPjtDetail("pjt1 내용");
        setPjtUseTool("pjt1 사용도구");
        break;
      case "5":
        setPjtTitle("pjt1");
        setPjtDetail("pjt1 내용");
        setPjtUseTool("pjt1 사용도구");
        break;
    }
  };

  return (
    <div
      className="w-40 h-28 bg-gray-100 rounded-lg flex justify-center items-center"
      onClick={onClick}
    >
      <div className="flex relative justify-center items-center shadow-md w-full">
        <img src={`/assets/ojt${id}.png`} alt={`ojt${id}`} className="h-28" />
        <IconButton
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={explainProject}
        >
          <HelpIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default CategoryItem;
