import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";

export default function I_20() {
    const [i20Status, setI20Status] = useState(store.getState().visa.opt.i_20.status);

    return (
        <Accordion.Item eventKey="3">
            <Accordion.Header>I 20</Accordion.Header>
            <Accordion.Body>
                <h3>Status: {i20Status}</h3>
                {
                    {
                        "Pending":
                            <p>Waiting for HR to approve your I 20</p>,
                        "Approved":
                                <p>All documents have been approved</p>,
                        "Rejected":
                            <p>{store.getState().visa.opt.i_20.message}</p>
                    }[i20Status]
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}