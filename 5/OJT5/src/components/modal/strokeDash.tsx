const StrokeDash = ({ onSelectDash }) => {
  const strokeDashList = [
    [3, 3],
    [6, 6],
    [10, 10],
    [15, 15],
    [7, 5, 3, 5],
  ];

  const handleSelect = (dash: Array<number>) => {
    const index = strokeDashList.indexOf(dash);
    onSelectDash(strokeDashList[index]);
  };

  return (
    <div className="w-48 h-24 flex flex-wrap">
      <ul className="shadow-lg">
        {strokeDashList.map((dash, idx) => (
          <li
            key={idx}
            className={
              "bg-white h-8 w-28 text-center border-2 rounded-sm items-center"
            }
            onClick={() => handleSelect(dash)}
          >
            <svg height="20" width="100">
              <line
                x1="10"
                y1="10"
                x2="100"
                y2="10"
                style={{
                  stroke: "black",
                  strokeWidth: 2,
                  strokeDasharray: dash.join(","),
                }}
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StrokeDash;
