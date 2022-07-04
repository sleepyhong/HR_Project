import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import store from "../../redux/store";

export default function Contact() {
    const preUser = { ...store.getState() };
    const [disabled, setDisabled] = useState(true);
    const [contact, setContact] = useState(preUser.phoneNumber);

    const onInputChange = (event) => {
        const newContact = { ...preUser.phoneNumber };
        newContact[event.target.name] = event.target.value;
        setContact({ ...newContact });
    }

    const onEdit = () => {
        setDisabled(false);
    }

    const onCancel = () => {
        if (window.confirm("Do you want to discard all the changes?")) {
            setContact({ ...preUser.phoneNumber });
            setDisabled(true);
        }
    }

    return (
        <Accordion.Item eventKey="2">
            <Accordion.Header>Contact</Accordion.Header>
            <Accordion.Body>
                <Form.Label htmlFor="cell">Cell Phone Number</Form.Label>
                <Form.Control type="tel" id="cell" name="cell" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={contact.cell} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="work">Work Phone Number</Form.Label>
                <Form.Control type="tel" id="work" name="work" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={contact.work} disabled={disabled} onChange={onInputChange} />
                
                {
                    disabled ?
                        <button type="button" onClick={onEdit}>Edit</button> :
                        <>
                            <button type="button" onClick={onCancel}>Cancel</button>
                            <button type="submit">Save</button>
                        </>
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}