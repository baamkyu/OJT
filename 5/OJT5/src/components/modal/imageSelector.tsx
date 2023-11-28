import { useState } from "react";

const ImageSelector = ({ images, addImage, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddImage = () => {
    if (selectedImage) {
      addImage(selectedImage);
      onClose();
    }
  };
  return (
    <>
      <div
        className="absolute w-[1200px] h-[675px] z-10 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <div className="absolute left-40 top-20 bg-white flex flex-col w-[800px] z-20 shadow-xl p-4">
        <div className="flex justify-between items-center justify-center">
          <span className="text-2xl ">Image List</span>
          <button
            onClick={onClose}
            className="text-2xl w-14 h-12 hover:bg-gray-200 rounded-lg"
          >
            X
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          {images.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              onClick={() => handleImageClick(image)}
              className={`w-24 h-24 cursor-pointer mx-8 ${
                selectedImage === image ? "border-4 border-red-500" : ""
              } hover:shadow-xl`}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddImage}
            className="text-xl text-blue-600 w-14 h-14 transition duration-300 ease-in-out hover:bg-blue-100 hover:font-bold rounded-lg"
          >
            추가
          </button>
        </div>
      </div>
    </>
  );
};
export default ImageSelector;
