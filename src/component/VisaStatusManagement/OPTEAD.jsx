import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";

export default function OCTEAD() {
    const [octEADStatus, setOctEADStatus] = useState(store.getState().visa.opt.opt_ead.status);

    const uploadI983 = (event) => {
        event.preventDefault();

        const inputs = new FormData();
        inputs.append("i_983", event.target.elements[0].files[0]);
        inputs.append("userId", store.getState()._id);

        axios
            .post("/upload-i-983", inputs)
            .then((result) => {
                sessionStorage.setItem('user', JSON.stringify(result.data.user));
                setUser(result.data.user);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>OCT EAD</Accordion.Header>
            <Accordion.Body>
                <h3>Status: {octEADStatus}</h3>
                {
                    {
                        "Pending":
                            <p>Waiting for HR to approve your OPT EAD</p>,
                        "Approved":
                            <>
                                <p>Please download and fill out the I-983 form <a href={`./document/opt/i_983/form.pdf`} download>Download</a></p>
                                <form action="/upload-i-983" method="POST" onSubmit={uploadI983}>
                                    <input type="file" id="i_983" name="i_983" className="form_control" accept="application/pdf" required />
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Upload</button>
                                </form>
                            </>,
                        "Rejected":
                            <p>{store.getState().visa.opt.opt_ead.message}</p>
                    }[octEADStatus]
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}