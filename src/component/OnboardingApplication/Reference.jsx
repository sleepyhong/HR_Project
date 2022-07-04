import React, { useState } from "react";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import Accordion from 'react-bootstrap/Accordion';

export default function Reference() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const [userInfo, setUserInfo] = useState({
        ...store.getState(),
        reference: []
    });

    function addReference() {
        const newUserInfo = {
            ...userInfo
        }
        if (newUserInfo.reference.length === 0) {
            newUserInfo.reference.push({});
        }

        setUserInfo(newUserInfo);
    }
    function removeReference() {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.reference = [];

        setUserInfo(newUserInfo);
    }

    return (
        <Accordion.Item eventKey="9">
            <Accordion.Header>Reference</Accordion.Header>
            <Accordion.Body>
                {
                    store.getState().applicationStatus === "Pending" ?
                        <>
                        </> :
                        <div>
                            <button type="button" onClick={addReference}>Add</button>
                            <button type="button" onClick={removeReference}>Remove</button>
                        </div>
                }
                {
                    userInfo.reference.map((element) => {
                        return (
                            <div>
                                <label htmlFor="referenceFirstName" className="form-label">First Name</label>
                                <input type="text" id="referenceFirstName" name="referenceFirstName" className="form-control" required />
                                <label htmlFor="referenceLastName" className="form-label">Last Name</label>
                                <input type="text" id="referenceLastName" name="referenceLastName" className="form-control" required />
                                <label htmlFor="referenceMiddleName" className="form-label">Middle Name</label>
                                <input type="text" id="referenceMiddleName" name="referenceMiddleName" className="form-control" />
                                <label htmlFor="referenceCellPhone" className="form-label">Cell Phone</label>
                                <input type="tel" id="referenceCellPhone" name="referenceCellPhone" className="form-control" placeholder="123-4567-890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                <label htmlFor="referenceEmail" className="form-label">Email</label>
                                <input type="email" id="referenceEmail" name="referenceEmail" className="form-control" required />
                                <label htmlFor="referenceRelationship" className="form-label">Relationship</label>
                                <input type="text" id="referenceRelationship" name="referenceRelationship" className="form-control" required />
                            </div>
                        )
                    })}
            </Accordion.Body>
        </Accordion.Item>
    )
}