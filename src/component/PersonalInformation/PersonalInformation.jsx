import React, { useState } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import Name from "./Name";
import Address from "./Address";
import Contact from "./Contact";
import Employment from "./Employment";
import Emergency from "./Emergency";
import Document from "./Document";

export default function PersonalInformation() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const inputs = {};
        for (const element of event.target.elements) {
            if (element.name) {
                inputs[element.name] = element.value;
            }
        }
        inputs['userId'] = store.getState()._id;

        axios   
            .post("/information", inputs)
            .then((result) => {
                sessionStorage.setItem("user", JSON.stringify(result.data.user));
                setUser(result.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Accordion defaultActiveKey="0" alwaysOpen>
            <Form action="/information" method="POST" onSubmit={onSubmit}>
                <Name />
                <Address />
                <Contact />
                <Employment />
                <Emergency />
                <Document />
            </Form>
        </Accordion>
    );
}