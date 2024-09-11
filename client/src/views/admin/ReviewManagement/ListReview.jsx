import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Input from "../../../components/Input";

const ListReview = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/reviews")
      .then((res) => {
        if (search) {
          setReviews(
            res.data.filter(
              (item) =>
                item.rating == search ||
                item.user.email.toLowerCase().includes(search.toLowerCase()) ||
                item.event.name.toLowerCase().includes(search.toLowerCase())
            )
          );
        } else {
          setReviews(res.data);
        }
      })
      .catch((err) => {
        console.log(`Unable to Retrieve Reviews: ${err}`);
      });
  }, [search]);

  // const deleteReview = (id) => {
  //   if (window.confirm(`Are you sure you want to delete ${id}?`)) {
  //     axios
  //       .delete(`http://localhost:8081/api/reviews/${id}`)
  //       .then((res) => {
  //         alert(`${id} deleted successfully`);
  //         window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log(`Error deleting: ${err}`);
  //       });
  //   }
  // };

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
      pdf.save("review-report.pdf");
    });
  };

  const addReply = (id) => {
    const reply = prompt("Add Reply");

    axios
      .put(`http://localhost:8081/api/reviews/${id}`, { reply: reply })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(`Unable to Retrieve Reviews: ${err}`);
      });
  };

  return (
    <>
      <div className="flex gap-[20px] w-full justify-between">
        <Button
          text="Generate Report"
          className="float-right mb-[20px] w-fit"
          onClick={generatePDF}
        />
        <div className="flex">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
        </div>
      </div>
      <div id="report-content" className="table w-full text-sm">
        <div className="table-header-group bg-neutral-800 uppercase font-bold text-white">
          <div className="table-row">
            <div className="table-cell text-left p-[10px]">Event Name</div>
            <div className="table-cell p-[10px] text-center">
              Reviewer Email
            </div>
            <div className="table-cell p-[10px] text-center">Rating</div>
            <div className="table-cell p-[10px] text-center">Comment</div>
            <div className="table-cell p-[10px] text-center">Reply</div>
            <div className="table-cell p-[10px] text-center"></div>
          </div>
        </div>
        <div className="table-row-group">
          {reviews ? (
            reviews.map((item, index) => (
              <div
                key={index}
                className={`table-row ${
                  index % 2 === 0 ? "bg-neutral-100" : "bg-neutral-200"
                }`}
              >
                <div className="table-cell p-[10px]">
                  {item.event && item.event.name}
                </div>
                <div className="table-cell p-[10px] text-center">
                  {item.user ? item.user.email : ""}
                </div>
                <div className="table-cell p-[10px] text-center">
                  <div className="w-full flex justify-center">
                    <ReactStars
                      count={5}
                      value={item.rating}
                      edit={false}
                      size={24}
                      isHalf={true}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
                <div className="table-cell p-[10px] text-center">
                  {item.comment}
                </div>
                <div className="table-cell p-[10px] text-center">
                  {item.reply}
                </div>
                <div className="flex gap-[10px] py-[5px] justify-end px-[20px]">
                  <button
                    onClick={() => {
                      addReply(item._id);
                    }}
                    className="p-[10px] rounded uppercase font-bold text-white bg-green-600 hover:bg-green-700 text-sm"
                  >
                    Add Reply
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

export default ListReview;
