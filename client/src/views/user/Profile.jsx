import React, { useEffect, useState } from "react";
import Ticket from "../../components/Ticket";
import axios from "axios";
import formatDate from "../../utils/formatDate";
import Button from "../../components/Button";

const Profile = () => {
  const id = JSON.parse(localStorage.getItem("user")).user._id;

  const [tickets, setTickets] = useState();
  const [payments, setPayments] = useState([]);
  const [displayTickets, setDisplayTickets] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/tickets/user/${id}`)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        console.log(`Error retrieving tickets: ${err}`);
      });

    axios
      .get(`http://localhost:8081/api/payments/user/${id}`)
      .then((res) => {
        setPayments(res.data.reverse());
      })
      .catch((err) => {
        console.log(`Error retrieving payments: ${err}`);
      });
  }, []);

  const exportTickets = () => {
    window.print();
  };

  const updateSeat = async (ticketId, eventId) => {
    const row = parseInt(prompt("Enter New Row ID"), 10);
    const column = parseInt(prompt("Enter New Column ID"), 10);

    try {
      const response = await axios.get(
        `http://localhost:8081/api/tickets/event/${eventId}`
      );
      const tickets = response.data;

      const ticketExists = tickets.some(
        (ticket) => ticket.row === row && ticket.column === column
      );

      if (ticketExists) {
        alert("Seat Already Taken");
      } else {
        await axios
          .put(`http://localhost:8081/api/tickets/${ticketId}`, {
            rowNo: row,
            columnNo: column,
          })
          .then(() => {
            alert("Seat updated successfully.");
            window.location.reload();
          })
          .catch(() => {
            alert("Seat update failed.");
          });
      }
    } catch (error) {
      console.error("Failed to update seat:", error.message);
      throw error;
    }
  };

  const deleteSeat = async (ticketId, price) => {
    if (
      confirm(
        "Are you sure you want to cancel the booking?"
      )
    ) {
      await axios
        .delete(`http://localhost:8081/api/tickets/${ticketId}`)
        .then(() => {
          const currentDate = new Date().toISOString().split("T")[0];
          const currentTime = new Date().toLocaleTimeString();

          const paymentData = {
            user: JSON.parse(localStorage.getItem("user")).user._id,
            amount: price,
            date: currentDate,
            time: currentTime,
            type: "refund"
          };

          axios.post("http://localhost:8081/api/payments", paymentData).then((res) => {

          }).catch((err) => {
            console.log(err)
          });
          alert("Booking canceled successfully");
          // window.location.reload();
        })
        .catch(() => {
          alert("Booking cancel failed.");
        });
    }
  };

  const toggleDisplay = () => {
    setDisplayTickets(!displayTickets);
  };

  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <div>
          <Button
            text={displayTickets ? "View Payment History" : "View Tickets"}
            onClick={toggleDisplay}
          />
        </div>
      </div>
      {displayTickets ? (
        <>
          <div className="p-[10px] w-full flex justify-end">
            <Button
              text="Export Tickets"
              onClick={() => {
                exportTickets();
              }}
            />
          </div>
          <div className="p-[20px] flex flex-wrap gap-[20px] justify-center">
            {tickets && tickets.length ? (
              tickets.map((item) => (
                <Ticket
                  value={item._id}
                  eventName={item.event ? item.event.name : ""}
                  venue={
                    item.event && item.event.venue ? item.event.venue.name : ""
                  }
                  date={
                    item.event && item.event.date
                      ? formatDate(item.event.date)
                      : ""
                  }
                  row={item.rowNo}
                  column={item.columnNo}
                  update={() => {
                    updateSeat(item._id, item.event._id);
                  }}
                  delete={() => {
                    deleteSeat(item._id, item.event.ticketPrice);
                  }}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-center font-bold text-2xl py-5">
            Payment History
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr
                  className={`${payment.type ? "bg-green-200" : "bg-red-200"}`}
                  key={payment._id}
                >
                  <td className="px-6 py-4 whitespace-nowrap border-b-2 border-white">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b-2 border-white">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b-2 border-white">
                    {payment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b-2 border-white">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b-2 border-white capitalize">
                    {payment.type ? payment.type : "Ticket Purchase"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Profile;
