import React, { useState } from "react";
import FormBox from "../../components/FormBox";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../../assets/login-bg.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = () => {
        setEmailError("");
        setPasswordError("");
        setErrorMessage("");

        if (!email) {
            setEmailError("Email is required.");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setPasswordError("Password is required.");
            return;
        }

        const user = {
            email,
            password
        }

        axios.post("http://localhost:8081/api/users/login", user)
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/");
            })
            .catch((err) => {
                setErrorMessage("Incorrect email or password. Please try again.");
                console.log(`Login Failed: ${err}`);
            });
    }

    const handleRegistration = () => {
        navigate("/register");
    }

    return (
        <div className="flex justify-center items-center h-screen">
           <img className="object-cover w-full h-full" src={bgimage} alt="Login Background"></img>
           <div className="absolute">
            <FormBox title="Login">
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
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="text-sm flex justify-between mt-2">
                    <div className="flex gap-1">
                        <input type="checkbox" />
                        Remember me
                    </div>
                    <Link className="text-blue-600 font-semibold hover:underline" to="/forgot-password">Forgot Password?</Link>
                </div>
                <Button className="mt-[10px]" text="Login" onClick={handleLogin} />
                <div className="text-sm mt-3">
                    Don't have an account? <Link className="text-blue-600 font-semibold hover:underline" to="/register">Register now</Link>
                </div>
            </FormBox>
            </div>
        </div>
    );
};

export default Login;
