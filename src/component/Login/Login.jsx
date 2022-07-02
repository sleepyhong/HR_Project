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
                sessionStorage.setItem('user', JSON.stringify(result.data.user));
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
                <h3>Login</h3>
                <form onSubmit={this.submitForm}>
                    <div className="form-outline mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" />
                    </div>
                    <div className="form-outline mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input autoComplete="true" type="password" id="password" name="password" className="form-control" placeholder="Enter your password" />
                    </div>
                    <p>{this.state.error}</p>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>
                </form>
            </>
        );
    }
}