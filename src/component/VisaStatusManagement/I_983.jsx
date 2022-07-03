import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";

export default function I_983() {
    const [i983Status, setI983Status] = useState(store.getState().visa.opt.i_983.status);

    const uploadI20 = (event) => {
        event.preventDefault();

        const inputs = new FormData();
        for (let i = 0; i < event.target.elements[0].files.length; i++) {
            inputs.append(`i_20_${i}`, event.target.elements[0].files[i]);
        }
        inputs.append("userId", store.getState()._id);

        axios
            .post("/upload-i-20", inputs)
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
        <Accordion.Item eventKey="2">
            <Accordion.Header>I 983</Accordion.Header>
            <Accordion.Body>
                <h3>Status: {i983Status}</h3>
                <p>
                    <a href={`./document/opt/i_983/form.pdf`} download>Empty Template</a>
                </p>
                <p>
                    <a href={`./document/opt/i_983/form.pdf`} download>Sample Template</a>
                </p>
                {
                    {
                        "Pending":
                            <p>Waiting for HR to approve your I 983</p>,
                        "Approved":
                            <>
                                <p>Please send the I-983 along with all necessary documents to your school and upload the new I-20</p>
                                <form action="/upload-i-20" method="POST" onSubmit={uploadI20}>
                                    <input type="file" id="i_20" name="i_20" className="form_control" accept="application/pdf" required multiple/>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Upload</button>
                                </form>
                            </>,
                        "Rejected":
                            <p>{store.getState().visa.opt.i_983.message}</p>
                    }[i983Status]
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}