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
                <label htmlFor="citizenship" className="form-label">Are you a citizen or permanent resident of the U.S?</label>
                <select id="citizenship" name="citizenship" className="form-control" onChange={changeVisaStatus} required defaultValue={userInfo.citizenship ? "yes" : "no"} disabled={store.getState().applicationStatus === "Pending"}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <select id="visa" name="visa" className="form-control" onChange={changeVisaType} required defaultValue={userInfo.visa.type} disabled={store.getState().applicationStatus === "Pending"} >
                    {userInfo.citizenship ? (
                        <>
                            <option value="Citizen">Citizen</option>
                            <option value="Green Card">Green Card</option>
                        </>
                    ) : (
                        <>
                            <option value="H1-B">H1-B</option>
                            <option value="L2">L2</option>
                            <option value="F1(CPT/OPT)" >F1(CPT/OPT)</option>
                            <option value="H4">H4</option>
                            <option value="Other">Other</option>
                        </>
                    )}
                </select>
                {
                    userInfo.visa.type === "F1(CPT/OPT)" ? (
                        <>
                            {
                                userInfo.applicationStatus === "Pending" ?
                                    <p>
                                        <a href={`./document/oct/${userInfo._id}.pdf`} download>OCT Receipt</a>
                                    </p> :
                                    <>
                                        <label htmlFor="octReceipt" className="form-label">OCT Receipt</label>
                                        <input type="file" id="octReceipt" name="octReceipt" className="form-control" accept="application/pdf" disabled={store.getState().applicationStatus === "Pending"} />
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
                            <label htmlFor="visaTitle" className="form-label">Visa Title</label>
                            <input type="text" id="visaTitle" name="visaTitle" className="form-control" defaultValue={store.getState().visa.type} disabled={store.getState().applicationStatus === "Pending"} />
                        </>
                    ) :
                        <>
                        </>
                }
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input type="date" id="startDate" name="startDate" className="form-control" defaultValue={store.getState().visa.startDate ? store.getState().visa.startDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="endDate" className="form-label">End Date</label>
                <input type="date" id="endDate" name="endDate" className="form-control" defaultValue={store.getState().visa.endDate ? store.getState().visa.endDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}