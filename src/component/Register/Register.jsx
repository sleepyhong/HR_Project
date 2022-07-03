import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Register() {
    const [error, setError] = useState(null);
    const { token } = useParams();

    axios
        .post("/check-token", { tokenString: token })
        .catch((err) => {
            const errMsg = err.response.data.msg;
            switch (errMsg) {
                case "Invalid Token":
                    window.location.replace("/home");
                    break;
                case "Token Expired. Contact your hiring manager for more information":
                    setError(errMsg);
                    break;
                default:
                    break;
            }
        })

    const submitForm = (event) => {
        event.preventDefault();

        const inputs = {
            username: event.target.elements['username'].value,
            email: event.target.elements['email'].value,
            password: event.target.elements['password'].value,
        };

        axios
            .post("/register", inputs)
            .catch((err) => {
                setError(err.response.data.msg);
            });
    }

    return (
        <>
            <h3>Register</h3>
            <form onSubmit={submitForm}>
                <div class="form-outline mb-4">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" id="username" name="username" class="form-control" placeholder="Enter your username" required />
                </div>
                <div class="form-outline mb-4">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" name="email" class="form-control" placeholder="Enter your email" required />
                </div>
                <div class="form-outline mb-4">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" class="form-control" placeholder="Enter your password" required />
                </div>
                <p>{error}</p>
                <button type="submit" class="btn btn-primary btn-block mb-4">Register</button>
            </form>
        </>
    );
}