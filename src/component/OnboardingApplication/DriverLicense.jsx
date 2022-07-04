import React, { useState } from "react";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import Accordion from 'react-bootstrap/Accordion';

export default function DriverLicense() {
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

    function changeDriverLicenseStatus(event) {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.driverLicense.haveLicense = event.target.value === "yes";

        setUserInfo(newUserInfo);
        setUser(newUserInfo);
    }

    return (
        <Accordion.Item eventKey="8">
            <Accordion.Header>Driver License</Accordion.Header>
            <Accordion.Body>
                <label htmlFor="driverLicense" className="form-label">Do you have a driver's license?</label>
                <select id="driverLicense" name="driverLicense" className="form-control" onChange={changeDriverLicenseStatus} required defaultValue={store.getState().driverLicense.haveLicense ? "yes" : "no"} disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                {
                    userInfo.driverLicense.haveLicense ? (
                        <>
                            <label htmlFor="driverLicenseNumber" className="form-label">Driver's License Number</label>
                            <input type="text" id="driverLicenseNumber" name="driverLicenseNumber" className="form-control" required defaultValue={store.getState().driverLicense.number} disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} />
                            <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                            <input type="date" id="expirationDate" name="expirationDate" className="form-control" required defaultValue={store.getState().driverLicense.expirationDate ? store.getState().driverLicense.expirationDate.substr(0, 10) : null} disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} />

                            {
                                userInfo.applicationStatus === "Pending" ?
                                    <p>
                                        <a href={`./document/driver_license/${userInfo._id}.pdf`} download>Driver License</a>
                                    </p> :
                                    <>
                                        <label htmlFor="driverLicenseFile" className="form-label">Upload Driver License File</label>
                                        <input type="file" id="driverLicenseFile" name="driverLicenseFile" className="form-control" accept="application/pdf" required />
                                    </>
                            }
                        </>
                    ) :
                        <>
                        </>
                }
            </Accordion.Body>
        </Accordion.Item>
    )
}