import React from "react";

const FormBox = (props) => {
  return (
    <div className={`rounded shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] flex flex-col p-[20px] gap-[5px] bg-white ${props.className ? props.className : ""}`}>
      {props.title ? (
        <div className="w-full text-center font-semibold text-lg pb-[10px]">
          {props.title ? props.title : ""}
        </div>
      ) : (
        <></>
      )}
      {props.children}
    </div>
  );
};

export default FormBox;
