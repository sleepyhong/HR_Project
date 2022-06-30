import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion'

export default function Name() {
    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>Name</Accordion.Header>
            <Accordion.Body>
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" id="firstName" name="firstName" class="form-control" required />
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" id="lastName" name="lastName" class="form-control" required />
                <label for="middleName" class="form-label">Middle Name</label>
                <input type="text" id="middleName" name="middleName" class="form-control" />
                <label for="preferredName" class="form-label">Preferred Name</label>
                <input type="text" id="preferredName" name="preferredName" class="form-control" />
            </Accordion.Body>
        </Accordion.Item>
    )
}