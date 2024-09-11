import React, { useEffect, useState } from "react";
import CenterCanvas from "../../../components/CenterCanvas";
import FormBox from "../../../components/FormBox";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateVenue = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [maxColumn, setMaxColumn] = useState();
  const [maxRow, setMaxRow] = useState();

  const navigate = useNavigate();
  let { id } = useParams();

  const handleClick = () => {
    const venue = {
      name,
      address,
      maxColumn,
      maxRow
    };

    axios.put(`http://localhost:8081/api/venues/${id}`, venue)
      .then((res) => {
        alert("Venue updated successfully");
        navigate("/admin/venues");
      })
      .catch((err) => {
        console.log(`Cannot Update Venue: ${err}`);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/api/venues/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAddress(res.data.address);
        setMaxColumn(res.data.maxColumn);
        setMaxRow(res.data.maxRow);
      })
      .catch((err) => {
        console.log(`Cannot Retrieve Venue: ${err}`);
      });
  }, []);

  return (
    <CenterCanvas>
      <button className="absolute top-0 left-0 rounded py-[10px] px-[20px] bg-red-700 text-white hover:bg-red-800" onClick={() => { navigate("/admin/venues") }}>
        Back
      </button>
      <FormBox title="Update Venue">
        <Input
          value={name}
          placeholder="Venue Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          value={address}
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <Input
          value={maxColumn}
          type="number"
          placeholder="Total Number of Columns"
          onChange={(e) => {
            setMaxColumn(e.target.value);
          }}
        />
        <Input
          value={maxRow}
          type="number"
          placeholder="Total Number of Rows"
          onChange={(e) => {
            setMaxRow(e.target.value);
          }}
        />
        <Button className="mt-[10px]" text="Update Venue" onClick={handleClick} />
      </FormBox>
    </CenterCanvas>
  );
};

export default UpdateVenue;
