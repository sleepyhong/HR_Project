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
        ...store.getState(),
        emergency: [{}]
    });

    function addEmergencyContact() {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.emergency.push({});

        setUserInfo(newUserInfo);
    }
    function removeEmergencyContact() {
        const newUserInfo = {
            ...userInfo
        }
        if (newUserInfo.emergency.length > 1) {
            newUserInfo.emergency.pop();
        }

        setUserInfo(newUserInfo);
    }

    return (
        <Accordion.Item eventKey="10">
            <Accordion.Header>Emegency</Accordion.Header>
            <Accordion.Body>
                <div>
                    <button type="button" onClick={addEmergencyContact}>Add</button>
                    <button type="button" onClick={removeEmergencyContact}>Remove</button>
                </div>
                {userInfo.emergency.map((element, index) => {
                    return (
                        <div>
                            <label for={`emergencyFirstName${index}`} class="form-label">First Name</label>
                            <input type="text" id={`emergencyFirstName${index}`} name={`emergencyFirstName${index}`} class="form-control" required />
                            <label for={`emergencyLastName${index}`} class="form-label">Last Name</label>
                            <input type="text" id={`emergencyLastName${index}`} name={`emergencyLastName${index}`} class="form-control" required />
                            <label for={`emergencyMiddleName${index}`} class="form-label">Middle Name</label>
                            <input type="text" id={`emergencyMiddleName${index}`} name={`emergencyMiddleName${index}`} class="form-control" />
                            <label for={`emergencyCellPhone${index}`} class="form-label">Cell Phone</label>
                            <input type="tel" id={`emergencyCellPhone${index}`} name={`emergencyCellPhone${index}`} class="form-control" placeholder="123-4567-890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                            <label for={`emergencyEmail${index}`} class="form-label">Email</label>
                            <input type="email" id={`emergencyEmail${index}`} name={`emergencyEmail${index}`} class="form-control" required />
                            <label for={`emergencyRelationship${index}`} class="form-label">Relationship</label>
                            <input type="text" id={`emergencyRelationship${index}`} name={`emergencyRelationship${index}`} class="form-control" required />
                        </div>
                    )
                })}
            </Accordion.Body>
        </Accordion.Item>
    )
}