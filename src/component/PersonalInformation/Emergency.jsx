import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import store from "../../redux/store";

export default function Emergency() {
    const preUser = { ...store.getState() };
    const [disabled, setDisabled] = useState(true);
    const [emergencyContacts, setEmergencyContacts] = useState(preUser.emergencyContact);

    const onInputChange = (event) => {
        const newEmergencyContacts = [...emergencyContacts];
        let inputName = event.target.name.replace(/\d/g, '').substr(9);
        inputName = inputName.charAt(0).toLowerCase() + inputName.slice(1);
        newEmergencyContacts[event.target.parentElement.id][inputName] = event.target.value;
        setEmergencyContacts([...newEmergencyContacts]);
        console.log(emergencyContacts)
    }

    const onEdit = () => {
        setDisabled(false);
    }

    const onCancel = () => {
        if (window.confirm("Do you want to discard all the changes?")) {
            setEmergencyContacts([...preUser.emergencyContact]);
            setDisabled(true);
        }
    }

    const onAdd = () => {
        setEmergencyContacts([...emergencyContacts, {}]);
    }

    const onRemove = () => {
        const newEmergencyContacts = [...emergencyContacts];
        newEmergencyContacts.pop();
        setEmergencyContacts(newEmergencyContacts);
    }

    return (
        <Accordion.Item eventKey="4">
            <Accordion.Header>Emerency Contacts</Accordion.Header>
            <Accordion.Body>
                {
                    emergencyContacts.map((contact, index) => {
                        return (
                            <div id={index} key={contact}>
                                <Form.Label htmlFor={`emergencyFirstName${index}`}>First Name</Form.Label>
                                <Form.Control type="text" id={`emergencyFirstName${index}`} name={`emergencyFirstName${index}`} value={contact.firstName} disabled={disabled} onChange={onInputChange} />
                                <Form.Label htmlFor={`emergencyLastName${index}`}>Last Name</Form.Label>
                                <Form.Control type="text" id={`emergencyLastName${index}`} name={`emergencyLastName${index}`} value={contact.lastName} disabled={disabled} onChange={onInputChange} />
                                <Form.Label htmlFor={`emergencyMiddleName${index}`}>Middle Name</Form.Label>
                                <Form.Control type="text" id={`emergencyMiddleName${index}`} name={`emergencyMiddleName${index}`} value={contact.middleName} disabled={disabled} onChange={onInputChange} />
                                <Form.Label htmlFor={`emergencyCellPhone${index}`}>Cell Phone Number</Form.Label>
                                <Form.Control type="tel" id={`emergencyCellPhone${index}`} name={`emergencyCellPhone${index}`} placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={contact.cell} disabled={disabled} onChange={onInputChange} />
                                <Form.Label htmlFor={`emergencyEmail${index}`}>Email</Form.Label>
                                <Form.Control type="email" id={`emergencyEmail${index}`} name={`emergencyEmail${index}`} value={contact.email} disabled={disabled} onChange={onInputChange} />
                                <Form.Label htmlFor={`emergencyRelationship${index}`}>Relationship</Form.Label>
                                <Form.Control type="text" id={`emergencyRelationship${index}`} name={`emergencyRelationship${index}`} value={contact.relationship} disabled={disabled} onChange={onInputChange} />
                            </div>
                        )
                    })
                }

                {
                    disabled ?
                        <button type="button" onClick={onEdit}>Edit</button> :
                        <>
                            <button type="button" onClick={onAdd}>Add</button>
                            <button type="button" onClick={onRemove}>Remove</button>
                            <button type="button" onClick={onCancel}>Cancel</button>
                            <button type="submit">Save</button>
                        </>
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}