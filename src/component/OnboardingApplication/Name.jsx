import React from "react";
import store from "../../redux/store";
import Accordion from 'react-bootstrap/Accordion';

export default function Name() {
    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>Name</Accordion.Header>
            <Accordion.Body>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" id="firstName" name="firstName" className="form-control" required defaultValue={store.getState().firstName} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" id="lastName" name="lastName" className="form-control" required defaultValue={store.getState().lastName} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="middleName" className="form-label">Middle Name</label>
                <input type="text" id="middleName" name="middleName" className="form-control" defaultValue={store.getState().middleName} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="preferredName" className="form-label">Preferred Name</label>
                <input type="text" id="preferredName" name="preferredName" className="form-control" defaultValue={store.getState().preferredName} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}