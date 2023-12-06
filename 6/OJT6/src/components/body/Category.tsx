import CategoryItem from "./CategoryItem";
import { useState } from "react";
import { isLogin } from "../../store/store";
import { useAtomValue } from "jotai";

const Category = () => {
  const [selectedBox, setSelectedBox] = useState("");
  const isLogins = useAtomValue(isLogin);

  const handleBoxClick = (num: string) => {
    setSelectedBox(num);
    console.log(num);
    console.log(isLogins);
  };

  return (
    <div className="flex justify-around w-full">
      <CategoryItem id="1" onClick={() => handleBoxClick("1")} />
      <CategoryItem id="2" onClick={() => handleBoxClick("2")} />
      <CategoryItem id="3-ex" onClick={() => handleBoxClick("3 - ex")} />
      <CategoryItem id="3" onClick={() => handleBoxClick("3")} />
      <CategoryItem id="4" onClick={() => handleBoxClick("4")} />
      <CategoryItem id="5" onClick={() => handleBoxClick("5")} />
    </div>
  );
};
export default Category;
