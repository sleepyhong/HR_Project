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
        ...store.getState(),
        driverLicense: true
    });

    function changeDriverLicenseStatus(event) {
        const newUserInfo = {
            ...userInfo
        }
        newUserInfo.driverLicense = event.target.value === "yes";

        setUserInfo(newUserInfo);
    }

    return (
        <Accordion.Item eventKey="8">
            <Accordion.Header>Driver License</Accordion.Header>
            <Accordion.Body>
                <label for="driverLicense" class="form-label">Do you have a driver's license?</label>
                <select id="driverLicense" name="driverLicense" class="form-control" onChange={changeDriverLicenseStatus} required>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                {
                    userInfo.driverLicense ? (
                        <>
                            <label for="driverLicenseNumber" class="form-label">Driver's License Number</label>
                            <input type="text" id="driverLicenseNumber" name="driverLicenseNumber" class="form-control" required />
                            <label for="expirationDate" class="form-label">Expiration Date</label>
                            <input type="date" id="expirationDate" name="expirationDate" class="form-control" required />
                            <label for="driverLicenseFile" class="form-label">Upload Driver License Fi</label>
                            <input type="file" id="driverLicenseFile" name="driverLicenseFile" class="form-control" required />
                        </>
                    ) :
                        <>
                        </>
                }
            </Accordion.Body>
        </Accordion.Item>
    )
}