import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../redux/userAction";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        const inputs = {
            username: event.target.elements['username'].value,
            email: event.target.elements['email'].value,
            password: event.target.elements['password'].value,
        };

        axios
            .post("/register", inputs)
            .catch((error) => {
                this.setState({
                    error: error.response.data.msg
                });
            });
    }

    render() {
        return (
            <>
                <h1>Register</h1>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required />
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <p>{this.state.error}</p>
                    <button type="submit">Register</button>
                </form>
            </>
        );
    }
}