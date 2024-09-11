import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

const ViewEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(`Error getting event: ${err}`);
      });

    axios
      .get(`http://localhost:8081/api/reviews/average-rating/${id}`)
      .then((res) => {
        setAvgRating(res.data.rating);
      })
      .catch((err) => {
        console.log(`Error getting average rating: ${err}`);
      });

    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    axios
      .get(`http://localhost:8081/api/reviews/event/${id}/user/${userId}`)
      .then((res) => {
        if (res.data.length) {
          setRating(res.data[0].rating);
          setComment(res.data[0].comment);
          setReply(res.data[0].reply);
          setReviewId(res.data[0]._id);
        }
      })
      .catch((err) => {
        console.log(`Error getting reviews: ${err}`);
      });
  }, [id]);

  const validateReview = () => {
    setError("");
    if (!rating) {
      setError("Rating is required.");
      return false;
    }
    if (!comment.trim()) {
      setError("Comment is required.");
      return false;
    }
    return true;
  };

  const updateReview = () => {
    if (!validateReview()) return;

    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    const newReview = {
      event: id,
      user: userId,
      rating: rating,
      comment: comment
    };

    const method = reviewId ? "put" : "post";
    const url = reviewId
      ? `http://localhost:8081/api/reviews/${reviewId}`
      : "http://localhost:8081/api/reviews";

    axios[method](url, newReview)
      .then(() => {
        alert(`Review ${reviewId ? "Updated" : "Added"} Successfully`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(`Error ${reviewId ? "Updating" : "Adding"} Review: ${err}`);
        alert(`Error ${reviewId ? "Updating" : "Adding"} Review.`);
      });
  };

  const deleteReview = () => {
    if (!confirm("Are you sure you want to delete the review?")) return;

    axios
      .delete(`http://localhost:8081/api/reviews/${reviewId}`)
      .then(() => {
        alert("Review Deleted Successfully");
        setRating(0);
        setComment("");
        setReply("");
        setReviewId("");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error Deleting Review", err);
      });
  };

  const getMapUrl = (address) => {
    const formattedAddress = address.replace(" ", "+");
    return `https://www.google.com/maps/search/${formattedAddress}`;
  };

  return (
    <>
      {event ? (
        <div className="min-h-[calc(100vh-64px)] w-full flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="w-1/2 min-h-[calc(100vh-64px)] bg-neutral-100 flex justify-center items-center">
              <div className="w-[500px] h-[500px] bg-black">
                <img
                  className="object-cover h-full w-full"
                  src={`http://localhost:8081/${event.image}`}
                  alt={`${event.name} Image`}
                />
              </div>
            </div>
            <div className="w-1/2 min-h-[calc(100vh-64px)] flex flex-col p-[50px]">
              <div className="flex justify-between">
                <div className="text-3xl font-bold">{event.name}</div>
                <div className="px-4 text-white rounded-full bg-cyan-600 capitalize text-sm flex items-center font-bold">
                  {event.eventGenre}
                </div>
              </div>
              <ReactStars
                count={5}
                size={24}
                value={avgRating}
                edit={false}
                isHalf={true}
                activeColor="#ffd700"
              />
              <div className="text-xl italic mt-[10px] flex">
                <a
                  className="rounded-full flex items-center gap-[5px]"
                  target="blank"
                  href={getMapUrl(event.venue.address)}
                >
                  {event.venue.name}
                  <svg
                    version="1.0"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="24px"
                    height="24px"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                    xml:space="preserve"
                  >
                    <path
                      fill="#FF0000"
                      d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
	C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
	C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                    />
                  </svg>
                </a>
              </div>
              <div className="text-xl">{formatDate(event.date)}</div>
              <div className="font-bold mt-5">
                Artists:{" "}
                <span className="font-medium italic">{event.artists}</span>
              </div>
              <div className="mt-[20px]">{event.description}</div>
              <button
                className="py-[10px] border-2 border-black hover:bg-black hover:text-white uppercase font-bold rounded-full text-sm duration-200 mt-[20px]"
                onClick={() => {
                  navigate(`/seats/${event._id}`);
                }}
              >
                Buy Ticket
              </button>
              <div className="w-full flex justify-center flex-col items-center gap-[10px] pt-[30px]">
                {error && <p className="text-red-500">{error}</p>}
                <ReactStars
                  count={5}
                  size={24}
                  value={rating}
                  isHalf={true}
                  activeColor="#ffd700"
                  onChange={(newRating) => {
                    setRating(newRating);
                  }}
                />
                <Input
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <Button
                  text={reviewId ? "Update Review" : "Add Review"}
                  onClick={updateReview}
                />
                {reviewId && (
                  <Button text="Delete Review" onClick={deleteReview} />
                )}
                {reply && (
                  <div className="reply">
                    <strong>Reply:</strong> {reply}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </>
  );
};

export default ViewEvent;
