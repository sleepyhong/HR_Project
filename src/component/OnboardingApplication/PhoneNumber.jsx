import React from "react";
import store from "../../redux/store";
import Accordion from 'react-bootstrap/Accordion'

export default function PhoneNumber() {
    return (
        <Accordion.Item eventKey="3">
            <Accordion.Header>Phone Number</Accordion.Header>
            <Accordion.Body>
                <label htmlFor="cell" className="form-label">Cell</label>
                <input type="tel" id="cell" name="cell" className="form-control" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required defaultValue={store.getState().phoneNumber.cell} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="work" className="form-label">Work</label>
                <input type="tel" id="work" name="work" className="form-control" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={store.getState().phoneNumber.work} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}