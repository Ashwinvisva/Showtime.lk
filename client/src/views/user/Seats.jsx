import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaymentForm from "../../components/PaymentForm";

const Seats = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [maxColumn, setMaxColumn] = useState(0);
  const [maxRow, setMaxRow] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [bookedSeats, setBookedSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/events/${id}`)
      .then((res) => {
        setPrice(res.data.ticketPrice);
        axios
          .get(`http://localhost:8081/api/venues/${res.data.venue._id}`)
          .then((res) => {
            setMaxColumn(res.data.maxColumn);
            setMaxRow(res.data.maxRow);
          })
          .catch((err) => {
            console.log(`Error getting venue: ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Error getting event: ${err}`);
      });

    axios
      .get(`http://localhost:8081/api/tickets/event/${id}`)
      .then((res) => {
        setBookedSeats(res.data);
      })
      .catch((err) => {
        console.log(`Error getting tickets: ${err}`);
      });
  }, [id]);

  const selectSeat = (x, y) => {
    const seatKey = `${x},${y}`;
    if (selectedSeats.has(seatKey)) {
      selectedSeats.delete(seatKey);
    } else {
      selectedSeats.add(seatKey);
    }
    setSelectedSeats(new Set(selectedSeats));
  };

  const isSelected = (x, y) => {
    return selectedSeats.has(`${x},${y}`);
  };

  const isBooked = (x, y) => {
    return bookedSeats.some((seat) => seat.rowNo === x && seat.columnNo === y);
  };

  const displaySelectedSeats = () => {
    return Array.from(selectedSeats).map((seatKey, index, array) => {
      const [row, col] = seatKey.split(",");

      return (
        <span key={index}>
          <div className="bg-green-600 rounded-full px-[10px] text-white">
            R{parseInt(row) + 1}C{parseInt(col) + 1}
          </div>
          {index < array.length - 1 && <span> </span>}
        </span>
      );
    });
  };

  const resetSelectedSeats = () => {
    setSelectedSeats(new Set());
  };

  const purchaseSeats = () => {
    Array.from(selectedSeats).map((item, index) => {
      const parts = item.split(",");
      const rowNo = parseInt(parts[0], 10) + 1;
      const columnNo = parseInt(parts[1], 10) + 1;

      const ticket = {
        event: id,
        user: JSON.parse(localStorage.getItem("user")).user._id,
        columnNo: columnNo,
        rowNo: rowNo,
      };

      axios
        .post(`http://localhost:8081/api/tickets`, ticket)
        .then((res) => {
          console.log("Ticket created:", res.data);
        })
        .catch((err) => {
          console.error("Error creating ticket:", err);
        });

      console.log(item);
    });

    try {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();
    const paymentData = {
      user: JSON.parse(localStorage.getItem("user")).user._id,
      amount: price * selectedSeats.size,
      date: currentDate,
      time: currentTime
    };
    
    const response = axios.post('http://localhost:8081/api/payments', paymentData);
    console.log('Payment created:', response.data);
    navigate("/profile");
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="flex flex-col gap-[5px] w-full p-[20px]">
        {Array.from({ length: maxRow }, (_, rowIndex) => (
          <div className="flex gap-[5px]" key={rowIndex}>
            {Array.from({ length: maxColumn }, (_, colIndex) => (
              <button
                className={`w-[50px] rounded text-white ${
                  isSelected(rowIndex, colIndex)
                    ? "bg-green-800"
                    : isBooked(rowIndex + 1, colIndex + 1)
                    ? "bg-red-600"
                    : "bg-green-500"
                }`}
                key={colIndex}
                onClick={() => selectSeat(rowIndex, colIndex)}
                disabled={isBooked(rowIndex + 1, colIndex + 1)}
              >
                {rowIndex + 1}, {colIndex + 1}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="w-[300px] flex flex-cols fixed top-[64px] right-0 py-[20px]">
        <div className="flex flex-wrap gap-[5px] absolute top-[20px] px-[20px]">
          {displaySelectedSeats()}
          {selectedSeats && selectedSeats.size ? (
            <>
              <button
                className="px-[10px] bg-red-600 text-white uppercase font-semibold hover:bg-red-700 rounded-full h-fit"
                onClick={() => {
                  resetSelectedSeats();
                }}
              >
                Reset All
              </button>
              <div className="flex justify-between w-full pt-[20px]">
                <div className="font-bold text-xl">
                  {`${price * selectedSeats.size} LKR`}
                </div>
                <button
                  className="py-[5px] px-[10px] bg-black text-white uppercase font-semibold hover:bg-neutral-800 rounded h-fit"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Purchase
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {open ? (
        <PaymentForm
          purchase={purchaseSeats}
          handleClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Seats;
