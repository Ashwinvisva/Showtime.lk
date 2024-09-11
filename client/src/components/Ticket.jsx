import React from "react";
import QRCode from "react-qr-code";

const Ticket = (props) => {
  return (
    <div className="flex max-w-[240px] flex-col w-fit p-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)]">
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "200px", width: "200px" }}
        value={props.value}
        viewBox={`0 0 256 256`}
      />
      <div className="font-bold mt-[20px]">{props.eventName}</div>
      <div className="italic">{props.venue}</div>
      <div>{props.date}</div>
      <div className="flex justify-between">
        <div className="px-[10px] rounded-full bg-blue-600 text-white w-fit mt-[20px]">
          {`R${props.row}C${props.column}`}
        </div>
        <div className="flex gap-[5px]">
          <button
            className="px-[10px] rounded-full bg-green-600 mt-[20px] text-white"
            onClick={props.update}
          >
            Update
          </button>
          <button
            className="px-[7px] flex font-bold items-center justify-center rounded-full bg-red-600 mt-[20px] text-white"
            onClick={props.delete}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
