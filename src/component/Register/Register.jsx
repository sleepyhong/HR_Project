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
                <h3>Register</h3>
                <form onSubmit={this.submitForm}>
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
                    <p>{this.state.error}</p>
                    <button type="submit" class="btn btn-primary btn-block mb-4">Register</button>
                </form>
            </>
        );
    }
}