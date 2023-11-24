const StrokeWidth = ({ onSelectWidth }) => {
  const strokeWidthList = [1, 2, 3, 4, 8, 12, 16, 24];

  const handleSelect = (width: number) => {
    const index = strokeWidthList.indexOf(width);
    onSelectWidth(strokeWidthList[index]);
  };

  return (
    <div className="w-48 h-24 flex flex-wrap">
      <ul className="shadow-lg">
        {strokeWidthList.map((width) => (
          <li
            key={width}
            className={
              "bg-white h-8 w-12 text-center border-2 rounded-sm items-center"
            }
            onClick={() => handleSelect(width)}
          >
            <button>{width}px</button>
          </li>
        ))}
      </ul>
    </div>
  );

  // return (
  //   <div>
  //     <p>Select Line Weight:</p>
  //     <ul>
  //       {strokeWidthList.map((width) => (
  //         <li key={width} onClick={() => handleSelect(width)}>
  //           {width}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};
export default StrokeWidth;
