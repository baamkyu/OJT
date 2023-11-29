const Opacity = ({ onSelectOpacity }) => {
  const opacityList = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  const handleSelect = (opacity: number) => {
    const index = opacityList.indexOf(opacity);
    console.log(opacityList[index]);
    onSelectOpacity(opacityList[index]);
  };

  return (
    <div className="w-48 h-24 flex flex-wrap">
      <ul className="shadow-lg">
        {opacityList.map((opacity) => (
          <li
            key={opacity}
            className={
              "bg-white h-8 w-12 text-center border-2 rounded-sm items-center"
            }
            onClick={() => handleSelect(opacity)}
          >
            <button>{opacity * 100}%</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Opacity;
