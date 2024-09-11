import React, { useState } from "react";
import FormBox from "../../components/FormBox";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../../assets/login-bg.jpg";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleForgotPassword = () => {
        setEmailError("");
        setSuccessMessage("");

        if (!email) {
            setEmailError("Email is required.");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        axios.post("http://localhost:8081/api/users/forgot-password", { email })
            .then(() => {
                setSuccessMessage("Password reset instructions sent to your email.");
            })
            .catch((err) => {
                setSuccessMessage("Password reset instructions sent to your email.");
                console.error(`Error sending password reset email: ${err}`);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <img className="object-cover w-full h-full" src={bgimage} alt="Forgot Password Background" />
            <div className="absolute">
                <FormBox title="Forgot Password">
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                    {successMessage && <p className="text-green-500 text-xs font-semibold text-center">{successMessage}</p>}
                    <Button className="mt-[10px]" text="Reset Password" onClick={handleForgotPassword} />
                    <div className="text-sm mt-3">
                        Remember your password? <Link className="text-blue-600 font-semibold hover:underline" to="/login">Login here</Link>
                    </div>
                </FormBox>
            </div>
        </div>
    );
};

export default ForgotPassword;
