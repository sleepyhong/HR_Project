import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import store from "../../redux/store";

export default function Employment() {
    const preUser = { ...store.getState() };
    const [disabled, setDisabled] = useState(true);
    const [employment, setEmployment] = useState(preUser.visa);

    const onInputChange = (event) => {
        const newEmployment = { ...employment };
        newEmployment[event.target.name] = event.target.value;
        setEmployment({ ...newEmployment });
    }

    const onEdit = () => {
        setDisabled(false);
    }

    const onCancel = () => {
        if (window.confirm("Do you want to discard all the changes?")) {
            setEmployment({ ...preUser.visa });
            setDisabled(true);
        }
    }

    return (
        <Accordion.Item eventKey="3">
            <Accordion.Header>Employment</Accordion.Header>
            <Accordion.Body>
                <Form.Label htmlFor="type">Visa Title</Form.Label>
                <Form.Select id="type" name="type" value={employment.type} disabled={disabled} onChange={onInputChange}>
                    <option value="Citizen">Citizen</option>
                    <option value="Green Card">Green Card</option>
                    <option value="H1-B">H1-B</option>
                    <option value="L2">L2</option>
                    <option value="F1(CPT/OPT)" >F1(CPT/OPT)</option>
                    <option value="H4">H4</option>
                    <option value="Other">Other</option>
                </Form.Select>
                {
                    employment.type === "F1(CPT/OPT)" ? (
                        <>
                            <Form.Label htmlFor="octReceipt">OCT Receipt</Form.Label>
                            <Form.Control type="file" id="octReceipt" name="octReceipt" accept="application/pdf" disabled={disabled} />
                        </>
                    ) :
                        <>
                        </>
                }
                {
                    employment.type === "Other" ? (
                        <>
                            <Form.Label htmlFor="visaTitle">Visa Title</Form.Label>
                            <Form.Control type="text" id="visaTitle" name="visaTitle" defaultValue={store.getState().visa.type} disabled={disabled} />
                        </>
                    ) :
                        <>
                        </>
                }
                <Form.Label htmlFor="startDate">Start Date</Form.Label>
                <Form.Control type="date" id="startDate" name="startDate" value={employment.startDate.substr(0, 10)} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="endDate">End Date</Form.Label>
                <Form.Control type="date" id="endDate" name="endDate" value={employment.endDate.substr(0, 10)} disabled={disabled} onChange={onInputChange} />

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