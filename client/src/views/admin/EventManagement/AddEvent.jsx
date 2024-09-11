import React, { useEffect, useState } from "react";
import CenterCanvas from "../../../components/CenterCanvas";
import FormBox from "../../../components/FormBox";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/Select";

const AddEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [image, setImage] = useState(null);
  const [venues, setVenues] = useState([]);
  const [errors, setErrors] = useState({});
  const [eventGenre, setEventGenre] = useState("");
  const [artists, setArtists] = useState([]);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!name.trim()) {
      tempErrors.name = "Event name is required.";
      isValid = false;
    }
    if (!date.trim()) {
      tempErrors.date = "Date is required.";
      isValid = false;
    }
    if (!venue.trim()) {
      tempErrors.venue = "Venue is required.";
      isValid = false;
    }
    if (!description.trim()) {
      tempErrors.description = "Description is required.";
      isValid = false;
    }
    if (!ticketPrice.trim()) {
      tempErrors.ticketPrice = "Ticket price is required.";
      isValid = false;
    } else if (isNaN(ticketPrice) || parseFloat(ticketPrice) <= 0) {
      tempErrors.ticketPrice = "Ticket price must be a positive number.";
      isValid = false;
    }
    if (!image) {
      tempErrors.image = "Event image is required.";
      isValid = false;
    }
    if (!eventGenre.trim()) {
      tempErrors.eventGenre = "Event genre is required.";
      isValid = false;
    }
    if (artists.length === 0) {
      tempErrors.artists = "At least one artist is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleClick = () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("venue", venue);
      formData.append("description", description);
      formData.append("ticketPrice", ticketPrice);
      formData.append("image", image);
      formData.append("eventGenre", eventGenre);
      formData.append("artists", artists);

      axios
        .post("http://localhost:8081/api/events", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert("Event added successfully");
          navigate("/admin/events");
        })
        .catch((err) => {
          console.log(`Cannot add event: ${err}`);
          alert("Failed to add event. Please check the details and try again.");
        });
    }
  };

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
      <FormBox title="Add Event">
        <Input
          value={name}
          placeholder="Event Name"
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        <Input
          value={date}
          placeholder="Date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
        <Select value={venue} onChange={(e) => setVenue(e.target.value)}>
          <option hidden value="">
            Select a venue
          </option>
          {venues.map((item, index) => (
            <option key={index} className="p-[10px]" value={item._id}>
              {item.name}
            </option>
          ))}
        </Select>
        {errors.venue && <p className="text-red-500 text-xs">{errors.venue}</p>}
        <div className="message-box">
          <Input
            value={description}
            placeholder="Event Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.ticketPrice && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>
        <Input
          value={ticketPrice}
          placeholder="Ticket Price"
          type="number"
          onChange={(e) => setTicketPrice(e.target.value)}
        />
        {errors.ticketPrice && (
          <p className="text-red-500 text-xs">{errors.ticketPrice}</p>
        )}
        <Input
          value={eventGenre}
          placeholder="Event Genre"
          onChange={(e) => setEventGenre(e.target.value)}
        />
        {errors.eventGenre && (
          <p className="text-red-500 text-xs">{errors.eventGenre}</p>
        )}
        <Input
          value={artists.join(",")}
          placeholder="Artists"
          onChange={(e) => {
            const artistArray = e.target.value.split(",");
            setArtists(artistArray);
          }}
        />

        {errors.artists && (
          <p className="text-red-500 text-xs">{errors.artists}</p>
        )}
        <label>Event Image</label>
        <input type="file" onChange={handleImageChange} />
        {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
        <Button className="mt-[10px]" text="Add Event" onClick={handleClick} />
      </FormBox>
    </CenterCanvas>
  );
};

export default AddEvent;
