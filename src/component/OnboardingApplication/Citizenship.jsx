import React, { useState } from "react";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import Accordion from 'react-bootstrap/Accordion'

export default function Citizenship() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const [userInfo, setUserInfo] = useState({
        ...store.getState(),
        citizenship: store.getState().citizenship,
        f1Selected: store.getState().visa.type === "F1(CPT/OPT)",
        otherSelected: store.getState().visa.type === "Other"
    });

    function changeVisaStatus(event) {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.citizenship = event.target.value === "yes";

        setUserInfo(newUserInfo);
    }

    function changeVisaType(event) {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.visa.type = event.target.value;
        newUserInfo.f1Selected = newUserInfo.visa.type === "F1(CPT/OPT)";
        newUserInfo.otherSelected = newUserInfo.visa.type === "Other";

        setUserInfo(newUserInfo);
    }

    return (
        <Accordion.Item eventKey="7">
            <Accordion.Header>Citizenship</Accordion.Header>
            <Accordion.Body>
                <label for="citizenship" class="form-label">Are you a citizen or permanent resident of the U.S?</label>
                <select id="citizenship" name="citizenship" class="form-control" onChange={changeVisaStatus} required disabled={store.getState().applicationStatus === "Pending"}>
                    <option value="yes" selected={userInfo.citizenship}>Yes</option>
                    <option value="no" selected={!userInfo.citizenship}>No</option>
                </select>
                <select id="visa" name="visa" class="form-control" onChange={changeVisaType} required disabled={store.getState().applicationStatus === "Pending"} >
                    {userInfo.citizenship ? (
                        <>
                            <option value="Citizen" selected={userInfo.visa.type === "Citizen"}>Citizen</option>
                            <option value="Green Card" selected={userInfo.visa.type === "Green Card"}>Green Card</option>
                        </>
                    ) : (
                        <>
                            <option value="H1-B" selected={userInfo.visa.type === "H1-B"}>H1-B</option>
                            <option value="L2" selected={userInfo.visa.type === "L2"}>L2</option>
                            <option value="F1(CPT/OPT)" selected={userInfo.visa.type === "F1(CPT/OPT)"}>F1(CPT/OPT)</option>
                            <option value="H4" selected={userInfo.visa.type === "H4"}>H4</option>
                            <option value="Other" selected={userInfo.visa.type === "Other"}>Other</option>
                        </>
                    )}
                </select>
                {
                    userInfo.visa.type === "F1(CPT/OPT)" ? (
                        <>
                            {
                                userInfo.applicationStatus === "Pending" ?
                                    <p>
                                        <a href={`./document/oct${userInfo.userId}.pdf`} download>OCT Receipt</a>
                                    </p> :
                                    <>
                                        <label for="octReceipt" class="form-label">OCT Receipt</label>
                                        <input type="file" id="octReceipt" name="octReceipt" class="form-control" accept="application/pdf" disabled={store.getState().applicationStatus === "Pending"} />
                                    </>
                            }
                        </>
                    ) :
                        <>
                        </>
                }
                {
                    userInfo.visa.type === "Other" ? (
                        <>
                            <label for="visaTitle" class="form-label">Visa Title</label>
                            <input type="text" id="visaTitle" name="visaTitle" class="form-control" value={store.getState().visa.type} disabled={store.getState().applicationStatus === "Pending"} />
                        </>
                    ) :
                        <>
                        </>
                }
                <label for="startDate" class="form-label">Start Date</label>
                <input type="date" id="startDate" name="startDate" class="form-control" value={store.getState().visa.startDate ? store.getState().visa.startDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending"} />
                <label for="endDate" class="form-label">End Date</label>
                <input type="date" id="endDate" name="endDate" class="form-control" value={store.getState().visa.endDate ? store.getState().visa.endDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}