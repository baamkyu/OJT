import Header from "../components/header/Header";
import ContentBox from "../components/project/ContentBox";
import Category from "../components/category/Category";

const MainPage = () => {
  return (
    <>
      <Header />
      <Category />
      <div className="flex justify-center h-[800px] w-full mt-4 bg-blue-100 rounded-2xl">
        <ContentBox />
      </div>
    </>
  );
};

export default MainPage;
