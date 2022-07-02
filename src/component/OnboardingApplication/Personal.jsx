import React, { useState } from "react";
import store from "../../redux/store";
import Accordion from 'react-bootstrap/Accordion'

export default function Personal() {
    return (
        <Accordion.Item eventKey="6">
            <Accordion.Header>Personal Information</Accordion.Header>
            <Accordion.Body>
                <label htmlFor="ssn" className="form-label">SSN</label>
                <input type="text" id="ssn" name="ssn" className="form-control" placeholder="123-45-6789" pattern="\d{3}-?\d{2}-?\d{4}" required defaultValue={store.getState().ssn} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" className="form-control" required defaultValue={store.getState().dateOfBirth ? store.getState().dateOfBirth.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="gender" className="form-label">Gender</label>
                <select id="gender" name="gender" className="form-control" required defaultValue={store.getState().gender} disabled={store.getState().applicationStatus === "Pending"} >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="I do not wish to answer">I do not wish to answer</option>
                </select>
            </Accordion.Body>
        </Accordion.Item>
    )
}