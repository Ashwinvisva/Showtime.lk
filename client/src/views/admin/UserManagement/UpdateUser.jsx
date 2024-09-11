import React, { useEffect, useState } from "react";
import CenterCanvas from "../../../components/CenterCanvas";
import FormBox from "../../../components/FormBox";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OptionButton from "../../../components/OptionButton";

const UpdateUser = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();
  let { id } = useParams();

  const handleClick = () => {
    const user = {
      email,
      name,
      type,
    };

    axios
      .put(`http://localhost:8081/api/users/${id}`, user)
      .then((res) => {
        alert("User updated successfully");
        navigate("/admin/users");
      })
      .catch((err) => {
        console.log(`Cannot Update User: ${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/users/${id}`)
      .then((res) => {
        setEmail(res.data.email);
        setName(res.data.name);
        setType(res.data.type);
      })
      .catch((err) => {
        console.log(`Cannot Retrieve User: ${err}`);
      });
  }, []);

  return (
    <CenterCanvas>
      <button
        className="absolute top-0 left-0 rounded py-[10px] px-[20px] bg-red-700 text-white hover:bg-red-800"
        onClick={() => {
          navigate("/admin/users");
        }}
      >
        Back
      </button>
      <FormBox title="Update User">
        <Input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <OptionButton
          text="Receptionist"
          value="receptionist"
          checked={type === "receptionist"}
          onChange={(e) => setType(e.target.value)}
          className="mt-[10px]"
        />
        <OptionButton
          text="Organizer"
          value="organizer"
          checked={type === "organizer"}
          onChange={(e) => setType(e.target.value)}
        />
        <Button
          className="mt-[10px]"
          text="Update User"
          onClick={handleClick}
        />
      </FormBox>
    </CenterCanvas>
  );
};

export default UpdateUser;
