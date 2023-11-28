import { activeObjectAtom, canvasAtom } from "../../store/store";
import { useAtomValue } from "jotai";
import { fabric } from "fabric";

const AddButton = () => {
  const activeObject = useAtomValue(activeObjectAtom);
  const canvas = useAtomValue(canvasAtom);

  // const addImageToCanvas = () => {
  //   if (activeObject instanceof fabric.Image) {
  //     activeObject.clone((clonedImage) => {
  //       canvas?.add(clonedImage);
  //     });
  //   }
  // };

  const toDataURL2 = () => {
    console.log(activeObject);
    if (activeObject instanceof fabric.Object) {
      const imageDataURL = activeObject.toDataURL({});
      fabric.Image.fromURL(imageDataURL, (img) => {
        canvas?.add(img);
      });
    }
  };
  return (
    <>
      {/* <button onClick={addImageToCanvas}>Add Image</button> */}
      {/* <button onClick={toDataURL2}>Get Data URL</button> */}
      <button
        className="w-10 h-10 bg-red-700 text-white"
        onClick={() => {
          console.log("click");
        }}
      >
        +
      </button>
    </>
  );
};
export default AddButton;
