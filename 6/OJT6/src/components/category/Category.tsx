import CategoryItem from "./CategoryItem";
import { selectedProjectAtom } from "../../store/store";
import { useSetAtom } from "jotai";

const Category = () => {
  const setSelectedProject = useSetAtom(selectedProjectAtom);

  const handleBoxClick = (pjt: string) => {
    setSelectedProject(pjt);
  };

  return (
    <div className="flex justify-around w-full">
      <CategoryItem id="1" onClick={() => handleBoxClick("1")} />
      <CategoryItem id="2" onClick={() => handleBoxClick("2")} />
      <CategoryItem id="3" onClick={() => handleBoxClick("3")} />
      <CategoryItem id="4-ex" onClick={() => handleBoxClick("4-ex")} />
      <CategoryItem id="4" onClick={() => handleBoxClick("4")} />
      <CategoryItem id="5" onClick={() => handleBoxClick("5")} />
    </div>
  );
};
export default Category;
