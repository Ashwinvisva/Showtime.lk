import React from "react";

const Input = (props) => {
  return (
    <div className="rounded border-2 w-[300px] h-[50px] flex px-[10px] items-center focus-within:border-neutral-800">
      <input
        type={props.type ? props.type : "text"}
        value={props.value ? props.value : ""}
        onChange={props.onChange ? props.onChange : ""}
        disabled={props.disabled ? props.disabled : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        className="h-full w-full pr-[10px] outline-0"
        autocomplete="off"
      />
      {props.icon ? props.icon : <></>}
    </div>
  );
};

export default Input;
