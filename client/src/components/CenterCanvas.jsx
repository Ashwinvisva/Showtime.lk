import React from "react";

const CenterCanvas = (props) => {
  return (
    <div className="h-full w-full flex justify-center items-center relative">
      {props.children}
    </div>
  );
};

export default CenterCanvas;
