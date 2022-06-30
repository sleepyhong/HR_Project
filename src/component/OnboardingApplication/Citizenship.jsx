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
        newUserInfo.visa = event.target.value === "yes";

        setUserInfo(newUserInfo);
    }

    function changeVisaType(event) {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.f1Selected = event.target.value === "F1(CPT/OPT)";
        newUserInfo.otherSelected = event.target.value === "Other";

        setUserInfo(newUserInfo);
    }

    return (
        <Accordion.Item eventKey="7">
            <Accordion.Header>Citizenship</Accordion.Header>
            <Accordion.Body>
                <label for="citizenship" class="form-label">Are you a citizen or permanent resident of the U.S?</label>
                <select id="citizenship" name="citizenship" class="form-control" onChange={changeVisaStatus} required value={store.getState().citizenship} disabled={store.getState().applicationStatus === "Pending"}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <select id="visa" name="visa" class="form-control" onChange={changeVisaType} required value={store.getState().visa} disabled={store.getState().applicationStatus === "Pending"} >
                    {userInfo.visa ? (
                        <>
                            <option value="Citizen">Citizen</option>
                            <option value="Green Card">Green Card</option>
                        </>
                    ) : (
                        <>
                            <option value="H1-B">H1-B</option>
                            <option value="L2">L2</option>
                            <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
                            <option value="H4">H4</option>
                            <option value="Other">Other</option>
                        </>
                    )}
                </select>
                {
                    userInfo.f1Selected ? (
                        <>
                            <label for="octReceipt" class="form-label">OCT Receipt</label>
                            <input type="file" id="octReceipt" name="octReceipt" class="form-control" disabled={store.getState().applicationStatus === "Pending"} />
                        </>
                    ) :
                        <>
                        </>
                }
                {
                    userInfo.otherSelected ? (
                        <>
                            <label for="visaTitle" class="form-label">Visa Title</label>
                            <input type="text" id="visaTitle" name="visaTitle" class="form-control" value={store.getState().visa} disabled={store.getState().applicationStatus === "Pending"} />
                        </>
                    ) :
                        <>
                        </>
                }
                <label for="startDate" class="form-label">Start Date</label>
                <input type="date" id="startDate" name="startDate" class="form-control" value={store.getState().employment.startDate ? store.getState().employment.startDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending"} />
                <label for="endDate" class="form-label">End Date</label>
                <input type="date" id="endDate" name="endDate" class="form-control" value={store.getState().employment.endDate ? store.getState().employment.endDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}