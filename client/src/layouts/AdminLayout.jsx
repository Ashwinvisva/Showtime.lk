import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SideNavElement from "../components/SideNavElement";
import UserIcon from "../assets/icons/UserIcon";
import EventIcon from "../assets/icons/EventIcon";
import VenueIcon from "../assets/icons/VenueIcon";
import SeatIcon from "../assets/icons/SeatIcon";
import ReviewIcon from "../assets/icons/ReviewIcon";
import DashboardIcon from "../assets/icons/DashboardIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";
import FeedbackIcon from "../assets/icons/FeedbackIcon";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")).user.type == "user") {
      navigate("/");
    } else if (JSON.parse(localStorage.getItem("user")).user.type == "admin") {
      return;
    } else if (
      JSON.parse(localStorage.getItem("user")).user.type == "receptionist"
    ) {
      navigate("/reception");
    } else if (
      JSON.parse(localStorage.getItem("user")).user.type == "organizer"
    ) {
      navigate("/organize");
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
      <div className="flex h-screen">
        <div className="w-[300px] h-full bg-gradient-to-b from-neutral-800 to-neutral-700 text-white flex flex-col gap-[5px] px-[10px] z-50">
          <div className="text-center font-bold uppercase text-lg py-[20px] text-2xl flex items-center justify-center gap-[20px]">
            Showtime.lk{" "}
            <button
              className="p-[10px] rounded-full bg-neutral-800 hover:bg-neutral-700 duration-300"
              onClick={() => {
                logout();
              }}
            >
              <LogoutIcon />
            </button>
          </div>
          <SideNavElement
            title="Dashboard"
            link="/admin"
            icon={<DashboardIcon />}
          />
          <SideNavElement
            title="User Management"
            link="/admin/users"
            icon={<UserIcon />}
          />
          <SideNavElement
            title="Event Management"
            link="/admin/events"
            icon={<EventIcon />}
          />
          <SideNavElement
            title="Venue Management"
            link="/admin/venues"
            icon={<VenueIcon />}
          />
          <SideNavElement
            title="Review Management"
            link="/admin/reviews"
            icon={<ReviewIcon />}
          />
          <SideNavElement
            title="Feedback"
            link="/admin/feedback"
            icon={<FeedbackIcon />}
          />
        </div>
        <div className="overflow-y-scroll w-full px-[24px] pt-[24px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
