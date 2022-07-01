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
                                <label for="referenceFirstName" class="form-label">First Name</label>
                                <input type="text" id="referenceFirstName" name="referenceFirstName" class="form-control" required />
                                <label for="referenceLastName" class="form-label">Last Name</label>
                                <input type="text" id="referenceLastName" name="referenceLastName" class="form-control" required />
                                <label for="referenceMiddleName" class="form-label">Middle Name</label>
                                <input type="text" id="referenceMiddleName" name="referenceMiddleName" class="form-control" />
                                <label for="referenceCellPhone" class="form-label">Cell Phone</label>
                                <input type="tel" id="referenceCellPhone" name="referenceCellPhone" class="form-control" placeholder="123-4567-890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                <label for="referenceEmail" class="form-label">Email</label>
                                <input type="email" id="referenceEmail" name="referenceEmail" class="form-control" required />
                                <label for="referenceRelationship" class="form-label">Relationship</label>
                                <input type="text" id="referenceRelationship" name="referenceRelationship" class="form-control" required />
                            </div>
                        )
                    })}
            </Accordion.Body>
        </Accordion.Item>
    )
}