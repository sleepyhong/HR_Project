import React from "react";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import Accordion from 'react-bootstrap/Accordion';

export default function Email() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    return (
        <Accordion.Item eventKey="5">
            <Accordion.Header>Email</Accordion.Header>
            <Accordion.Body>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-control" defaultValue={store.getState().email} disabled />
            </Accordion.Body>
        </Accordion.Item>
    )
}