import React from "react";
import ReactStars from "react-rating-stars-component";

const Card = (props) => {
  return (
    <div className="w-[300px] h-[400px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] flex flex-col hover:scale-105 duration-200">
      <div className="w-full h-[200px] bg-neutral-200 overflow-hidden">
        <img src={props.image} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col p-[10px] h-full relative">
        <div className="font-bold flex justify-between items-center">
          <div>{props.name}</div>
          <div className="px-2 text-white rounded-full bg-cyan-600 font-normal capitalize text-sm">{props.genre}</div>
        </div>
        <div className="flex justify-between">
          <div className="italic">{props.venue}</div>
          <div>{props.date}</div>
        </div>
        <div className="font-bold">
          Artists: <span className="font-medium italic">{props.artists}</span>
        </div>
        <div className="mt-[20px] text-sm">{props.description}</div>
        <div className="flex flex-col absolute left-0 bottom-[10px] w-full px-[10px]">
          <div className="flex justify-between">
            <div className="font-bold">{`${props.ticketPrice} LKR`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
