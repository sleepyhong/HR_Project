import React, { useState } from "react";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import Accordion from 'react-bootstrap/Accordion';

export default function Emergency() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const [userInfo, setUserInfo] = useState({
        ...store.getState()
    });

    function addEmergencyContact() {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.emergencyContact.push({});

        setUserInfo(newUserInfo);
    }
    function removeEmergencyContact() {
        const newUserInfo = {
            ...userInfo
        }
        if (newUserInfo.emergencyContact.length > 1) {
            newUserInfo.emergencyContact.pop();
        }

        setUserInfo(newUserInfo);
    }

    return (
        <Accordion.Item eventKey="10">
            <Accordion.Header>Emegency</Accordion.Header>
            <Accordion.Body>
                {
                    store.getState().applicationStatus === "Pending" ?
                        <>
                        </> :
                        <div>
                            <button type="button" onClick={addEmergencyContact}>Add</button>
                            <button type="button" onClick={removeEmergencyContact}>Remove</button>
                        </div>}
                {
                    userInfo.emergencyContact.map((element, index) => {
                        return (
                            <div>
                                <label for={`emergencyFirstName${index}`} class="form-label">First Name</label>
                                <input type="text" id={`emergencyFirstName${index}`} name={`emergencyFirstName${index}`} class="form-control" required value={element.firstName} disabled={store.getState().applicationStatus === "Pending"} />
                                <label for={`emergencyLastName${index}`} class="form-label">Last Name</label>
                                <input type="text" id={`emergencyLastName${index}`} name={`emergencyLastName${index}`} class="form-control" required value={element.lastName} disabled={store.getState().applicationStatus === "Pending"} />
                                <label for={`emergencyMiddleName${index}`} class="form-label">Middle Name</label>
                                <input type="text" id={`emergencyMiddleName${index}`} name={`emergencyMiddleName${index}`} class="form-control" value={element.middleName} disabled={store.getState().applicationStatus === "Pending"} />
                                <label for={`emergencyCellPhone${index}`} class="form-label">Cell Phone</label>
                                <input type="tel" id={`emergencyCellPhone${index}`} name={`emergencyCellPhone${index}`} class="form-control" placeholder="123-4567-890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={element.phone} disabled={store.getState().applicationStatus === "Pending"} />
                                <label for={`emergencyEmail${index}`} class="form-label">Email</label>
                                <input type="email" id={`emergencyEmail${index}`} name={`emergencyEmail${index}`} class="form-control" required value={element.email} disabled={store.getState().applicationStatus === "Pending"} />
                                <label for={`emergencyRelationship${index}`} class="form-label">Relationship</label>
                                <input type="text" id={`emergencyRelationship${index}`} name={`emergencyRelationship${index}`} class="form-control" required value={element.relationship} disabled={store.getState().applicationStatus === "Pending"} />
                            </div>
                        )
                    })}
            </Accordion.Body>
        </Accordion.Item>
    )
}