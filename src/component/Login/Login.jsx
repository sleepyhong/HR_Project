import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../redux/userAction";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        const inputs = {
            email: event.target.elements['email'].value,
            password: event.target.elements['password'].value,
        };

        axios
            .post("/login", inputs)
            .then((result) => {
                sessionStorage.setItem('user', result.data.user);
                console.log(result.data.user)
                setUser(result.data.user);

                //redirect to application page or personal info page?
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data.msg
                });
            });
    }

    render() {
        return (
            <>
                <h1>Login</h1>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <p>{this.state.error}</p>
                    <button type="submit">Login</button>
                </form>
            </>
        );
    }
}