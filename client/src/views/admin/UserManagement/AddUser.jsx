import React, { useState } from "react";
import CenterCanvas from "../../../components/CenterCanvas";
import FormBox from "../../../components/FormBox";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OptionButton from "../../../components/OptionButton";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!email.trim()) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!password.trim()) {
      tempErrors.password = "NIC number is required.";
      isValid = false;
    }

    if (!name.trim()) {
      tempErrors.name = "Name is required.";
      isValid = false;
    }

    if (!type) {
      tempErrors.type = "User type must be selected.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleClick = () => {
    if (validateForm()) {
      const user = {
        email,
        password,
        name,
        type,
      };

      axios
        .post("http://localhost:8081/api/users", user)
        .then((res) => {
          alert("User added successfully");
          navigate("/admin/users");
        })
        .catch((err) => {
          console.log(`Cannot Add User: ${err}`);
          alert("Failed to add user. Please check the details and try again.");
        });
    }
  };

  return (
    <CenterCanvas>
      <button
        className="absolute top-0 left-0 rounded py-[10px] px-[20px] bg-red-700 text-white hover:bg-red-800"
        onClick={() => navigate("/admin/users")}
      >
        Back
      </button>
      <FormBox title="Add User">
        <Input
          value={email}
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        <Input
          value={password}
          placeholder="NIC Number"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
        <Input
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        <OptionButton
          text="Receptionist"
          value="receptionist"
          checked={type === "receptionist"}
          onChange={() => setType("receptionist")}
          className="mt-[10px]"
        />
        <OptionButton
          text="Organizer"
          value="organizer"
          checked={type === "organizer"}
          onChange={() => setType("organizer")}
          className="mt-[10px]"
        />
        {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
        <Button className="mt-[10px]" text="Add User" onClick={handleClick} />
      </FormBox>
    </CenterCanvas>
  );
};

export default AddUser;
