import React, { useEffect, useState } from "react";
import CenterCanvas from "../../../components/CenterCanvas";
import FormBox from "../../../components/FormBox";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "../../../components/Select";

const UpdateEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [venue, setVenue] = useState();
  const [description, setDescription] = useState();
  const [ticketPrice, setTicketPrice] = useState();
  const [eventGenre, setEventGenre] = useState("");
  const [artists, setArtists] = useState([]);
  const [venues, setVenues] = useState([]);

  const navigate = useNavigate();
  let { id } = useParams();

  const handleClick = () => {
    const event = {
      name,
      date,
      venue,
      description,
      ticketPrice,
      eventGenre,
      artists: artists.map((artist) => artist.trim()),
    };

    axios
      .put(`http://localhost:8081/api/events/${id}`, event)
      .then((res) => {
        alert("Event updated successfully");
        navigate("/admin/events");
      })
      .catch((err) => {
        console.log(`Cannot Update Event: ${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/events/${id}`)
      .then((res) => {
        setName(res.data.name);
        setDate(res.data.date);
        setVenue(res.data.venue);
        setDescription(res.data.description);
        setTicketPrice(res.data.ticketPrice);
        setEventGenre(res.data.eventGenre);
        const parsedArtists = res.data.artists.map((artist) => artist.trim());
        setArtists(parsedArtists);
      })
      .catch((err) => {
        console.log(`Cannot Retrieve Event: ${err}`);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/venues")
      .then((res) => {
        setVenues(res.data);
      })
      .catch((err) => {
        console.log(`Cannot retrieve venues: ${err}`);
      });
  }, []);

  return (
    <CenterCanvas>
      <button
        className="absolute top-0 left-0 rounded py-[10px] px-[20px] bg-red-700 text-white hover:bg-red-800"
        onClick={() => {
          navigate("/admin/events");
        }}
      >
        Back
      </button>
      <FormBox title="Update Event">
        <Input
          value={name}
          placeholder="Event Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          value={date}
          placeholder="Date"
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <Select
          value={venue}
          onChange={(e) => {
            setVenue(e.target.value);
          }}
        >
          <option hidden value="">
            Select a venue
          </option>
          {venues ? (
            venues.map((item) => (
              <option key={item._id} className="p-[10px]" value={item._id}>
                {item.name}
              </option>
            ))
          ) : (
            <></>
          )}
        </Select>
        <Input
          value={description}
          placeholder="Event Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Input
          value={ticketPrice}
          placeholder="Ticket Price"
          type="number"
          onChange={(e) => {
            setTicketPrice(e.target.value);
          }}
        />
        <Input
          value={eventGenre}
          placeholder="Event Genre"
          onChange={(e) => {
            setEventGenre(e.target.value);
          }}
        />
        <Input
          value={artists.join(",")}
          placeholder="Artists"
          onChange={(e) => {
            setArtists(e.target.value.split(","));
          }}
        />
        <Button
          className="mt-[10px]"
          text="Update Event"
          onClick={handleClick}
        />
      </FormBox>
    </CenterCanvas>
  );
};

export default UpdateEvent;
