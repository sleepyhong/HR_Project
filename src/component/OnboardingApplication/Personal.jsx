import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion'

export default function Personal() {
    return (
        <Accordion.Item eventKey="6">
            <Accordion.Header>Personal Information</Accordion.Header>
            <Accordion.Body>
                <label for="ssn" class="form-label">SSN</label>
                <input type="text" id="ssn" name="ssn" class="form-control" placeholder="123-45-6789" pattern="\d{3}-?\d{2}-?\d{4}" required />
                <label for="dateOfBirth" class="form-label">Date of Birth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" class="form-control" required />
                <label for="gender" class="form-label">Gender</label>
                <select id="gender" name="gender" class="form-control" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="I do not wish to answer">I do not wish to answer</option>
                </select>
            </Accordion.Body>
        </Accordion.Item>
    )
}