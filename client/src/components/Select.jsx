import React from "react";

const Select = (props) => {
  return (
    <div className="rounded border-2 w-[300px] h-[50px] flex px-[10px] items-center focus-within:border-neutral-800">
      <select
        value={props.value ? props.value : ""}
        onChange={props.onChange ? props.onChange : ""}
        disabled={props.disabled ? props.disabled : ""}
        className="h-full w-full pr-[10px] outline-0"
      >
        { props.children }
      </select>
      {props.icon ? props.icon : <></>}
    </div>
  );
};

export default Select;
