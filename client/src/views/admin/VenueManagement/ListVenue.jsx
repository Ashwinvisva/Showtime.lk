import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Input from "../../../components/Input";

const ListVenue = () => {
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/venues")
      .then((res) => {
        if (search) {
          setVenues(
            res.data.filter(
              (item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.maxRow == search ||
                item.maxColumn == search
            )
          );
        } else {
          setVenues(res.data);
        }
      })
      .catch((err) => {
        console.log(`Unable to Retrive Venues: ${err}`);
      });
  }, [search]);

  const deleteVenue = (id) => {
    if (confirm(`Are you sure you want to delete ${id}?`)) {
      axios
        .delete(`http://localhost:8081/api/venues/${id}`)
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
      pdf.save("venue-report.pdf");
    });
  };

  return (
    <>
      <div className="flex justify-between gap-[20px] w-full">
        <div className="flex gap-[20px]">
          <Button
            text="Generate Report"
            className="float-right mb-[20px] w-fit"
            onClick={generatePDF}
          />
          <Button
            text="Add New Venue"
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
            <div class="table-cell text-left p-[10px]">Venue Name</div>
            <div class="table-cell text-left p-[10px]">Address</div>
            <div class="table-cell p-[10px] text-center">Number of Columns</div>
            <div class="table-cell p-[10px] text-center">Number of Rows</div>
            <div class="table-cell p-[10px] text-center"></div>
          </div>
        </div>
        <div class="table-row-group">
          {venues ? (
            venues.map((item, index) => (
              <div
                class={`table-row ${
                  index % 2 == 0 ? "bg-neutral-100" : "bg-neutral-200"
                }`}
              >
                <div class="table-cell p-[10px]">{item.name}</div>
                <div class="table-cell p-[10px]">{item.address}</div>
                <div class="table-cell p-[10px] text-center">
                  {item.maxColumn}
                </div>
                <div class="table-cell p-[10px] text-center">{item.maxRow}</div>
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
                      deleteVenue(item._id);
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

export default ListVenue;