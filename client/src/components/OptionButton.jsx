import React from "react";

const OptionButton = (props) => {
  return (
    <label className={`border-2 rounded px-[20px] py-[10px] has-[:checked]:bg-indigo-50 flex justify-between cursor-pointer ${props.className}`}>
      <div>{props.text}</div>
      <input
        type="radio"
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
  );
};

export default OptionButton;
