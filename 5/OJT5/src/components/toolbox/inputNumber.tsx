// import { useState, useEffect } from "react";

// const InputNumber = () => {
//   const [value, setValue] = useState<number>(0);

//   useEffect(() => {
//     numberCheck(value);
//     console.log(value);
//   }, [value]);

//   const onChange = (e) => {
//     numberCheck(e.target.value);
//   };

//   const numberCheck = (value: any) => {
//     let num = value || 0;
//     if (!isFinite(num)) return;
//     num = num.toString();

//     if (num !== "0" && !num.includes(".")) {
//       num = num.replace(/^0+/, "");
//     }

//     setValue(num);
//   };
//   return (
//     <input
//       type="number"
//       value={value}
//       onChange={onChange}
//       className="w-12 h-10 text-xl"
//     ></input>
//   );
// };
// export default InputNumber;
