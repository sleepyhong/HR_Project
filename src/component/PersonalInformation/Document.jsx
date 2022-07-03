import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

import store from "../../redux/store";

export default function Document() {
    return (
        <Accordion.Item eventKey="5">
            <Accordion.Header>Documents</Accordion.Header>
            <Accordion.Body>
                {
                    store.getState().driverLicense.haveLicense ?
                        <p>
                            <a href={`./document/driver_license/${store.getState()._id}.pdf`} download>Drive License</a>
                        </p> :
                        <></>
                }
                {
                    store.getState().visa.type === "F1(CPT/OPT)" ?
                    <p>
                        <a href={`./document/opt/opt_receipt/${store.getState()._id}.pdf`} download>OPT Receipt</a>
                    </p> :
                    <>
                    </>
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}