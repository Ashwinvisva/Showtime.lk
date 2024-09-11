import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideNavElement = (props) => {
  const location = useLocation().pathname;
  
  return (
    <Link to={props.link}>
      <div
        className={`flex justify-between py-[10px] hover:bg-neutral-700 px-[20px] duration-200 rounded ${
          location == props.link ? "bg-neutral-600" : ""
        }`}
      >
        <div className="">{props.title}</div>
        <div>{props.icon}</div>
      </div>
    </Link>
  );
};

export default SideNavElement;
