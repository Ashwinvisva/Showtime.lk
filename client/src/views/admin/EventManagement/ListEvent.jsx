import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import formatDate from "../../../utils/formatDate.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Input from "../../../components/Input.jsx";

const ListEvent = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/events")
      .then((res) => {
        if (search) {
          setEvents(
            res.data.filter(
              (item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.venue.name.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.ticketPrice == search
            )
          );
        } else {
          setEvents(res.data);
        }
      })
      .catch((err) => {
        console.log(`Unable to Retrive Events: ${err}`);
      });
  }, [search]);

  const deleteEvent = (id) => {
    if (confirm(`Are you sure you want to delete ${id}?`)) {
      axios
        .delete(`http://localhost:8081/api/events/${id}`)
        .then((res) => {
          alert(`${id} deleted successfully`);
          window.location.reload();
        })
        .catch((err) => {
          console.log(`Error deleting: ${err}`);
        });
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("report-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [800, 800],
      });
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("event-report.pdf");
    });
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex gap-[20px]">
          <Button
            text="Generate Report"
            className="float-right mb-[20px] w-fit"
            onClick={generatePDF}
          />
          <Button
            text="Add New Event"
            className="float-right mb-[20px] w-fit"
            onClick={() => {
              navigate("add");
            }}
          />
        </div>
        <div>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
        </div>
      </div>
      <div id="report-content" class="table w-full text-sm">
        <div class="table-header-group bg-neutral-800 uppercase font-bold text-white">
          <div class="table-row">
            <div class="table-cell text-left p-[10px]">Event Name</div>
            <div class="table-cell p-[10px] text-center">Date</div>
            <div class="table-cell p-[10px] text-center">Venue</div>
            <div class="table-cell p-[10px] text-center">Description</div>
            <div class="table-cell p-[10px] text-center">Ticket Price</div>
            <div class="table-cell p-[10px] text-center">Genre</div>
            <div class="table-cell p-[10px] text-center">Artists</div>
            <div class="table-cell p-[10px] text-center"></div>
          </div>
        </div>
        <div class="table-row-group">
          {events ? (
            events.map((item, index) => (
              <div
                class={`table-row ${
                  index % 2 == 0 ? "bg-neutral-100" : "bg-neutral-200"
                }`}
              >
                <div class="table-cell p-[10px]">{item.name}</div>
                <div class="table-cell p-[10px] text-center">
                  {formatDate(item.date)}
                </div>
                <div class="table-cell p-[10px] text-center">
                  {item.venue.name}
                </div>
                <div class="table-cell p-[10px] text-center">
                  {item.description}
                </div>
                <div class="table-cell p-[10px] text-center">
                  {item.ticketPrice}
                </div>
                <div class="table-cell p-[10px] text-center">
                  {item.eventGenre}
                </div>
                <div class="table-cell p-[10px] text-center">
                  {item.artists}
                </div>
                <div className="flex gap-[10px] py-[5px] justify-end px-[20px]">
                  <button
                    className="p-[10px] rounded uppercase font-bold text-white bg-green-600 hover:bg-green-700 text-sm"
                    onClick={() => {
                      navigate(`update/${item._id}`);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="p-[10px] rounded uppercase font-bold text-white bg-red-600 hover:bg-red-700 text-sm"
                    onClick={() => {
                      deleteEvent(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ListEvent;
