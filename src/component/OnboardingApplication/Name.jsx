import React from "react";
import store from "../../redux/store";
import Accordion from 'react-bootstrap/Accordion';

export default function Name() {
    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>Name</Accordion.Header>
            <Accordion.Body>
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" id="firstName" name="firstName" class="form-control" required value={store.getState().firstName} disabled={store.getState().applicationStatus === "Pending"} />
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" id="lastName" name="lastName" class="form-control" required value={store.getState().lastName} disabled={store.getState().applicationStatus === "Pending"} />
                <label for="middleName" class="form-label">Middle Name</label>
                <input type="text" id="middleName" name="middleName" class="form-control" value={store.getState().middleName} disabled={store.getState().applicationStatus === "Pending"} />
                <label for="preferredName" class="form-label">Preferred Name</label>
                <input type="text" id="preferredName" name="preferredName" class="form-control" value={store.getState().preferredName} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}