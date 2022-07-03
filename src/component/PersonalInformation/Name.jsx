import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import store from "../../redux/store";

export default function Name() {
    const preUser = { ...store.getState() };
    const [disabled, setDisabled] = useState(true);
    const [userInfo, setUserInfo] = useState(preUser);

    const onInputChange = (event) => {
        const newUserInfo = { ...userInfo };
        newUserInfo[event.target.name] = event.target.value;
        setUserInfo({ ...newUserInfo });
    }

    const onEdit = () => {
        setDisabled(false);
    }

    const onCancel = () => {
        if (window.confirm("Do you want to discard all the changes?")) {
            setUserInfo({ ...preUser });
            setDisabled(true);
        }
    }

    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>Name</Accordion.Header>
            <Accordion.Body>
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control type="text" id="firstName" name="firstName" value={userInfo.firstName} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control type="text" id="lastName" name="lastName" value={userInfo.lastName} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="middleName">Middle Name</Form.Label>
                <Form.Control type="text" id="middleName" name="middleName" value={userInfo.middleName} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="preferredName">Preferred Name</Form.Label>
                <Form.Control type="text" id="preferredName" name="preferredName" value={userInfo.preferredName} disabled={disabled} onChange={onInputChange} />

                <Form.Label htmlFor="profilePicture">Profile Picture</Form.Label>
                <Form.Control type="file" id="profilePicture" name="profilePicture" disabled={disabled} onChange={onInputChange} />

                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control type="email" id="email" name="email" value={userInfo.email} disabled={disabled} onChange={onInputChange} />

                <Form.Label htmlFor="ssn">SSN</Form.Label>
                <Form.Control type="text" id="ssn" name="ssn" value={userInfo.ssn} placeholder="123-45-6789" pattern="\d{3}-?\d{2}-?\d{4}" disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                <Form.Control type="date" id="dateOfBirth" name="dateOfBirth" value={userInfo.dateOfBirth.substr(0, 10)} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="gender">Gender</Form.Label>
                <Form.Select id="gender" name="gender" value={userInfo.gender} disabled={disabled} onChange={onInputChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="I do not wish to answer">I do not wish to answer</option>
                </Form.Select>
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