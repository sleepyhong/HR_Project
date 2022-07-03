import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";

export default function OCTReceipt() {
    const [octReceiptStatus, setOctReceiptStatus] = useState(store.getState().visa.opt.opt_receipt.status);

    const uploadOPTEAD = (event) => {
        event.preventDefault();

        const inputs = new FormData();
        inputs.append("opt_ead", event.target.elements[0].files[0]);
        inputs.append("userId", store.getState()._id);

        axios
            .post("/upload-opt-ead", inputs)
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
        <Accordion.Item eventKey="0">
            <Accordion.Header>OCT Receipt</Accordion.Header>
            <Accordion.Body>
                <h3>Status: {octReceiptStatus}</h3>
                {
                    {
                        "Pending":
                            <p>Waiting for HR to approve your OPT Receipt</p>,
                        "Approved":
                            <>
                                <p>Please upload a copy of your OPT EAD</p>
                                <form action="upload-opt-ead" method="POST" onSubmit={uploadOPTEAD}>
                                    <input type="file" id="opt_ead" name="opt_ead" className="form_control" accept="application/pdf" required />
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Upload</button>
                                </form>
                            </>,
                        "Rejected":
                            <p>{store.getState().visa.opt.opt_receipt.message}</p>
                    }[octReceiptStatus]
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}