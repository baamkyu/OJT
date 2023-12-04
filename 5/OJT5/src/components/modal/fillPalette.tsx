const colors = [
  "transparent",
  "#000000",
  "#808080",
  "#0000ff",
  "#ffffff",
  "#ff0000",
  "#ffc0cb",
  "#ffa500",
  "#ffff00",
  "#008000",
  "#4b0082",
  "#800080",
];
const colorSelectBox = [
  "transparent",
  "bg-black",
  "bg-gray-500",
  "bg-blue-300",
  "bg-white",
  "bg-red-500",
  "bg-pink-300",
  "bg-orange-300",
  "bg-yellow-300",
  "bg-green-300",
  "bg-indigo-300",
  "bg-purple-300",
];
const FillPalette = ({ onSelect }: { onSelect: (color: string) => void }) => {
  const handleColor = (color: string) => {
    const selectedColor = getColorCode(color);
    onSelect(selectedColor); // 선택한 색상을 부모 컴포넌트로 전달
  };

  const getColorCode = (color: string) => {
    const index = colorSelectBox.indexOf(color);
    return colors[index];
  };

  return (
    <div className="w-48 h-24 flex flex-wrap">
      {colorSelectBox.map((color, index) => (
        <div
          key={index}
          className={`w-8 h-6 m-1 ${color}`}
          style={{ border: "1px solid #000" }}
          onClick={() => handleColor(color)}
        ></div>
      ))}
    </div>
  );
};
export default FillPalette;
