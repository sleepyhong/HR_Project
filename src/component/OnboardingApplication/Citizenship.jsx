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
        visa: true,
        f1Selected: false,
        otherSelected: false
    });

    function changeVisaStatus(event) {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.visa = store.getState().citizenship;

        setUserInfo(newUserInfo);
    }

    function changeVisaType(event) {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.f1Selected = store.getState().visa === "F1(CPT/OPT)";
        newUserInfo.otherSelected = store.getState().visa === "Other";

        setUserInfo(newUserInfo);
    }

    return (
        <Accordion.Item eventKey="7">
            <Accordion.Header>Citizenship</Accordion.Header>
            <Accordion.Body>
                <label for="citizenship" class="form-label">Are you a citizen or permanent resident of the U.S?</label>
                <select id="citizenship" name="citizenship" class="form-control" onChange={changeVisaStatus} required disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"}>
                    <option value="yes" selected={store.getState().citizenship}>Yes</option>
                    <option value="no" selected={!store.getState().citizenship}>No</option>
                </select>
                <select id="visa" name="visa" class="form-control" onChange={changeVisaType} required disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} >
                    {store.getState().citizenship ? (
                        <>
                            <option value="Citizen" selected={store.getState().visa === "Citizen"}>Citizen</option>
                            <option value="Green Card" selected={store.getState().visa === "Green Card"}>Green Card</option>
                        </>
                    ) : (
                        <>
                            <option value="H1-B" selected={store.getState().visa === "H1-B"}>H1-B</option>
                            <option value="L2" selected={store.getState().visa === "L2"}>L2</option>
                            <option value="F1(CPT/OPT)" selected={store.getState().visa === "F1(CPT/OPT)"}>F1(CPT/OPT)</option>
                            <option value="H4" selected={store.getState().visa === "H4"}>H4</option>
                            <option value="Other" selected={store.getState().visa === "Other"}>Other</option>
                        </>
                    )}
                </select>
                {
                    store.getState().visa === "F1(CPT/OPT)" ? (
                        <>
                            {
                                userInfo.applicationStatus === "Pending" ?
                                    <p>
                                        <a href={`./document/oct${userInfo.userId}.pdf`} download>OCT Receipt</a>
                                    </p> :
                                    <>
                                        <label for="octReceipt" class="form-label">OCT Receipt</label>
                                        <input type="file" id="octReceipt" name="octReceipt" class="form-control" accept="application/pdf" disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} />
                                    </>
                            }
                        </>
                    ) :
                        <>
                        </>
                }
                {
                    store.getState().visa === "Other" ? (
                        <>
                            <label for="visaTitle" class="form-label">Visa Title</label>
                            <input type="text" id="visaTitle" name="visaTitle" class="form-control" value={store.getState().visa} disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} />
                        </>
                    ) :
                        <>
                        </>
                }
                <label for="startDate" class="form-label">Start Date</label>
                <input type="date" id="startDate" name="startDate" class="form-control" value={store.getState().employment.startDate ? store.getState().employment.startDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} />
                <label for="endDate" class="form-label">End Date</label>
                <input type="date" id="endDate" name="endDate" class="form-control" value={store.getState().employment.endDate ? store.getState().employment.endDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}