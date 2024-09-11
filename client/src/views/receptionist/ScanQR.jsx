import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";

const ScanQR = () => {
  const [status, setStatus] = useState();
  const [ticketDetails, setTicketDetails] = useState(null);

  const handleScan = (text, result) => {
    axios
      .get(`http://localhost:8081/api/tickets/${text}`)
      .then((res) => {
        if (res.data.isValidated === false) {
          axios
            .put(`http://localhost:8081/api/tickets/${text}`, {
              isValidated: true,
            })
            .then((res) => {});

          setStatus("Valid Ticket");
          setTicketDetails(res.data); // Assuming res.data contains ticket details
        } else {
          setStatus("Already Scanned Ticket");
          setTicketDetails(null);
        }
      })
      .catch((err) => {
        setStatus("Invalid Ticket");
        setTicketDetails(null);
      });
  };

  return (
    <div className="flex justify-between h-screen">
      <div className="h-screen w-1/2 flex justify-center items-center">
        <div className="w-[500px]">
          <Scanner onResult={(text, result) => handleScan(text, result)} options={{ delayBetweenScanAttempts: 2000, delayBetweenScanSuccess: 2000 }} />
        </div>
      </div>
      <div className="h-screen w-1/2 flex justify-center items-center">
        <div className="w-[500px] text-lg text-center">
          {ticketDetails && (
            <div>
              <h2>Ticket Details</h2>
              <p>Event Name: {ticketDetails.eventName}</p>
              <p>Venue: {ticketDetails.venue}</p>
              <p>Date: {ticketDetails.date}</p>
              <p>Seat Number: {ticketDetails.seatNumber}</p>
              {/* Add more ticket details as needed */}
            </div>
          )}
          {status && (
            <div className={status === "Valid Ticket" ? "text-green-600 font-bold text-2xl" : "text-red-600 font-bold text-2xl"}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
