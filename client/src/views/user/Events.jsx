import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import formatDate from "../../utils/formatDate";
import { Link, useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(`Error getting event: ${err}`);
      });
  }, []);

  const addRating = (eventId, rating) => {
    const review = {
      event: eventId,
      user: JSON.parse(localStorage.getItem("user")).user._id,
      rating: rating,
    };

    axios.post("http://localhost:8081/api/reviews", review);

    console.log(rating);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-wrap p-[20px] gap-[20px] justify-center">
      <div className="flex justify-center w-full p-4">
        <input
          type="text"
          placeholder="Search events by genre, artists, or name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-md w-full max-w-md max-h-10"
        />
      </div>

      {events &&
        events
          .filter((event) => {
            const eventGenre = event.eventGenre
              ? event.eventGenre.toLowerCase()
              : "";
            const artists = event.artists
              ? event.artists.map((artist) => artist.toLowerCase())
              : [];
            const name = event.name ? event.name.toLowerCase() : "";

            return (
              eventGenre.includes(searchQuery.toLowerCase()) ||
              artists.some((artist) =>
                artist.includes(searchQuery.toLowerCase())
              ) ||
              name.includes(searchQuery.toLowerCase())
            );
          })
          .map((item) => (
            <Link key={item._id} to={`view/${item._id}`}>
              <Card
                name={item.name}
                genre={item.eventGenre}
                venue={item.venue.name}
                date={formatDate(item.date)}
                artists={item.artists}
                description={item.description}
                ticketPrice={item.ticketPrice}
                image={`http://localhost:8081/${item.image}`}
              />
            </Link>
          ))}
    </div>
  );
};

export default Events;
