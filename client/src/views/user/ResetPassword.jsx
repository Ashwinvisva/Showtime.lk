import React, { useState } from "react";
import FormBox from "../../components/FormBox";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import bgimage from "../../assets/login-bg.jpg";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = () => {
        setPasswordError("");
        setSuccessMessage("");

        if (!password || !confirmPassword) {
            setPasswordError("Password and Confirm Password are required.");
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        axios.post(`http://localhost:8081/api/users/reset-password/${token}`, { password })
            .then(() => {
                setSuccessMessage("Password reset successfully.");
            })
            .catch((err) => {
                setPasswordError("Failed to reset password. Please try again.");
                console.error(`Error resetting password: ${err}`);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <img className="object-cover w-full h-full" src={bgimage} alt="Reset Password Background" />
            <div className="absolute">
                <FormBox title="Reset Password">
                    <Input
                        placeholder="New Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                    {successMessage && <p className="text-green-500 text-xs justify-center font-semibold">{successMessage} <Link className="text-blue-600 hover:underline" to="/login">Login to continue</Link></p>}
                    <Button className="mt-[10px]" text="Reset Password" onClick={handleResetPassword} />
                    <div className="text-sm mt-3">
                        Remember your password? <Link className="text-blue-600 font-semibold hover:underline" to="/login">Login here</Link>
                    </div>
                </FormBox>
            </div>
        </div>
    );
};

export default ResetPassword;
