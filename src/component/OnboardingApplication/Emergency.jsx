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
                                <label htmlFor={`emergencyFirstName${index}`} className="form-label">First Name</label>
                                <input type="text" id={`emergencyFirstName${index}`} name={`emergencyFirstName${index}`} className="form-control" required defaultValue={element.firstName} disabled={store.getState().applicationStatus === "Pending"} />
                                <label htmlFor={`emergencyLastName${index}`} className="form-label">Last Name</label>
                                <input type="text" id={`emergencyLastName${index}`} name={`emergencyLastName${index}`} className="form-control" required defaultValue={element.lastName} disabled={store.getState().applicationStatus === "Pending"} />
                                <label htmlFor={`emergencyMiddleName${index}`} className="form-label">Middle Name</label>
                                <input type="text" id={`emergencyMiddleName${index}`} name={`emergencyMiddleName${index}`} className="form-control" defaultValue={element.middleName} disabled={store.getState().applicationStatus === "Pending"} />
                                <label htmlFor={`emergencyCellPhone${index}`} className="form-label">Cell Phone</label>
                                <input type="tel" id={`emergencyCellPhone${index}`} name={`emergencyCellPhone${index}`} className="form-control" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required defaultValue={element.phone.substr(0, 12)} disabled={store.getState().applicationStatus === "Pending"} />
                                <label htmlFor={`emergencyEmail${index}`} className="form-label">Email</label>
                                <input type="email" id={`emergencyEmail${index}`} name={`emergencyEmail${index}`} className="form-control" required defaultValue={element.email} disabled={store.getState().applicationStatus === "Pending"} />
                                <label htmlFor={`emergencyRelationship${index}`} className="form-label">Relationship</label>
                                <input type="text" id={`emergencyRelationship${index}`} name={`emergencyRelationship${index}`} className="form-control" required defaultValue={element.relationship} disabled={store.getState().applicationStatus === "Pending"} />
                            </div>
                        )
                    })}
            </Accordion.Body>
        </Accordion.Item>
    )
}