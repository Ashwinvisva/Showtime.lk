import React from "react";
import CenterCanvas from "../../components/CenterCanvas";
import HomeImg from "../../assets/home-bg.jpg";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[calc(100vh-64px)] w-full">
        <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
          <div className="absolute z-10 flex flex-col justify-center items-center">
            <div className="uppercase font-bold text-6xl text-white">
              Showtime.lk
            </div>
            <Link to="/events">
              <button className="text-white rounded-full border-4 border-white w-fit px-[20px] py-[10px] uppercase font-bold text-xl mt-[20px] hover:bg-white hover:text-black duration-200">
                Explore Now
              </button>
            </Link>
          </div>
          <img className="object-cover w-full h-full" src={HomeImg} />
          <div className="h-full w-full absolute overflow-hidden bg-black bg-opacity-[0.6]"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
