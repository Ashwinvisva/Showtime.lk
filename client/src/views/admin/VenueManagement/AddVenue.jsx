import React, { useState } from "react";
import CenterCanvas from "../../../components/CenterCanvas";
import FormBox from "../../../components/FormBox";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVenue = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [maxColumn, setMaxColumn] = useState("");
  const [maxRow, setMaxRow] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!name.trim()) {
      tempErrors.name = "Venue name is required.";
      isValid = false;
    }
    if (!address.trim()) {
      tempErrors.address = "Address is required.";
      isValid = false;
    }
    if (!maxColumn) {
      tempErrors.maxColumn = "Total number of columns is required.";
      isValid = false;
    } else if (maxColumn <= 0) {
      tempErrors.maxColumn = "Total number of columns must be greater than zero.";
      isValid = false;
    }
    if (!maxRow) {
      tempErrors.maxRow = "Total number of rows is required.";
      isValid = false;
    } else if (maxRow <= 0) {
      tempErrors.maxRow = "Total number of rows must be greater than zero.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleClick = () => {
    if (validateForm()) {
      const venue = {
        name,
        address,
        maxColumn: parseInt(maxColumn, 10),
        maxRow: parseInt(maxRow, 10)
      };

      axios.post("http://localhost:8081/api/venues", venue)
        .then((res) => {
          alert("Venue added successfully");
          navigate("/admin/venues");
        })
        .catch((err) => {
          console.log(`Cannot add venue: ${err}`);
          alert("Failed to add venue. Please check the details and try again.");
        });
    }
  };

  return (
    <CenterCanvas>
      <button
        className="absolute top-0 left-0 rounded py-[10px] px-[20px] bg-red-700 text-white hover:bg-red-800"
        onClick={() => navigate("/admin/venues")}
      >
        Back
      </button>
      <FormBox title="Add Venue">
        <Input
          value={name}
          placeholder="Venue Name"
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        <Input
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
        <Input
          value={maxColumn}
          type="number"
          placeholder="Total Number of Columns"
          onChange={(e) => setMaxColumn(e.target.value)}
        />
        {errors.maxColumn && <p className="text-red-500 text-xs">{errors.maxColumn}</p>}
        <Input
          value={maxRow}
          type="number"
          placeholder="Total Number of Rows"
          onChange={(e) => setMaxRow(e.target.value)}
        />
        {errors.maxRow && <p className="text-red-500 text-xs">{errors.maxRow}</p>}
        <Button className="mt-[10px]" text="Add Venue" onClick={handleClick} />
      </FormBox>
    </CenterCanvas>
  );
};

export default AddVenue;
