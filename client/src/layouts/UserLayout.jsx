import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserIcon from "../assets/icons/UserIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";

const UserLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.user) {
        const userType = user.user.type;
        switch (userType) {
            case "user":
                // Do nothing
                break;
            case "admin":
                navigate("/admin");
                break;
            case "receptionist":
                navigate("/reception");
                break;
            case "organizer":
                navigate("/organize");
                break;
            default:
                // Handle invalid user type
                navigate("/login");
        }
    } else {
        // Handle missing user or user type
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
        <div className="flex gap-[20px]">
          <Link className="hover:text-blue-600 duration-200" to="/">
            Home
          </Link>
          <Link className="hover:text-blue-600 duration-200" to="/events">
            Events
          </Link>
          <Link className="hover:text-blue-600 duration-200" to="/contact-us">
            Feedback
          </Link>
        </div>
        <div className="flex items-center">
          <button
            className="p-[10px] rounded-full bg-neutral-800 hover:bg-neutral-700 duration-300"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <UserIcon />
          </button>
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
      <Outlet />
    </>
  );
};

export default UserLayout;
