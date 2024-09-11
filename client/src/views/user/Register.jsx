import React, { useState } from "react";
import FormBox from "../../components/FormBox";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgimage from "../../assets/login-bg.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const isValidLength = password.length >= 8;
    const hasNumbers = /\d/.test(password);
    return isValidLength && hasNumbers;
  };

  const handleRegister = () => {
    let isValid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneNumberError("");
    setAddressError("");

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long and include numbers.");
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirming password is required.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      isValid = false;
    }
    if (!phoneNumber) {
      setPhoneNumberError("Phone number is required.");
      isValid = false;
    }
    if (!address) {
      setAddressError("Address is required.");
      isValid = false;
    }

    if (isValid) {
      const user = {
        name,
        email,
        password,
        phoneNumber,
        address,
      };

      axios
        .post("http://localhost:8081/api/users/register", user)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(`Registration Failed: ${err}`);
          alert("Registration failed. Please try again.");
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <img className="object-cover w-full h-full" src={bgimage} alt="Background" />
      <div className="absolute">
        <FormBox title="Register">
          <Input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && <p className="text-red-500 text-xs">{confirmPasswordError}</p>}
          <Input
            placeholder="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {phoneNumberError && <p className="text-red-500 text-xs">{phoneNumberError}</p>}
          <Input
            placeholder="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {addressError && <p className="text-red-500 text-xs">{addressError}</p>}
          <Button
            className="mt-[10px]"
            text="Register"
            onClick={handleRegister}
          />
        </FormBox>
      </div>
    </div>
  );
};

export default Register;
