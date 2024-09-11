import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from "../assets/icons/LogoutIcon";

const OrganizerLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")).user.type == "user") {
      return;
    } else if (JSON.parse(localStorage.getItem("user")).user.type == "admin") {
      navigate("/admin");
    } else if (JSON.parse(localStorage.getItem("user")).user.type == "receptionist") {
      navigate("/reception");
    } else if (
      JSON.parse(localStorage.getItem("user")).user.type == "organizer"
    ) {
      return;
    } else {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className="h-[64px] w-full bg-neutral-800 text-white flex justify-between items-center px-[20px] sticky top-0 z-50">
        <div className="uppercase font-bold text-2xl">Showtime.lk</div>
        <div className="flex items-center">
          <button
            className="p-[10px] rounded-full bg-neutral-800 hover:bg-neutral-700 duration-300"
            onClick={() => {
              logout();
            }}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
      <div className="p-[20px]">
      <Outlet />
      </div>
    </>
  );
};

export default OrganizerLayout;
