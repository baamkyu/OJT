import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const PjtExplainModal = ({ title, usetool, detail, onClose }) => {
  return (
    <div className="z-20 p-4 bg-white rounded shadow-md absolute left-center top-1/3 w-[408px] text-xl">
      <div className="items-center flex justify-between border-b pb-2 mb-2 text-xl">
        <div className="w-10 h-10"></div>
        <div className="text-2xl font-bold">{title}</div>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="mb-8">
        <div className="text-xl font-bold mb-2 flex">교육 내용</div>
        <div className="text-gray-700 flex">{usetool}</div>
      </div>
      <div>
        <div className="text-xl font-bold mb-2 flex">과제</div>
        <div className="text-gray-700 flex">{detail}</div>
      </div>
    </div>
  );
};
export default PjtExplainModal;
