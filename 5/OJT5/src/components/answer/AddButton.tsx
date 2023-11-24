const AddButton = () => {
  return (
    <button
      className="w-10 h-10 bg-red-700 text-white"
      onClick={() => {
        console.log("click");
      }}
    >
      +
    </button>
  );
};
export default AddButton;
